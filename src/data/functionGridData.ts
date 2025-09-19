import { CiCloudOn } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { FiBarChart2 } from "react-icons/fi";
import { PiDog } from "react-icons/pi";
import { RiCommunityLine } from "react-icons/ri";

export const functionGridItems = [
  {
    icon: CiCloudOn,
    title: "날씨 기반 산책 적합도",
    content: "실시간 날씨 API 연동으로 오늘의 산책 지수를 확인하고 최적의 산책 시간을 추천받으세요.",
    bgColor: "bg-blue-100",
    textColor: "text-blue-500",
    navigation: "/weather",
  },
  {
    icon: CiLocationOn,
    title: "산책 경로 추적",
    content: "자주 다니는 산책 경로를 기록하고 거리, 시간을 자동으로 측정하여 시각화된 데이터로 확인하세요.",
    bgColor: "bg-green-100",
    textColor: "text-green-500",
    navigation: "/walking",
  },
  {
    icon: IoBagOutline,
    title: "맞춤형 용품 추천",
    content: "반려견의 품종, 크기, 연령을 고려하여 가장 적합한 산책 용품을 추천해드립니다.",
    bgColor: "bg-purple-100",
    textColor: "text-purple-500",
    navigation: "/products",
  },
  {
    icon: FiBarChart2 ,
    title: "산책 통계 대시보드",
    content: "일/주/월별 산책 거리와 시간을 차트로 확인하고 반려견의 운동량을 체계적으로 관리하세요.",
    bgColor: "bg-orange-100",
    textColor: "text-orange-500",
    navigation: "/dashboard",
  },
  {
    icon: PiDog ,
    title: "반려견 프로필 관리",
    content: "품종, 나이, 크기, 건강상태 등 반려견 정보를 등록하고 개인화된 서비스를 받으세요.",
    bgColor: "bg-red-100",
    textColor: "text-red-500",
    navigation: "/profile"
  },
  {
    icon: RiCommunityLine ,
    title: "커뮤니티 기능",
    content: "다른 반려인들과 인기 산책 경로를 공유하고 용품 리뷰와 산책 후기를 나누세요.",
    bgColor: "bg-neutral-100",
    textColor: "text-neutral-500",
    navigation: "/community"
  },
];
