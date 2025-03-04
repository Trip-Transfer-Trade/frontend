export default function ExchangeCard({
  image,
  title,
  price,
  selectedIndex,
  onClick,
}) {
  return (
    <div className="relative rounded-xl overflow-hidden" onClick={onClick}>
      {/* 배경 이미지 */}
      <img src={image} alt={title} className="w-full h-36 object-cover" />

      {/* 검은색 반투명 오버레이 */}
      <div className="absolute inset-0 bg-black opacity-30" />

      {/* 선택 여부에 따른 번호 배지 */}
      <div
        className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
          selectedIndex !== null ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
      >
        {selectedIndex !== null ? selectedIndex + 1 : ""}
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-right text-white pr-4">
        <p className="text-lg font-bold">{title}</p>
        <p>{price}</p>
      </div>
    </div>
  );
}
