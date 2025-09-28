import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import {DogProfile} from "@/types/dogProfile";

const getPetProfilesAPI = async (): Promise<DogProfile[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('dog_profiles')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export default function useProfileGetHooks() {
  const {
    data: petProfiles,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["petProfiles"],
    queryFn: getPetProfilesAPI,
  });

  return { petProfiles, isLoading, isError, error };
}
