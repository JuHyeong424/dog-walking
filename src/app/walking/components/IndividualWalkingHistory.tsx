import {CiLocationOn} from "react-icons/ci";
import {GiPathDistance} from "react-icons/gi";
import {IoIosTimer} from "react-icons/io";

export default function IndividualWalkingHistory() {
  return (
    <div className="border border-gray-300 rounded-xl p-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <CiLocationOn className="text-blue-500 w-6 h-6"/>
          </div>
          <div>
            <h3 className="text-base font-bold">한강공원</h3>
            <p className="text-gray-400">날짜</p>
          </div>
        </div>
        <button className="w-4 h-4 flex items-center justify-center cursor-pointer bg-gray-100 rounded-lg p-4">···
        </button>
      </div>

      <div className="flex items-center pt-4 gap-50 text-sm">
        <div className="flex items-center">
          <GiPathDistance className="mr-2 text-gray-500"/>
          <span className="mr-2 text-gray-500">거리: </span>
          <span className="font-bold">Km</span>
        </div>
        <div className="flex items-center">
          <IoIosTimer className="mr-2 text-gray-500"/>
          <span className="mr-2 text-gray-500">시간: </span>
          <span className="font-bold">분</span>
        </div>
      </div>
    </div>
  )
}
