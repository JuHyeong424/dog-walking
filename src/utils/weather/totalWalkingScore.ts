// utils/totalWalkingScore.ts

// 평가를 숫자로 변환하기 위한 맵
const scoreMap = {
  "좋음": 100,
  "보통": 50,
  "주의": 0,
} as const;

type ScoreStatus = keyof typeof scoreMap;

interface totalWalkingScoreProps {
  tempScore: ScoreStatus;
  humidityScore: ScoreStatus;
  windScore: ScoreStatus;
  pm10Score: ScoreStatus;
  pm25Score: ScoreStatus;
  time?: string;
}

const weights = {
  temperature: 0.30,
  humidity: 0.20,
  wind: 0.10,
  pm10: 0.20,
  pm25: 0.20,
};

export default function totalWalkingScore({ time, tempScore, humidityScore, windScore, pm10Score, pm25Score }: totalWalkingScoreProps) {
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