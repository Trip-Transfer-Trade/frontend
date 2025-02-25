/* 

사용법

<Tabs>
  <Tab label="내 지갑">내 지갑 콘텐츠</Tab>
  <Tab label="실시간 환율">실시간 환율 콘텐츠</Tab>
</Tabs>

*/

import { useState } from "react";

export default function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(children[0].props.label); // 첫 번째 탭 기본 선택

  return (
    <div>
      <div className="flex border-b border-custom-gray-2 relative">
        {children.map((child) => {
          const { label } = child.props;
          return (
            <button
              key={label}
              className={`flex-1 p-2 text-lg relative ${
                activeTab === label
                  ? "font-bold after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-black"
                  : "text-custom-gray-3"
              }`}
              onClick={() => {
                setActiveTab(label);
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* 선택된 탭 내용 렌더링 */}
      <div className="p-6">
        {children.map((child) => {
          return child.props.label === activeTab ? child.props.children : null;
        })}
      </div>
    </div>
  );
}
