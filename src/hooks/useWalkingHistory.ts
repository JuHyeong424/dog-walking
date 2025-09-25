import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {WalkData} from "@/types/walkData";

export default function useWalkingHistory() {
  return useQuery<WalkData[], Error>({
    queryKey: ["walkHistory"],
    queryFn: async() => {
      const res = await axios.get(`/api/walk`);
      return res.data;
    },
    staleTime: 1000 * 60  * 5,
  });
}
