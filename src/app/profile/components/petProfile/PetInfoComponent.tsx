import {HiOutlinePencilSquare} from "react-icons/hi2";
import InformationComponent from "@/app/profile/components/myProfile/InformationComponent";
import {DogProfile} from "@/types/dogProfile";

interface PetInfoProps {
  petInfo: DogProfile;
}

export default function PetInfoComponent({ petInfo }: PetInfoProps) {
  return (
    <div className="w-1/2 border border-gray-500 rounded-xl p-4 flex flex-row">
      <div className="w-16 h-16 rounded-full bg-gray-300 mr-4 flex-shrink-0"></div>
      <div className="w-full">
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-bold text-lg">{petInfo.name}</h2>
          <HiOutlinePencilSquare className="w-10 h-10 bg-gray-100 rounded-xl p-3 cursor-pointer"/>
        </div>
        <InformationComponent label="품종:" value={petInfo.breed} />
        <InformationComponent label="나이:" value={petInfo.age} />
        <InformationComponent label="몸무게:" value={petInfo.weight} />
        <InformationComponent label="크기:" value={petInfo.size} />
        <InformationComponent label="성별:" value={petInfo.gender} />
        <InformationComponent label="지병:" value={petInfo.disease} />
      </div>
    </div>
  )
}
