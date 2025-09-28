import PetEnrollInputComponent from "@/app/profile/components/petProfile/PetEnrollInputComponent";
import PetEnrollSelectComponent from "@/app/profile/components/petProfile/PetEnrollSelectComponent";
import {BREED, DISEASE, GENDER, SIZE} from "@/constants/enrollPet";
import PetEnrollRowInputComponent from "@/app/profile/components/petProfile/PetEnrollRowInputComponent";
import {useEffect, useState} from "react";
import useProfilePostHooks from "@/hooks/profileHooks/useProfilePostHooks";
import {DogProfileCreate} from "@/types/dogProfile";
import {User} from "@supabase/supabase-js";
import {supabase} from "@/lib/supabase/client";

interface PetEnrollProps {
  setEnrollPetModal: (value: boolean) => void;
}

export default function PetEnrollModal({ setEnrollPetModal }: PetEnrollProps) {
  const [name, setName] = useState<string>('');
  const [breed, setBreed] = useState<string>('품종을 선택해 주세요.');
  const [disease, setDisease] = useState<string>('질병을 선택해 주세요.');
  const [size, setSize] = useState<string>('크기를 선택해 주세요.');
  const [gender, setGender] = useState<string>('성별을 선택해 주세요.');
  const [age, setAge] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const addPetMutation = useProfilePostHooks({ setEnrollPetModal });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }} = await supabase.auth.getUser();
      setCurrentUser(user);
    };

    fetchUser();
  }, []);

  const onHandleSave = () => {
    if (!currentUser) {
      alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    if (!name || !breed || !size || !gender || age === 0 || weight === 0) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    const newPetData: DogProfileCreate = {
      user_id: currentUser.id,
      name,
      breed,
      disease,
      size,
      gender,
      age: Number(age),
      weight: Number(weight),
    };

    addPetMutation.mutate(newPetData);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[500px]">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-bold">새 반려견 등록</h2>
          <div className="flex items-center justify-center">
            <button
              onClick={() => setEnrollPetModal(false)}
              className="w-8 h-8 bg-gray-200 rounded-lg cursor-pointer"
            >
              x
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <PetEnrollInputComponent title="이름" placeholder="반려견 이름을 입력하세요" change={setName}/>
          <PetEnrollSelectComponent title="품종" options="품종을 선택하세요" value={BREED} state={breed} change={setBreed} />
          <PetEnrollSelectComponent title="지병" options="지병을 선택하세요" value={DISEASE} state={disease} change={setDisease} />
          <PetEnrollSelectComponent title="크기" options="크기을 선택하세요" value={SIZE} state={size} change={setSize} />
          <PetEnrollSelectComponent title="성별" options="성별을 선택하세요" value={GENDER} state={gender} change={setGender} />
          <div className="flex flex-row gap-2">
            <PetEnrollRowInputComponent title="나이(살)" type="number" change={setAge} />
            <PetEnrollRowInputComponent title="몸무게(kg)" type="number" change={setWeight} />
          </div>
          <button
            onClick={onHandleSave}
            className="bg-blue-500 text-white p-4 rounded-xl cursor-pointer font-bold mt-4"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  )
}
