"use client";

import WeatherComponent from "@/app/weather/components/WeatherComponent";
import WalkingOKComponent from "@/app/weather/components/WalkingOKComponent";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import {useOpenWeather} from "@/hooks/useOpenWeather";
import {useAirPollution} from "@/hooks/useAirPollution";
import useCurrentDate from "@/hooks/useCurrentDate";

export default function WeatherPage() {
  const currentLocation = useCurrentLocation();
  const {data: weather, isLoading: isWeatherLoading, isError: isWeatherError} = useOpenWeather({
    lat: currentLocation?.lat,
    lon: currentLocation?.lon
  });
  const {data: airPollution, isLoading: isAirPollutionLoading, isError: isAirPollutionError} = useAirPollution({
    lat: currentLocation?.lat,
    lon: currentLocation?.lon
  });
  const koreaTime = useCurrentDate();

  return (
    <div className="bg-gray-100 p-20">
      <div>
        <h1 className="text-4xl font-bold">날씨 기반 산책 적합도</h1>
        <p className="text-gray-500 py-2">실시간 기상 정보를 바탕으로 최적 산책 시간을 확인하세요</p>
      </div>

      <div className="flex flex-row items-start gap-20">
          <WeatherComponent
            weather={weather} currentLocation={currentLocation} isWeatherLoading={isWeatherLoading} isWeatherError={isWeatherError}
            airPollution={airPollution} isAirPollutionLoading={isAirPollutionLoading} isAirPollutionError={isAirPollutionError}
            koreaTime={koreaTime}
          />
          <WalkingOKComponent
            temperature={weather?.main.temp} humidity={weather?.main.humidity} wind={weather?.wind.speed}
            pm10={airPollution?.list[0].components.pm10} pm25={airPollution?.list[0].components.pm2_5}
          />
      </div>
    </div>
  )
}