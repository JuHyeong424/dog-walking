"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Script from "next/script";

interface KakaoMapScriptContextType {
  isLoaded: boolean;
}

const KakaoMapScriptContext = createContext<KakaoMapScriptContextType | undefined>(
  undefined
);

export function KakaoMapScriptProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleScriptLoad = () => {
    setIsLoaded(true);
  };

  return (
    <KakaoMapScriptContext.Provider value={{ isLoaded }}>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_JS_KEY}&autoload=false`}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      {children}
    </KakaoMapScriptContext.Provider>
  );
}

export function useKakaoMapScript() {
  const context = useContext(KakaoMapScriptContext);
  if (context === undefined) {
    throw new Error("useKakaoMapScript must be used within a KakaoMapScriptProvider");
  }
  return context;
}
