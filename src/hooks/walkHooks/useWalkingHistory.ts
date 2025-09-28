import {useQuery} from "@tanstack/react-query";
import {WalkData} from "@/types/walkData";
import {createClient} from "@/lib/supabase/client";

const supabase = createClient();

type WalkFromSupabase = {
  id: string;
  created_at: string;
  distance: number;
  walk_time: number;
  user_id: string;
  dog_id: string;
  coordinates: { lat: number; lng: number }[];
  name: string;
};

const fetchWalkingHistory = async (dogId: string | null): Promise<WalkData[]> => {
  if (!dogId) return [];

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("사용자 정보를 찾을 수 없습니다.");

  const { data, error } = await supabase
    .from('walk')
    .select(`
      id,
      created_at,
      distance,
      walk_time,
      coordinates,
      user_id,
      dog_id,
      name
    `)
    .eq('dog_id', dogId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("산책 기록 조회 오류:", error);
    throw new Error("산책 기록을 불러오는 데 실패했습니다.");
  }

  if (!data) {
    return [];
  }

  return data.map((walk: WalkFromSupabase) => {
    const finalWalkData: WalkData = {
      id: walk.id,
      created_at: walk.created_at,
      distance: walk.distance,
      walk_time: walk.walk_time,
      user_id: walk.user_id,
      dog_id: walk.dog_id,
      name: walk.name,
      coordinates: walk.coordinates,
    };
    return finalWalkData;
  });
}

export default function useWalkingHistory(selectedDogId: string | null) {
  return useQuery<WalkData[], Error>({
    queryKey: ["walkHistory", selectedDogId],
    queryFn: () => fetchWalkingHistory(selectedDogId),
    enabled: !!selectedDogId,
  });
}
