interface totalWalkingScoreProps {
  tempScore: string;
  humidityScore: string;
  windScore: string;
  pm10Score: string;
  pm25Score: string;
  time?: string;
}

// 평가를 숫자로 변환하기 위한 맵
const scoreMap = {
  "좋음": 100,
  "보통": 50,
  "주의": 0,
} as const;

// 강아지 산책 적합도 계산을 위한 가중치
const weights = {
  temperature: 0.30, // 온도는 발바닥 화상 위험 등으로 매우 중요
  humidity: 0.20,    // 습도는 강아지의 체온 조절에 큰 영향을 줌
  wind: 0.10,        // 바람은 비교적 영향이 적음
  pm10: 0.20,        // 미세먼지는 지면에 가까운 강아지에게 더 위험
  pm25: 0.20,        // 초미세먼지는 더욱 위험
};

export default function totalWalkingScore( { time, tempScore, humidityScore, windScore, pm10Score, pm25Score }: totalWalkingScoreProps) {
  const tempEvaluation = scoreMap[tempScore] * weights.temperature;
  const humidityEvaluation = scoreMap[humidityScore] * weights.humidity;
  const windEvaluation = scoreMap[windScore] * weights.wind;
  const pm10Evaluation = scoreMap[pm10Score] * weights.pm10;
  const pm25Evaluation = scoreMap[pm25Score] * weights.pm25;

  const total = Math.round(
    tempEvaluation + humidityEvaluation + windEvaluation + pm10Evaluation + pm25Evaluation
  );

  return time ? { time, score: total } : { score: total };

};
