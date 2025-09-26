import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js가 최적화할 외부 이미지 서버의 도메인을 등록하는 곳입니다.
    remotePatterns: [
      {
        protocol: 'https', // 사용할 프로토콜 (보통 https)
        hostname: 'shopping-phinf.pstatic.net', // 허용할 이미지 서버의 주소
        port: '', // 특정 포트가 필요하면 입력 (보통 비워둠)
        pathname: '/**', // 해당 호스트네임의 모든 경로를 허용 (/**)
      },
      // 만약 다른 도메인의 이미지도 사용한다면, 여기에 객체를 추가하면 됩니다.
      // {
      //   protocol: 'https',
      //   hostname: 'another-image-server.com',
      // },
    ],
  },
};

export default nextConfig;
