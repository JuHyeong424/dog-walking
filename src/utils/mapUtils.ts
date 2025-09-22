export function getTimeHTML(distance: number): string {
  // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
  const walkTime = (distance / 67) | 0;
  let walkHour = '';
  let walkMin = '';

  if (walkTime > 60) {
    walkHour = `<span class="number">${Math.floor(walkTime / 60)}</span>시간 `;
  }
  walkMin = `<span class="number">${walkTime % 60}</span>분`;

  // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
  let content = '<ul class="dotOverlay distanceInfo">';
  content += '    <li>';
  content += `        <span class="label">총거리</span><span class="number">${distance}</span>m`;
  content += '    </li>';
  content += '    <li>';
  content += `        <span class="label">산책</span>${walkHour}${walkMin}`;
  content += '    </li>';
  content += '</ul>';

  return content;
}
