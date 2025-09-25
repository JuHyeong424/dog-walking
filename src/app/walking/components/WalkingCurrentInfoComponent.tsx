interface WalkingCurrentInfoProps {
  title: string;
  value: string;
}

export default function WalkingCurrentInfoComponent({ title, value }: WalkingCurrentInfoProps) {
  return (
    <div className="flex justify-between">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  )
}
