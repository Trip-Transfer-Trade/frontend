export default function InputField({ label, name, type = "text", value = "", onChange, options = [] }) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">{label}</label>
        {type === "select" ? (
          <select name={name} value={value} onChange={onChange} className="input-style">
            <option value="">선택하세요</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input type={type} name={name} value={value || ""} onChange={onChange} className="input-style" />
        )}
      </div>
    );
  }
  