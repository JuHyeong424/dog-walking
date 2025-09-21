"use client";

import {getWeatherIcon} from "@/utils/weather/weatherIcons";
import {WiHumidity} from "react-icons/wi";
import {PiWindDuotone} from "react-icons/pi";
import {WiDust} from "react-icons/wi";
import {GiDustCloud} from "react-icons/gi";
import {CiTempHigh} from "react-icons/ci";
import {AirPollutionData} from "@/types/weather/airPollutionData";
import {WeatherData} from "@/types/weather/weatherData";

interface WeatherComponentProps {
  weather: WeatherData;
  currentLocation: { lat: number | undefined; lon: number | undefined } | null;
  isWeatherLoading: boolean;
  isWeatherError: boolean;
  airPollution: AirPollutionData;
  isAirPollutionLoading: boolean;
  isAirPollutionError: boolean;
  koreaTime: string;
}

export default function WeatherComponent({ weather, currentLocation, isWeatherLoading, isWeatherError, airPollution, isAirPollutionLoading, isAirPollutionError, koreaTime }: WeatherComponentProps) {
  console.log(weather);
  console.log(airPollution)

  if (!currentLocation) return <p>위치 정보를 가져오는 중...</p>;
  if (isWeatherLoading) return <p>날씨 불러오는 중...</p>;
  if (isWeatherError || !weather) return <p>날씨 정보를 가져오지 못했습니다.</p>;
  if (isAirPollutionLoading) return <p>미세먼지 정보 불러오는 중...</p>
  if (isAirPollutionError || !airPollution) return <p>미세먼지 정보를 가져오지 못했습니다.</p>

  const weatherIcon = getWeatherIcon(weather.weather[0].main);

  return (
    <div className="flex flex-col w-4/7 bg-blue-500 rounded-lg p-8 my-4 font-bold text-white shadow-sm">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="text-3xl py-2">{weather.name}</h2>
          <p className="font-thin text-sm">{koreaTime}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-3xl">{(weather.main.temp - 273.15).toFixed(2)}°C</p>
          <p className="text-4xl">{weatherIcon}</p>
        </div>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-5 gap-6 pt-6">
        <div className="flex flex-col items-center">
          <WiHumidity className="bg-white/20 w-12 h-12 p-2"/>
          <span className="font-thin py-0.5">습도</span>
          <span>{weather.main.humidity}%</span>
        </div>

        <div className="flex flex-col items-center">
          <PiWindDuotone className="bg-white/20 w-12 h-12 p-2"/>
          <span className="font-thin py-0.5">풍속</span>
          <span>{weather.wind.speed} m/s</span>
        </div>

        <div className="flex flex-col items-center">
          <WiDust className="bg-white/20 w-12 h-12 p-2" />
          <span className="font-thin py-0.5">미세먼지</span>
          <span>{airPollution.list[0].components.pm10}µg/m³</span>
        </div>

        <div className="flex flex-col items-center">
          <GiDustCloud className="bg-white/20 w-12 h-12 p-2" />
          <span className="font-thin py-0.5">초미세먼지</span>
          <span>{airPollution.list[0].components.pm2_5}µg/m³</span>
        </div>

        <div className="flex flex-col items-center">
          <CiTempHigh className="bg-white/20 w-12 h-12 p-2" />
          <span  className="font-thin py-0.5">체감 온도</span>
          <span>{(weather.main.feels_like - 273.15).toFixed(2)}°C</span>
        </div>
      </div>
    </div>
  )
}
