import {whyData} from "@/data/whyData";
import { FaCheck } from "react-icons/fa6";

export default function WhyComponent() {
  return (
    <div>
      <h1 className="font-bold text-2xl py-4">왜 PetWalk인가요?</h1>
      {whyData.map((item) => (
        <div key={item.title} className="flex flex-row">
          <span className={`w-8 h-8 rounded-full ${item.bgColor} ${item.textColor} p-2 flex items-center justify-center`}>
            <FaCheck />
          </span>
          <div className="flex flex-col px-2">
            <h2 className="text-lg font-bold pb-1">{item.title}</h2>
            <p className="text-gray-500 pb-5">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
