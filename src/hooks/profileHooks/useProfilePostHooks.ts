import {DogProfileCreate} from "@/types/dogProfile";
import {supabase} from "@/lib/supabase/client";
import {useMutation, useQueryClient} from "@tanstack/react-query";

interface useProfilePostProps {
  setEnrollPetModal: (value: boolean) => void;
}

const addPetProfile = async (newPet: DogProfileCreate) => {
  const { data: { user }} = await supabase.auth.getUser();

  if (!user) {
    throw new Error("사용자 인증에 실패했습니다. 로그인해주세요.");
  }

  const petDataWithUserId = {
    ...newPet,
    user_id: user.id
  }

  const { data, error } = await supabase
    .from('dog_profiles')
    .insert([petDataWithUserId])
    .select();

  if (error) {
    console.error("Error inserting profile data: ", error);
    throw new Error(error.message);
  }

  return data;
}

export default function useProfilePostHooks({ setEnrollPetModal }: useProfilePostProps) {
  const queryClient = useQueryClient();

  const addPetMutation = useMutation({
    mutationFn: addPetProfile,
    onSuccess: () => {
      console.log("반려견 정보 저장 완료");
      queryClient.invalidateQueries({ queryKey: ['petProfiles']});
      setEnrollPetModal(false);
    },
    onError: (error) => {
      console.error('프로필 저장 실패 ', error);
      alert("정보 저장에 실패했습니다. 다시 시도해주세요.")
    }
  })

  return addPetMutation;
}
