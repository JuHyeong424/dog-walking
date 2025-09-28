import IndividualWalkingHistoryComponent from "@/app/walking/components/IndividualWalkingHistoryComponent";

interface LatestWalkingHistoryProps {
  selectedDogId: string | null;
}


export default function LatestWalkingHistoryComponent({ selectedDogId }: LatestWalkingHistoryProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center px-2">
        <h1 className="text-2xl font-bold py-3">최근 산책 경로 기록</h1>
        <span className="text-blue-500 cursor-pointer">전체보기</span>
      </div>
      <IndividualWalkingHistoryComponent selectedDogId={selectedDogId} />
    </div>
  )
}
