"use client"

import MapComponent from "@/app/walking/components/MapComponent";

export default function WalkingPage() {
  return (
    <div className="bg-gray-100 p-20">
      <div>
        <h1 className="text-4xl font-bold">산책 경로 추적</h1>
        <p className="text-gray-500 py-2">자신만의 산책 경로를 그려보아요</p>
      </div>
      <MapComponent />
    </div>
  )
}
