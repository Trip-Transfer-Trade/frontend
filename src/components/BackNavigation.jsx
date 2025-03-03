import { useNavigate } from "react-router-dom";

export default function BackNavigation({ text = "", onBack }) {
  const navigate = useNavigate();

  function handleBack() {
    if (onBack) onBack();
    else navigate(-1);
  }

  return (
    <div className="w-full flex items-center px-0 p-2 bg-white">
      <button onClick={handleBack} className="p-2 pr-2 py-2 flex items-center">
        <img src="/src/assets/images/back-arrow.svg" alt="BackArrow" />
      </button>
      <span className="ml-2 text-lg font-bold">{text}</span>
    </div>
  );
}
