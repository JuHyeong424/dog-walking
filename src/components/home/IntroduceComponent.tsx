export default function IntroduceComponent() {
  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage: "url('https://readdy.ai/api/search-image?query=A%20beautiful%20outdoor%20scene%20with%20a%20happy%20golden%20retriever%20walking%20on%20a%20tree-lined%20path%20in%20a%20park%2C%20with%20soft%20morning%20sunlight%20filtering%20through%20the%20leaves%2C%20creating%20a%20peaceful%20and%20serene%20atmosphere%20perfect%20for%20dog%20walking%2C%20featuring%20lush%20green%20grass%20and%20flowers%20along%20the%20pathway&width=1200&height=600&seq=hero-bg&orientation=landscape')"
      }}
    >
      <div className="inset-0 bg-black/30 p-12">
      <div className="font-bold text-6xl my-3">
        <h1 className="text-white">반려견과 함께하는</h1>
        <h1 className="text-blue-400">스마트한 산책</h1>
      </div>

      <div className="text-white my-6">
        <p>날씨 정보와 반려견 상태를 고려한 맞춤형 산책 계획부터</p>
        <p>용품 추천까지 모든 것을 한 곳에서 관리하세요</p>
      </div>

      <div className="flex my-3 gap-3">
        <button className="flex items-center justify-center h-10 bg-blue-500 text-white rounded-3xl p-4">지금 시작하기</button>
        <button className="flex items-center justify-center h-10 bg-white/30 backdrop-blur-sm rounded-3xl p-4 text-white">기능 살펴보기</button>
      </div>
      </div>
    </div>
  )
}
