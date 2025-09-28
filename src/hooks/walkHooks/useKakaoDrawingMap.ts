import { useEffect, useRef, useState } from "react";
import {calculateWalkTimes, getTimeHTML} from "@/utils/mapUtils";
import {WalkData} from "@/types/walkData";

export default function useKakaoDrawingMap(map: kakao.maps.Map | null, dogId: string | null, userId: string | null) {
  const [drawingFlag, setDrawingFlag] = useState(false);
  const clickLine = useRef<kakao.maps.Polyline | null>(null);
  const moveLine = useRef<kakao.maps.Polyline | null>(null);
  const distanceOverlay = useRef<kakao.maps.CustomOverlay | null>(null);
  const dots = useRef<{ circle: kakao.maps.CustomOverlay, distance: kakao.maps.CustomOverlay | null }[]>([]);
  const [walkData, setWalkData] = useState<Omit<WalkData, "id" | "name" | "createdAt"> | null>(null);

  const deleteClickLine = () => {
    if (clickLine.current) {
      clickLine.current?.setMap(null);
      clickLine.current = null;
    }
  };
  const deleteDistance = () => {
    if (distanceOverlay.current) {
      distanceOverlay.current?.setMap(null);
      distanceOverlay.current = null;
    }
  };
  const deleteCircleDot = () => {
    dots.current.forEach(dot => {
      if (dot.circle) dot.circle.setMap(null);
      if (dot.distance) dot.distance.setMap(null);
    });
    dots.current = [];
  };
  const showDistance = (content: string, position: kakao.maps.LatLng) => {
    if (distanceOverlay.current) {
      distanceOverlay.current?.setPosition(position);
      distanceOverlay.current?.setContent(content);
    } else {
      distanceOverlay.current = new kakao.maps.CustomOverlay({ map: map ?? undefined, content, position, xAnchor: 0, yAnchor: 0, zIndex: 3 });
    }
  };
  const displayCircleDot = (position: kakao.maps.LatLng, distance: number) => {
    const circleOverlay = new kakao.maps.CustomOverlay({ content: '<span class="dot"></span>', position, zIndex: 1 });
    circleOverlay.setMap(map);
    let distanceOverlayInstance: kakao.maps.CustomOverlay | null = null;
    if (distance > 0) {
      distanceOverlayInstance = new kakao.maps.CustomOverlay({ content: `<div class="dotOverlay">거리 <span class="number">${distance}</span>m</div>`, position, yAnchor: 1, zIndex: 2 });
      distanceOverlayInstance.setMap(map);
    }
    dots.current.push({ circle: circleOverlay, distance: distanceOverlayInstance });
  };

  const clearDrawing = () => {
    deleteClickLine();
    deleteDistance();
    deleteCircleDot();
    setWalkData(null);
  };

  useEffect(() => {
    if (!map) return;

    const handleClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
      const clickPosition = mouseEvent.latLng;
      if (!drawingFlag) {
        clearDrawing();
        setDrawingFlag(true);

        clickLine.current = new kakao.maps.Polyline({ map, path: [clickPosition], strokeWeight: 3, strokeColor: '#db4040', strokeOpacity: 1, strokeStyle: 'solid' });
        moveLine.current = new kakao.maps.Polyline({ path: [], strokeWeight: 3, strokeColor: '#db4040', strokeOpacity: 0.5, strokeStyle: 'solid' });

        displayCircleDot(clickPosition, 0);
      } else {
        const path = clickLine.current?.getPath();
        if (path) {
          path.push(clickPosition);
          clickLine.current?.setPath(path);
          const distance = Math.round(clickLine.current?.getLength() ?? 0);
          displayCircleDot(clickPosition, distance);
        }
      }
    };
    const handleMouseMove = (mouseEvent: kakao.maps.event.MouseEvent) => {
      if (drawingFlag && clickLine.current && moveLine.current) {
        const mousePosition = mouseEvent.latLng;
        const path = clickLine.current?.getPath();
        if (path && path.length > 0) {
          const movepath = [path[path.length - 1], mousePosition];
          moveLine.current?.setPath(movepath);
          moveLine.current?.setMap(map);
          const clickLineLength = clickLine.current?.getLength() ?? 0;
          const moveLineLength = moveLine.current?.getLength() ?? 0;
          const distance = Math.round(clickLineLength + moveLineLength);
          const content = `<div class="dotOverlay distanceInfo">총거리 <span class="number">${distance}</span>m</div>`;
          showDistance(content, mousePosition);
        }
      }
    };

    const handleRightClick = () => {
      if (drawingFlag) {
        setDrawingFlag(false);
        if (moveLine.current) {
          moveLine.current?.setMap(null);
          moveLine.current = null;
        }

        const path = clickLine.current?.getPath();
        if (path && path.length > 1) {
          const lastDot = dots.current[dots.current.length - 1];
          if (lastDot?.distance) {
            lastDot.distance.setMap(null);
          }

          const distance = Math.round(clickLine.current!.getLength());

          const { walkTime } = calculateWalkTimes(distance);
          const newWalkData = {
            coordinates: path.map(latlng => ({
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            })),
            distance,
            walk_time: walkTime,
            dog_id: dogId!,
            user_id: userId!,
            created_at: new Date().toISOString(),
          };
          setWalkData(newWalkData);

          const content = getTimeHTML(distance);
          showDistance(content, path[path.length - 1]);
        } else {
          clearDrawing();
        }
      }
    };

    kakao.maps.event.addListener(map, 'click', handleClick);
    kakao.maps.event.addListener(map, 'mousemove', handleMouseMove);
    kakao.maps.event.addListener(map, 'rightclick', handleRightClick);

    return () => {
      kakao.maps.event.removeListener(map, 'click', handleClick);
      kakao.maps.event.removeListener(map, 'mousemove', handleMouseMove);
      kakao.maps.event.removeListener(map, 'rightclick', handleRightClick);
    };
  },
    [map, drawingFlag, clearDrawing]);

  return { walkData, clearDrawing }
}
