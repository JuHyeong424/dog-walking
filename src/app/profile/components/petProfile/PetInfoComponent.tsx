import {HiOutlinePencilSquare} from "react-icons/hi2";
import InformationComponent from "@/app/profile/components/myProfile/InformationComponent";

export default function PetInfoComponent() {
  return (
    <div className="w-1/2 border border-gray-500 rounded-xl p-4 flex flex-row">
      <div className="w-16 h-16 rounded-full bg-gray-300 mr-4 flex-shrink-0"></div>
      <div className="w-full">
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-bold text-lg">맥스</h2>
          <HiOutlinePencilSquare className="w-10 h-10 bg-gray-100 rounded-xl p-3 cursor-pointer"/>
        </div>
        <InformationComponent label="품종:" value="골드리트리버"/>
        <InformationComponent label="나이:" value="1세"/>
        <InformationComponent label="몸무게:" value="28kg"/>
        <InformationComponent label="크기:" value="대형"/>
        <InformationComponent label="성별:" value="수컷"/>
        <InformationComponent label="지병:" value="없음"/>
      </div>
    </div>
  )
}
