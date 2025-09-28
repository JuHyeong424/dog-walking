import { WalkData } from "@/types/walkData";
import { NextResponse } from "next/server";
import { createClient } from '@/lib/supabase/server';

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
  const supabase = await createClient();

  try {
    const { data: walks, error } = await supabase
      .from('walk')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase GET error:", error);
      throw error;
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
  const supabase = await createClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
    }

    const body: WalkData = await request.json();
    const { coordinates, distance, walkTime, dog_id } = body;

    if (!coordinates || coordinates.length < 2 || !distance || !dog_id) {
      return NextResponse.json({ error: '잘못된 경로 데이터입니다.' }, { status: 400 });
    }

    const startPoint = coordinates[0];
    const endPoint = coordinates[body.coordinates.length - 1];

    const [startName, endName] = await Promise.all([
      getPlaceName(startPoint.lat, startPoint.lng),
      getPlaceName(endPoint.lat, endPoint.lng),
    ]);

    const walkName = `${startName || '알 수 없는 위치'}에서 ${endName || '알 수 없는 위치'}까지의 산책`;

    const { data: savedWalk, error } = await supabase
      .from('walk')
      .insert({
        user_id: user.id,
        dog_id: dog_id,
        name: walkName,
        distance: distance,
        walk_time: walkTime,
        coordinates: coordinates,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase POST error:", error);
      throw error;
    }

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
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: '삭제할 ID가 필요합니다.' }, { status: 400 });
    }

    const { error } = await supabase
      .from('walk')
      .delete()
      .match({
        id: id,
        user_id: user.id
      });

    if (error) {
      throw error;
    }

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
