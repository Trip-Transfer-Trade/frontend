import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackHeader() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center p-2 bg-white">
      <button onClick={() => navigate(-1)} className="p-2">
        <ArrowLeft size={24} />
      </button>
    </div>
  );
}
