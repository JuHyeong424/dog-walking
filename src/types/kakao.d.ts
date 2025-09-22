export {};

declare global {
  interface Window {
    kakao: KakaoNamespace;
  }

  namespace kakao.maps {
    class LatLng {
      constructor(lat: number | undefined, lng: number | undefined);
    }

    class Map {
      constructor(container: HTMLDivElement | null, options: kakao.maps.MapOptions);
      setLevel(level: number, options?: { animate?: boolean; duration?: number }): void;
      getLevel(): number;
      setCenter(latlng: LatLng): void;
      addControl(control: MapTypeControl | ZoomControl, position: ControlPosition): void;
    }

    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latlng: LatLng): void;
    }

    class MapTypeControl {
      constructor();
    }

    class ZoomControl {
      constructor();
    }

    interface MarkerOptions {
      position: LatLng;
      map?: Map;
    }

    interface MapOptions {
      center: LatLng;
      level: number;
    }

    enum ControlPosition {
      TOP,
      TOPLEFT,
      TOPRIGHT,
      LEFT,
      RIGHT,
      BOTTOM,
      BOTTOMLEFT,
      BOTTOMRIGHT,
    }

    function load(callback: () => void): void;
  }

  interface KakaoNamespace {
    maps: typeof kakao.maps;
  }
}
