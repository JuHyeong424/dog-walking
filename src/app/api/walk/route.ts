import {WalkData} from "@/types/walkData";
import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

async function getPlaceName(lat: number, lng: number): Promise<string | null> {
  const KAKAO_API_KEY = process.env.KAKAO_REST_API_KEY;
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
      return result.road_address ? result.road_address.address_name : result.address.address_name;
    }

    return null;
  } catch (error) {
    console.error("Error calling Kakao API:", error);
    return null;
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

    const saveWalk = await prisma.walk.create({
      data: {
        name: walkName,
        distance: body.distance,
        walkTime: body.walkTime,
        coordinates: body.coordinates,
      }
    });

    return NextResponse.json({ message: '산책 경로가 성공적으로 저장되었습니다.', data: body }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Routes API fetch error:", error.message);
    } else {
      console.error("Routes API fetch error:", error);
    }

    return NextResponse.json(
      { error: "Failed to fetch routes" },
      { status: 500 }
    );
  }
}
