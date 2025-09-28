interface PetEnrollRowInputProps {
  title: string;
  type: string;
  change: (value: number) => void;
}

export default function PetEnrollRowInputComponent({ title, type, change }: PetEnrollRowInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-400">{title}</label>
      <input
        type={type}
        placeholder={title}
        onChange={(e) => change(Number(e.target.value))}
        className="w-full p-2 border border-gray-400 rounded-lg"
      />
    </div>
  )
}
