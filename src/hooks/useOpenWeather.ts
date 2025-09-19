import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export function useOpenWeather(props: { lon: number | undefined; lat: number | undefined }) {
  return useQuery({
    queryKey: ["openWeather", props.lat, props.lon],
    queryFn: async () => {
      const res = await axios.get(`/api/openWeather?lat=${props.lat}&lon=${props.lon}`);
      return res.data;
    },
    enabled: !!props.lat && !!props.lon,
    staleTime: 1000 * 60 * 5,
  });
}
