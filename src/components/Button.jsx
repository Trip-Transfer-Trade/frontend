export default function Button({ text, onClick, disabled = false, variant = "primary" }) {
    const baseStyle = "w-full p-3 rounded-lg font-bold";
    const styles = {
      primary: "bg-brand-blue text-white",
      secondary: "bg-blue-100 text-blue-600",
      disabled: "bg-gray-400 cursor-not-allowed",
    };
  
    return (
      <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${disabled ? styles.disabled : styles[variant]}`}>
        {text}
      </button>
    );
  }
  