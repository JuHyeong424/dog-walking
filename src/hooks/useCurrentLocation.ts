import {useEffect, useState} from "react";

export default function useCurrentLocation() {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number | undefined; lon: number | undefined }>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    },
      (error) => {
      setCurrentLocation({
        lat: 37.5665,
        lon: 126.9780
      })
      console.error("위치 정보를 가져오지 못했습니다.", error);
      }
    )
  }, []);

  return currentLocation;
}
