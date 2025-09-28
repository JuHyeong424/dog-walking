import { WalkData } from "@/types/walkData";
import { NextResponse } from "next/server";
import { createClient } from '@/lib/supabase/server';
import {supabase} from "@/lib/supabase/client";

async function getPlaceName(lat: number, lng: number): Promise<string | null> {
  const KAKAO_API_KEY = process.env.KAKAO_REST_API_KEY;

  console.log("Loaded KAKAO_REST_API_KEY:", KAKAO_API_KEY);

  if (!KAKAO_API_KEY) {
    console.error("Kakao REST API Key is not configured.");
    return null;
  }

  const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch from Kakao API:", response.statusText);
      return null;
    }

    const data = await response.json();

    if (data.documents && data.documents.length > 0) {
      const result = data.documents[0];
      if (result.road_address && result.road_address.building_name && result.road_address.building_name.trim() !== '') {
        return result.road_address.building_name;
      }
      if (result.road_address) {
        return result.road_address.address_name;
      }
      if (result.address) {
        return result.address.address_name;
      }
    }
    return null;
  } catch (error) {
    console.error("Error calling Kakao API:", error);
    return null;
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: walks, error } = await supabase
      .from('walk') // 'walk' 테이블에서
      .select('*')   // 모든 컬럼을
      .order('createdAt', { ascending: false }); // 최신순으로 정렬하여 조회

    // Supabase 쿼리에서는 항상 error 객체가 있는지 확인해야 합니다.
    if (error) {
      console.error("Supabase GET error:", error);
      throw error; // 에러를 던져서 아래 catch 블록에서 처리하도록 함
    }

    return NextResponse.json(walks, { status: 200 });
  } catch (error) {
    console.error("GET /api/walk error:", error);
    return NextResponse.json(
      { error: "산책 기록을 불러오는 데 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: WalkData = await request.json();

    if (!body.coordinates || body.coordinates.length < 2 || !body.distance) {
      return NextResponse.json({ error: '잘못된 경로 데이터입니다.' }, { status: 400 });
    }

    const startPoint = body.coordinates[0];
    const endPoint = body.coordinates[body.coordinates.length - 1];

    const [startName, endName] = await Promise.all([
      getPlaceName(startPoint.lat, startPoint.lng),
      getPlaceName(endPoint.lat, endPoint.lng),
    ]);

    const walkName = `${startName || '알 수 없는 위치'}에서 ${endName || '알 수 없는 위치'}까지의 산책`;

    // Supabase: supabase.from('테이블명').insert({ 데이터 })
    const { data: savedWalk, error } = await supabase
      .from('walk') // 'walk' 테이블에
      .insert({   // 새로운 데이터를 삽입
        name: walkName,
        distance: body.distance,
        walkTime: body.walkTime,
        coordinates: body.coordinates,
      })
      .select() // 삽입된 데이터를 반환받기 위해 .select()를 추가
      .single(); // 단일 객체로 받기 위해 .single()을 추가

    // Supabase 쿼리에서는 항상 error 객체가 있는지 확인해야 합니다.
    if (error) {
      console.error("Supabase POST error:", error);
      throw error; // 에러를 던져서 아래 catch 블록에서 처리하도록 함
    }

    // 성공 시, 요청 본문(body)이 아닌 DB에 저장된 실제 데이터(savedWalk)를 반환합니다.
    return NextResponse.json({ message: '산책 경로가 성공적으로 저장되었습니다.', data: savedWalk }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("POST /api/walk error:", error.message);
    } else {
      console.error("POST /api/walk error:", error);
    }

    return NextResponse.json(
      { error: "산책 경로 저장에 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const supabase = await createClient();

  try {
    // 요청 본문에서 id를 추출합니다.
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: '삭제할 ID가 필요합니다.' }, { status: 400 });
    }

    // Supabase를 사용하여 해당 id의 데이터를 삭제합니다.
    const { error } = await supabase
      .from('walk')
      .delete()
      .match({ id }); // id가 일치하는 행을 삭제

    if (error) {
      throw error; // Supabase에서 오류가 발생하면 에러를 던집니다.
    }

    // 성공적으로 삭제되었음을 클라이언트에 알립니다.
    return NextResponse.json({ message: '산책 기록이 성공적으로 삭제되었습니다.' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("DELETE /api/walk error:", error.message);
    } else {
      console.error("DELETE /api/walk error:", error);
    }

    return NextResponse.json(
      { error: "산책 경로 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
