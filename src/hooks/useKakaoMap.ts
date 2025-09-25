import {useEffect, useRef, useState} from "react";

interface useKakaoMapProps {
  currentLocation?: {
    lat?: number;
    lng?: number;
  } | null;
}

export default function useKakaoMap({ currentLocation }: useKakaoMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const [mapReady, setMapReady] = useState(false);

  console.log(currentLocation)

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !containerRef.current || mapRef.current) return;

    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(
          currentLocation?.lat || 37.5665,
          currentLocation?.lng || 126.9780
        ),
        level: 3,
      };

      const mapInstance = new window.kakao.maps.Map(containerRef.current, options);
      mapRef.current = mapInstance;

      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      mapInstance.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

      const zoomControl = new window.kakao.maps.ZoomControl();
      mapInstance.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      setMapReady(true);
    });
  }, [currentLocation]);

  useEffect(() => {
    if (!mapReady || !mapRef.current || !currentLocation || currentLocation.lat == null || currentLocation.lng == null) {
      return;
    }

    const map = mapRef.current;
    const markerPosition = new window.kakao.maps.LatLng(
      currentLocation.lat || 37.5665,
      currentLocation.lng || 126.9780
    );

    if (!markerRef.current) {
      markerRef.current = new kakao.maps.Marker({position: markerPosition});
      markerRef.current?.setMap(map);
    } else {
      markerRef.current?.setPosition(markerPosition);
    }

    map?.setCenter(markerPosition);
  }, [currentLocation, mapReady]);

  return { containerRef, map: mapRef.current };
}
