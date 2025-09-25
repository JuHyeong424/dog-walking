"use client"

import MapComponent from "@/app/walking/components/MapComponent";
import WalkingControlComponent from "@/app/walking/components/WalkingControlComponent";
import WalkingInformationComponent from "@/app/walking/components/WalkingInformationComponent";
import LatestWalkingHistoryComponent from "@/app/walking/components/LatestWalkingHistoryComponent";

export default function WalkingPage() {
  return (
    <div className="bg-gray-100 p-20">
      <div>
        <h1 className="text-4xl font-bold">산책 경로 추적</h1>
        <p className="text-gray-500 py-2">자신만의 산책 경로를 그려보아요</p>
      </div>

      <div className="flex flex-row gap-8">
        <div className="flex flex-col w-5/8 gap-8">
          <MapComponent />
          <LatestWalkingHistoryComponent />
        </div>
        <div className="flex flex-col w-3/8 gap-8">
          <WalkingControlComponent />
          <WalkingInformationComponent />
        </div>
      </div>
    </div>
  )
}
