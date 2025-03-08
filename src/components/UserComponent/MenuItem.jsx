import { useNavigate } from "react-router-dom";

export default function MenuItem({ icon, label, path }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center space-x-2 p-2"
      onClick={() => navigate(path)}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
