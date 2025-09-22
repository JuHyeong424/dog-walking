import useKakaoMap from "@/hooks/useKakaoMap";
import useCurrentLocation from "@/hooks/useCurrentLocation";

export default function MapComponent() {
  const currentLocation = useCurrentLocation();
  const containerRef = useKakaoMap({ currentLocation });

  return (
    <div className="bg-white w-4/7 rounded-xl">
      <h2 className="font-bold p-4">실시간 지도</h2>

      <div className="">
        <div ref={containerRef} className="w-full h-[400px] rounded-lg"/>
      </div>
    </div>
  )
}
