import InformationComponent from "@/app/profile/components/myProfile/InformationComponent";

export default function MyProfileComponent() {
  return (
    <div className="flex flex-col bg-white rounded-xl w-4/9 p-10">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-gray-300 p-2"></div>
        <h2 className="pt-2 font-bold">장주형</h2>
        <p className="p-2 text-gray-500">이메일</p>
      </div>
      <div className="flex flex-col p-4 gap-2">
        <InformationComponent label="가입일" value="2025.01.15"/>
        <InformationComponent label="총 산책 횟수" value="2025.01.15"/>
        <InformationComponent label="총 산책 거리" value="245.8km"/>
        <InformationComponent label="등록된 반려견" value="1마리"/>
      </div>
      <div className="flex flex-col gap-4">
        <button className="bg-blue-500 text-white rounded-sm p-4 cursor-pointer">프로필 편집</button>
        <button className="border border-gray-300 rounded-sm p-4 cursor-pointer">계정 생성</button>
      </div>
    </div>
  )
}
