export default function ExchangeTabs({ children, selectedTab, onTabChange }) {
  return (
    <div>
      <div className="sticky top-[10vh] bg-white flex z-999 border-b border-custom-gray-2 relative">
        {children.map(({ props: { label } }) => (
          <button
            key={label}
            className={`flex-1 p-2 text-lg relative ${
              selectedTab === label
                ? "font-bold after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-black"
                : "text-custom-gray-3"
            }`}
            onClick={() => onTabChange(label)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 선택된 탭 내용 렌더링 */}
      <div className="p-6">
        {
          children.find(({ props }) => props.label === selectedTab)?.props
            .children
        }
      </div>
    </div>
  );
}
