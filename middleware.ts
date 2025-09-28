import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // 중요: 이 코드는 서버 컴포넌트와 API 라우트에서 업데이트된 쿠키를 사용할 수 있도록 보장합니다.
  await supabase.auth.getSession()

  return response
}

export const config = {
  matcher: [
    /*
     * 아래와 일치하는 경로를 제외한 모든 요청 경로에 대해 미들웨어를 실행합니다:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     * 미들웨어가 필요 없는 다른 경로가 있다면 여기에 추가할 수 있습니다.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
