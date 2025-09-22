import WalkingCurrentInfoComponent from "@/app/walking/components/WalkingCurrentInfoComponent";

export default function WalkingInformationComponent() {
  return (
    <div className="bg-white rounded-lg px-4 py-8 shadow-sm">
      <h1 className="text-2xl font-bold pb-4">현재 산책 정보</h1>
      <div>
        <div className="flex flex-col gap-6">
          <WalkingCurrentInfoComponent title="경과 시간" value="00" />
          <WalkingCurrentInfoComponent title="거리" value="00" />
          <WalkingCurrentInfoComponent title="난이도" value="00" />
          <WalkingCurrentInfoComponent title="소모 칼로리" value="00" />
        </div>
      </div>
    </div>
  )
}
