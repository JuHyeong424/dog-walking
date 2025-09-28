import useKakaoMap from "@/hooks/walkHooks/useKakaoMap";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import useKakaoDrawingMap from "@/hooks/walkHooks/useKakaoDrawingMap";
import "@/styles/mapStyles.css";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {createClient} from "@/lib/supabase/client";
import {DogProfile} from "@/types/dogProfile";

const supabase = createClient();

interface MapComponentProps {
  selectedDogId: string | null;
  setSelectedDogId: Dispatch<SetStateAction<string | null>>;
}

export default function MapComponent({ selectedDogId, setSelectedDogId}: MapComponentProps) {
  const currentLocation = useCurrentLocation();
  const {containerRef, map} = useKakaoMap({currentLocation});

  const [myDogs, setMyDogs] = useState<DogProfile[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const {walkData, clearDrawing} = useKakaoDrawingMap(map, selectedDogId, userId);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  console.log("walk", walkData)

  useEffect(() => {
    const fetchMyDogs = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);

        const { data: profiles } = await supabase
          .from('dog_profiles')
          .select('*')
          .eq('user_id', user.id);

        if (profiles) {
          setMyDogs(profiles);
          if (profiles.length > 0) {
            setSelectedDogId(profiles[0].id);
          }
        }
      }
    };
    fetchMyDogs();
  }, [setSelectedDogId]);

  const handleSaveWalkPath = async () => {
    if (!walkData) {
      alert("저장할 산책 경로가 없습니다.");
      return;
    }

    if (!selectedDogId) {
      alert("산책을 기록할 반려견을 선택해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/walk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...walkData,
          dog_id: selectedDogId,
        }),
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
      <div className="flex justify-between items-center p-4 gap-4">
        <h2 className="font-bold">실시간 지도</h2>

        <div className="">
          <select
            id="dog-select"
            value={selectedDogId || ''}
            onChange={(e) => setSelectedDogId(e.target.value)}
            disabled={myDogs.length === 0}
            className="border border-gray-500 p-2 rounded-md"
          >
            {myDogs.length > 0 ? (
              myDogs.map((dog) => (
                <option key={dog.id} value={dog.id}>
                  {dog.name}
                </option>
              ))
            ) : (
              <option>등록된 반려견이 없습니다</option>
            )}
          </select>
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-gray-500">
            좌클릭: 선 그리기 시작/지점 추가
          </p>
          <p className="text-sm text-gray-500">
            우클릭: 그리기 종료
          </p>
        </div>

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
