"use client";

interface UsageMethodGridProps {
  number: string;
  bgColor: string;
  title: string;
  content: string;
}

export default function UsageMethodGridComponent({ number, bgColor, title, content }: UsageMethodGridProps) {
  return (
    <section className="w-88 p-6 bg-white rounded-xl shadow-lg flex flex-col justify-center">
        <span className={`w-16 h-16 rounded-full ${bgColor} text-white p-4 flex items-center justify-center`}>
          <span className="text-4xl">{number}</span>
        </span>
      <h2 className="text-2xl font-bold py-4">{title}</h2>
      <p className="text-gray-400">{content}</p>
    </section>
  )
}
