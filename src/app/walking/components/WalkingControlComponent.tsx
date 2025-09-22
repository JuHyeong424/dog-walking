export default function WalkingControlComponent() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h1 className="text-2xl font-bold py-3">산책 제어</h1>
      <button
        className="w-full bg-green-500 text-white font-bold px-10 py-5 rounded-xl cursor-pointer"
      >
        ▶ 산책 경로 그리기
      </button>
      <div className="py-2">
        <h2 className="text-xl font-bold py-3">사용 방법</h2>
        <div className="flex flex-col gap-2">
          <span>1. 위 버튼을 클릭하세요.</span>
          <span>2. 지도 위에 자신만의 경로를 그리세요.</span>
          <span>3. 그린 후, 나만의 경로를 저장하세요.</span>
        </div>
      </div>
    </div>
  )
}
