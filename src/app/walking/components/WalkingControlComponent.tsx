export default function WalkingControlComponent() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h1 className="text-2xl font-bold pt-3">산책 제어</h1>
      <div className="py-2">
        <h2 className="text-xl font-bold py-3">사용 방법</h2>
        <div className="flex flex-col gap-2">
          <span>1. 지도 위에 좌클릭을 하세요.</span>
          <span>2. 지도 위에 자신만의 경로를 그리세요.</span>
          <span>3. 우클릭으로 경로 그리기를 종료해요.</span>
          <span>4. 나만의 경로를 분석해 보아요.</span>
        </div>
      </div>
    </div>
  )
}
