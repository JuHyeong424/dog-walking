interface PetEnrollSelectProps {
  title: string;
  options: string;
  value: string[];
  state: string;
  change: (value: string) => void;
}

export default function PetEnrollSelectComponent({ title, options, value, state, change }: PetEnrollSelectProps) {
  return (
    <div>
      <label className="block mb-2 text-gray-400">{title}</label>
      <select
        value={options}
        onChange={(e) => change(e.target.value)}
        className="border border-gray-300 text-gray-500 rounded-lg px-3 py-2 w-full"
      >
        <option>{state}</option>
        {value.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </div>
  )
}
