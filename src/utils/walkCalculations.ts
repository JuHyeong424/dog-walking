// 산책 난이도에 대한 타입을 정의합니다.
export type WalkDifficulty = "여유로운 산책" | "보통 걸음" | "활기찬 산책";

interface WalkData {
  distance: number;
  walkTime: number;
}

/**
 * 산책의 평균 속도를 기반으로 난이도를 계산하는 함수
 * @param distance - 총 거리 (m)
 * @param walkTime - 총 시간 (분)
 * @returns {WalkDifficulty} - 계산된 난이도
 */
export function calculateWalkDifficulty(
  distance: number,
  walkTime: number
): WalkDifficulty {
  if (walkTime <= 0) {
    return "여유로운 산책"; // 시간이 0이면 계산 불가, 기본값 반환
  }

  const speed = distance / walkTime; // 분당 미터(m/min)

  if (speed < 50) {
    return "여유로운 산책";
  } else if (speed >= 50 && speed < 80) {
    return "보통 걸음";
  } else {
    return "활기찬 산책";
  }
}

/**
 * 산책으로 소모된 칼로리를 계산하는 함수
 * @param walkData - 거리와 시간 정보가 담긴 객체
 * @param dogWeight - 강아지 체중 (kg)
 * @returns {number} - 계산된 소모 칼로리 (kcal)
 */
export function calculateCaloriesBurned(
  walkData: WalkData,
  dogWeight: number
): number {
  const { distance, walkTime } = walkData;
  const difficulty = calculateWalkDifficulty(distance, walkTime);

  let metFactor: number;

  switch (difficulty) {
    case "여유로운 산책":
      metFactor = 0.04;
      break;
    case "보통 걸음":
      metFactor = 0.06;
      break;
    case "활기찬 산책":
      metFactor = 0.08;
      break;
    default:
      metFactor = 0.06;
  }

  const calories = dogWeight * walkTime * metFactor;
  return calories;
}
