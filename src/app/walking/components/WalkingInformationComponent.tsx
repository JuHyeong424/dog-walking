import WalkingCurrentInfoComponent from "@/app/walking/components/WalkingCurrentInfoComponent";
import useWalkingHistory from "@/hooks/walkHooks/useWalkingHistory";
import {calculateCaloriesBurned, calculateWalkDifficulty} from "@/utils/walkCalculations";

interface WalkingInformationProps {
  selectedDogId: string | null;
}

export default function WalkingInformationComponent({ selectedDogId }: WalkingInformationProps) {
  const { data: walks, isLoading: isDataLoading, isError: isDataError } = useWalkingHistory(selectedDogId);

  if (isDataLoading) return <div>경로 기록을 불러오는 중입니다</div>;
  if (isDataError) return <div>경로 기록을 불러오지 못했습니다.</div>;

  if (!walks || walks.length === 0) {
    return <div>저장된 산책 기록이 없습니다.</div>;
  }

  const latestWalk = walks[0];
  const DOG_WEIGHT_KG = 10;
  const difficulty = calculateWalkDifficulty(latestWalk.distance, latestWalk.walk_time);
  const calories = calculateCaloriesBurned(latestWalk, DOG_WEIGHT_KG);

  return (
    <div className="bg-white rounded-lg px-4 py-8 shadow-sm">
      <h1 className="text-2xl font-bold pb-4">최근 산책 정보</h1>
      <div className="flex flex-col gap-6">
        <WalkingCurrentInfoComponent
          title="경과 시간"
          value={`${latestWalk.walk_time} 분`}
        />
        <WalkingCurrentInfoComponent
          title="거리"
          value={`${latestWalk.distance} m`}
        />
        <WalkingCurrentInfoComponent title="난이도" value={difficulty} />
        <WalkingCurrentInfoComponent title="소모 칼로리" value={`${calories.toFixed(1)} kcal`} />
      </div>
    </div>
  );
}
