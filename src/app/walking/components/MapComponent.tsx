import useKakaoMap from "@/hooks/useKakaoMap";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import useKakaoDrawingMap from "@/hooks/useKakaoDrawingMap";
import "@/styles/mapStyles.css";
import {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";

export default function MapComponent() {
  const currentLocation = useCurrentLocation();
  const {containerRef, map} = useKakaoMap({currentLocation});
  const {walkData, clearDrawing} = useKakaoDrawingMap(map);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  console.log("walk", walkData)

  const handleSaveWalkPath = async () => {
    if (!walkData) {
      alert("저장할 산책 경로가 없습니다.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/walk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(walkData),
      });

      if (!response.ok) {
        throw new Error('경로 저장에 실패했습니다.');
      }

      await queryClient.invalidateQueries({ queryKey: ['walkHistory'] });

      const result = await response.json();
      console.log('저장 성공: ', result);
      alert('산책 경로가 성공적으로 저장되었습니다.');

      clearDrawing();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white w-full rounded-xl shadow-sm">
      <div className="flex justify-between items-center p-4">
        <h2 className="font-bold">실시간 지도</h2>
        <p className="text-sm text-gray-500">
          좌클릭: 선 그리기 시작/지점 추가 | 우클릭: 그리기 종료
        </p>
        <button
          onClick={handleSaveWalkPath}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        >
          {isLoading ? '저장 중...' : '산책 경로 저장'}
        </button>
      </div>
      <div>
        <div ref={containerRef} className="w-full h-[400px] rounded-b-lg"/>
      </div>
    </div>
  )
}
