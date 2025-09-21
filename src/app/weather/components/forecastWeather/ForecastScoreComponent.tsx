import { ForecastData } from "@/types/forecastData";
import React from "react";
import {AirPollutionForecastData} from "@/types/airPoluttionForecastData";

interface ForecastScoreProps {
  forecastWeather: ForecastData;
  isForecastWeatherIsLoading: boolean;
  isForecastWeatherIsError: boolean;
  forecastAirPollution: AirPollutionForecastData;
  isForecastAirPollutionIsLoading: boolean;
  isForecastAirPollutionIsError: boolean;
}

export default function ForecastScoreComponent(
  {
    forecastWeather, isForecastWeatherIsLoading, isForecastWeatherIsError,
    forecastAirPollution, isForecastAirPollutionIsLoading, isForecastAirPollutionIsError
  }: ForecastScoreProps) {
  if (isForecastWeatherIsLoading || isForecastAirPollutionIsLoading) return <div>날씨 예보를 불러오는 중...</div>;
  if (isForecastWeatherIsError || isForecastAirPollutionIsError || !forecastWeather || !forecastAirPollution) return <div>날씨 예보를 불러오지 못했습니다.</div>;

  return (
    <div className="bg-white rounded-xl w-2/7 p-5 shadow-sm">

    </div>
  );
}
