import {CiLocationOn} from "react-icons/ci";
import {GiPathDistance} from "react-icons/gi";
import {IoIosTimer} from "react-icons/io";
import useWalkingHistory from "@/hooks/useWalkingHistory";
import {WalkData} from "@/types/walkData";

export default function IndividualWalkingHistory() {
  const { data: walks, isLoading: isHistoryLoading, isError: isHistoryError } = useWalkingHistory();
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ko-KR');


  if (isHistoryLoading) return <div>경로 기록을 불러오는 중입니다</div>
  if (isHistoryError) return <div>경로 기록을 불러오지 못했습니다.</div>

  return (
    <>
      {walks.map((walk: WalkData) => (
        <div
          key={walk.id}
          className="border border-gray-300 rounded-xl p-4 my-4"
        >
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CiLocationOn className="text-blue-500 w-6 h-6"/>
              </div>
              <div>
                <h3 className="text-base font-bold">{walk.name}</h3>
                <p className="text-gray-400">{formatDate(walk.createdAt)}</p>
              </div>
            </div>
            <button className="w-4 h-4 flex items-center justify-center cursor-pointer bg-gray-100 rounded-lg p-4">···</button>
          </div>
          <div className="flex items-center pt-4 gap-50 text-sm">
            <div className="flex items-center">
              <GiPathDistance className="mr-2 text-gray-500"/>
              <span className="mr-2 text-gray-500">{walk.distance}</span>
              <span className="font-bold">m</span>
            </div>
            <div className="flex items-center">
              <IoIosTimer className="mr-2 text-gray-500"/>
              <span className="mr-2 text-gray-500">{walk.walkTime}</span>
              <span className="font-bold">분</span>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
