import {scoreColorMap} from "@/utils/walkingScores";

interface WalkingOKScoreProps {
  label: string;
  status: string;
}

export default function WalkingOKScoreComponent({ label, status }: WalkingOKScoreProps) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-gray-400">{label}</span>
      <span className={`font-bold ${scoreColorMap[status]}`}>{status}</span>
    </div>
  )
}
