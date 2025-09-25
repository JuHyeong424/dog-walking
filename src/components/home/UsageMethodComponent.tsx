import {usageMethodData} from "@/data/usageMethodData";
import UsageMethodGridComponent from "@/components/home/UsageMethodGridComponent";

export default function UsageMethodComponent() {
  return (
    <div className="py-12">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold p-4">이용 방법</h1>
        <p className="pb-4">간단한 3단계로 시작하세요</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {usageMethodData.map((item) => (
            <UsageMethodGridComponent key={item.number} number={item.number} bgColor={item.bgColor} title={item.title} content={item.content} />
          ))}
        </div>
      </div>
    </div>
  )
}
