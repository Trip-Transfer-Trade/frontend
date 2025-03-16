import { useNavigate } from "react-router-dom";

import { IoChevronBackOutline } from "react-icons/io5";

export default function BackNavigation({ text = "", onBack }) {
  const navigate = useNavigate();

  function handleBack() {
    if (onBack) {
      onBack();
    } else if (window.history.state !== null) {
      // state가 null이 아니면 뒤로 가기 가능
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  return (
    <div className="w-full flex items-center bg-white px-2 h-[10vh]">
      <button onClick={handleBack} className="p-2 flex items-center">
        <IoChevronBackOutline />
      </button>
      <h1 className="text-lg font-bold">{text}</h1>
    </div>
  );
}
