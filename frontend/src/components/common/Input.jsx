const Input = ({
  label,
  type = "text",
  placeholder,
  register,
  name,
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-sm font-semibold">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
        className="border border-gray-600 bg-gray-900 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default Input;