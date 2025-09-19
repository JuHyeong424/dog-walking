"use client";

import FunctionGridComponent from "@/components/home/FunctionGridComponent";
import {functionGridItems} from "@/data/functionGridData";

export default function MainFunctionComponent() {
  return (
    <div className="py-12 bg-blue-100">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold p-4">주요 기능</h1>
        <p className="pb-4">반려견과 산책을 더욱 즐겁고 안전하게</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {functionGridItems.map((item) => (
            <FunctionGridComponent key={item.content} icon={item.icon} bgColor={item.bgColor} textColor={item.textColor}
                                   title={item.title} content={item.content} navigation={item.navigation} />
          ))}
        </div>
      </div>
    </div>
  )
}
