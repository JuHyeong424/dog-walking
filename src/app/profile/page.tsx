"use client";

import MyProfileComponent from "@/app/profile/components/myProfile/MyProfileComponent";
import PetProfileComponent from "@/app/profile/components/petProfile/PetProfileComponent";
import {useState} from "react";
import PetEnrollModal from "@/app/profile/components/petProfile/PetEnrollModal";

export default function ProfilePage() {
  const [enrollPetModal, setEnrollPetModal] = useState(false);

  return (
    <div className="p-20">
      <div className="pb-4">
        <h1 className="text-4xl font-bold">프로필 관리</h1>
        <p className="text-gray-500 py-2">반려견 정보와 사용자 설정을 관리하세요</p>
      </div>
      <div className="flex flex-row gap-8 items-start">
        <MyProfileComponent/>
        <PetProfileComponent setEnrollPetModal={setEnrollPetModal}/>
      </div>

      {enrollPetModal && (
        <PetEnrollModal setEnrollPetModal={setEnrollPetModal} />
      )}
    </div>
  )
}
