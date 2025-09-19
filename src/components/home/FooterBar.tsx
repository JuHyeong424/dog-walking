import {footerData} from "@/data/footerData";

export default function FooterBar() {
  return (
    <footer className=" flex items-center justify-between bg-gray-900 px-18 py-12">
      <div>
        <span className="text-white">로고</span>
        <p className="text-gray-500">반려견과 함께하는 스마트한 산책 관리 플랫폼</p>
      </div>
      <div className="flex gap-26">
        {footerData.map((item) => (
          <div key={item.title}>
            <h5 className="text-white pb-2">{item.title}</h5>
            {item.list.map((i) => (
              <div key={i} className="text-gray-500 pb-2">{i}</div>
            ))}
          </div>
        ))}
      </div>
    </footer>
  )
}
