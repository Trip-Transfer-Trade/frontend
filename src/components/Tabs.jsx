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
      {/* 탭 헤더 */}
      <div className="flex space-x-1 px-8">
        {children.map((child) => {
          const { label } = child.props;
          return (
            <button
              key={label}
              className={`relative w-[55px] h-[34px] flex items-center justify-center text-lg ${
                activeTab === label
                  ? "font-bold text-black after:content-[''] after:absolute after:bottom-0 after:left-[50%] after:translate-x-[-50%] after:w-[55px] after:h-[2px] after:bg-black"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab(label)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* 선택된 탭 내용 */}
      <div className="pt-3">
        {children.map((child) =>
          child.props.label === activeTab ? child.props.children : null
        )}
      </div>
    </div>
  );
}
