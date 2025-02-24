export default function NextConfirmButton({ text, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full p-3 rounded-lg text-white font-bold bg-brand-blue"
    >
      {text}
    </button>
  );
}
