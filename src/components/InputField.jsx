export default function InputField({
  label,
  name,
  type = "text",
  value = "",
  onChange,
  options = [],
  placeholder = "",
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium">{label}</label>
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="input-style"
        >
          <option value="" disabled>
            {placeholder || "선택"}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          className="input-style"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
