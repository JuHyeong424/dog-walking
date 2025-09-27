interface PetEnrollInputProps {
  title: string;
  placeholder: string;
  change: (value: string) => void;
}

export default function PetEnrollInputComponent({ title, placeholder, change }: PetEnrollInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-400">{title}</label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => change(e.target.value)}
        className="w-full p-2 border border-gray-400 rounded-lg"
      />
    </div>
  )
}
