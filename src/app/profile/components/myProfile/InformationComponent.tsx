interface InformaitonProps {
  label: string;
  value: string;
}

export default function InformationComponent({ label, value }: InformaitonProps) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-gray-400">{label}</span>
      <span className={`font-bold`}>{value}</span>
    </div>
  )
}
