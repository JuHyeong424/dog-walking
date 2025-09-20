import {checkHumidity, checkPM10, checkPM25, checkTemp, checkWind, scoreColorMap} from "@/utils/walkingScores";

interface WalkingOKProps {
  temperature: number;
  humidity: number;
  wind: number;
  pm10: number;
  pm25: number;
}

export default function WalkingOK({temperature, humidity, wind, pm10, pm25}: WalkingOKProps) {
  const tempScore = checkTemp(temperature);
  const humidityScore = checkHumidity(humidity);
  const windScore = checkWind(wind);
  const pm10Score = checkPM10(pm10);
  const pm25Score = checkPM25(pm25);

  return (
    <div className="bg-white rounded-xl w-2/7 p-5">
      <h1 className="font-bold text-2xl">산책 적합도</h1>
      <p>평가</p>
      <div className="flex flex-col py-8">
        <div className="flex justify-between py-1">
          <span className="text-gray-400">온도</span>
          <span className={`font-bold ${scoreColorMap[tempScore]}`}>{tempScore}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-gray-400">습도</span>
          <span className={`font-bold ${scoreColorMap[humidityScore]}`}>{humidityScore}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-gray-400">바람</span>
          <span className={`font-bold ${scoreColorMap[windScore]}`}>{windScore}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-gray-400">미세먼지</span>
          <span className={`font-bold ${scoreColorMap[pm10Score]}`}>{pm10Score}</span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="text-gray-400">초미세먼지</span>
          <span className={`font-bold ${scoreColorMap[pm25Score]}`}>{pm25Score}</span>
        </div>
      </div>
    </div>
  )
}
