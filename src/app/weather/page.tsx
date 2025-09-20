import WeatherComponent from "@/app/weather/components/WeatherComponent";

export default function WeatherPage() {
  return (
    <div className="bg-gray-100 p-20">
      <div>
        <h1 className="text-4xl font-bold">날씨 기반 산책 적합도</h1>
        <p className="text-gray-500 py-2">실시간 기상 정보를 바탕으로 최적 산책 시간을 확인하세요</p>
      </div>

      <div>
        <WeatherComponent/>

      </div>
    </div>
  )
}