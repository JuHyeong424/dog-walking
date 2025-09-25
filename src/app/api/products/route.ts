import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // 1. 클라이언트에서 보낸 검색어(query)를 URL에서 추출합니다.
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  // 검색어가 없으면 에러 응답을 보냅니다.
  if (!query) {
    return NextResponse.json(
      { error: '검색어가 필요합니다.' },
      { status: 400 }
    );
  }

  try {
    // 2. 환경 변수에서 네이버 API 자격 증명을 가져옵니다.
    const clientId = process.env.NAVER_CLIENT_ID;
    const clientSecret = process.env.NAVER_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('네이버 API 자격 증명이 설정되지 않았습니다.');
    }

    // 3. 네이버 쇼핑 API에 요청을 보냅니다.
    const apiURL = `https://openapi.naver.com/v1/search/shop.json?query=${encodeURI(
      query
    )}&display=20&sort=sim`; // 20개, 유사도순으로 정렬

    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
      // Next.js 13+에서는 fetch 캐싱 전략을 설정할 수 있습니다.
      // 'no-store'는 항상 새로운 데이터를 요청하도록 합니다.
      cache: 'no-store',
    });

    if (!response.ok) {
      // API 요청이 실패하면 에러를 던집니다.
      throw new Error(`API 요청 실패: ${response.statusText}`);
    }

    const data = await response.json();

    // 4. 성공적으로 받아온 상품 목록(data.items)을 클라이언트에 전달합니다.
    return NextResponse.json(data.items);

  } catch (error) {
    if (error instanceof Error) {
      console.error("Naver Products API fetch error:", error.message);
    } else {
      console.error("Naver Products API fetch error:", error);
    }

    return NextResponse.json(
      { error: "Failed to fetch Naver Products" },
      { status: 500 }
    );
  }
}
