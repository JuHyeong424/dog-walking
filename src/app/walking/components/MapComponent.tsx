import useKakaoMap from "@/hooks/useKakaoMap";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import useKakaoDrawingMap from "@/hooks/useKakaoDrawingMap";
import "@/styles/mapStyles.css";

export default function MapComponent() {
  const currentLocation = useCurrentLocation();
  const { containerRef, map } = useKakaoMap({ currentLocation });
  useKakaoDrawingMap(map);

  return (
    <div className="bg-white w-full rounded-xl shadow-sm">
      <div className="flex justify-between items-center p-4">
        <h2 className="font-bold">실시간 지도</h2>
        <p className="text-sm text-gray-500">
          좌클릭: 선 그리기 시작/지점 추가 | 우클릭: 그리기 종료
        </p>
      </div>

      <div className="">
        <div ref={containerRef} className="w-full h-[400px] rounded-b-lg"/>
      </div>
    </div>
  )
}
