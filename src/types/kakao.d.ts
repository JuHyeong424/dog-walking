export {};

declare global {
  interface Window {
    kakao: KakaoNamespace;
  }

  namespace kakao.maps {
    class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
    }

    class Point {
      constructor(x: number, y: number);
      x: number;
      y: number;
    }

    class Map {
      constructor(container: HTMLElement, options: MapOptions);
      setCenter(latlng: LatLng): void;
      getCenter(): LatLng;
      setLevel(level: number, options?: { animate?: boolean; duration?: number }): void;
      getLevel(): number;
      addControl(control: MapTypeControl | ZoomControl, position: ControlPosition): void;
    }

    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latlng: LatLng): void;
    }

    class Polyline {
      constructor(options: PolylineOptions);
      setMap(map: Map | null): void;
      getPath(): LatLng[];
      setPath(path: LatLng[] | LatLng[][]): void;
      getLength(): number;
    }

    class CustomOverlay {
      constructor(options: CustomOverlayOptions);
      setMap(map: Map | null): void;
      setPosition(position: LatLng): void;
      setContent(content: string | HTMLElement): void;
    }

    class MapTypeControl { constructor(); }
    class ZoomControl { constructor(); }

    namespace event {
      function addListener(target: object, type: string, handler: (event: MouseEvent) => void): void;
      function removeListener(target: object, type: string, handler: (event: MouseEvent) => void): void;

      interface MouseEvent {
        latLng: LatLng;
        point: Point; // 'any' 대신 'Point' 타입으로 지정
      }
    }

    interface MapOptions {
      center: LatLng;
      level: number;
    }

    interface MarkerOptions {
      position: LatLng;
      map?: Map;
    }

    interface PolylineOptions {
      map?: Map;
      path: LatLng[] | LatLng[][];
      strokeWeight?: number;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeStyle?: 'solid' | 'shortdash' | 'shortdot' | 'shortdashdot' | 'shortdashdotdot' | 'dot' | 'dash' | 'dashdot' | 'longdash' | 'longdashdot' | 'longdashdotdot';
    }

    interface CustomOverlayOptions {
      map?: Map;
      content: string | HTMLElement;
      position: LatLng;
      xAnchor?: number;
      yAnchor?: number;
      zIndex?: number;
    }

    enum ControlPosition {
      TOP, TOPLEFT, TOPRIGHT, LEFT, RIGHT, BOTTOM, BOTTOMLEFT, BOTTOMRIGHT,
    }

    function load(callback: () => void): void;
  }

  interface KakaoNamespace {
    maps: typeof kakao.maps;
  }
}
