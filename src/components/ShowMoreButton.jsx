export default function ShowMoreButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full p-3 rounded-lg bg-custom-gray-1"
    >
      더보기
    </button>
  );
}
