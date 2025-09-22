export default function WalkingCurrentInfoComponent({ title, value }) {
  return (
    <div className="flex justify-between">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  )
}
