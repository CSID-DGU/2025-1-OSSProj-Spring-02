interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
  }
  
  export default function InputField({
    id, label, type = "text", placeholder
  }: InputFieldProps) {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium mb-1">
          {label}
        </label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
        />
      </div>
    );
  }
  