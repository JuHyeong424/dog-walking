"use client";

import {useRouter} from "next/navigation";

interface FunctionGridProps {
  icon: React.ElementType;
  bgColor: string;
  textColor: string;
  title: string;
  content: string;
  navigation: string;
}

export default function FunctionGridComponent({ icon: Icon, bgColor, textColor, title, content, navigation }: FunctionGridProps) {
  const router = useRouter();

  return (
    <section
      onClick={() => router.push(navigation)}
      className="w-88 p-6 bg-white rounded-xl shadow-lg flex flex-col justify-center cursor-pointer"
    >
        <span className={`w-16 h-16 rounded-full ${bgColor} ${textColor} p-4 flex items-center justify-center`}>
          <Icon className="text-4xl"/>
        </span>
      <h2 className="text-2xl font-bold py-4">{title}</h2>
      <p className="text-gray-400">{content}</p>
    </section>
  )
}
