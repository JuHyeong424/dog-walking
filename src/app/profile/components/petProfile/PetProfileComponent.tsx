import PetInfoComponent from "@/app/profile/components/petProfile/PetInfoComponent";

interface PetProfileProps {
  setEnrollPetModal: (value: boolean) => void;
}

export default function PetProfileComponent({ setEnrollPetModal }: PetProfileProps) {


  return (
    <div className="w-full rounded-xl p-10 bg-white">
      <div className="flex flex-row justify-between items-center cursor-pointer pb-4">
        <h1 className="font-bold text-xl">반려견 프로필</h1>
        <button
          onClick={() => setEnrollPetModal(true)}
          className="bg-blue-500 text-white rounded-xl px-4 py-2 cursor-pointer"
        >
          + 반려견 추가
        </button>
      </div>
      <div className="flex flex-row gap-4">
        <PetInfoComponent />
        <PetInfoComponent />
      </div>
    </div>
  )
}
