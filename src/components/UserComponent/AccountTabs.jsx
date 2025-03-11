import { useState } from "react";

export default function AccountTabs({ children }) {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    return (
        <div>
            <div className="flex space-x-1 ">
              {children.map((child) => {
                const { label, onClick } = child.props;
                return (
                  <button
                    key={label}
                    className={`relative w-1/2 h-[40px] px-8 flex items-center justify-center text-lg ${
                      activeTab === label
                        ? "font-semibold text-black after:content-[''] after:absolute after:bottom-0 after:left-[50%] after:translate-x-[-50%] after:w-[140px] after:h-[2px] after:bg-black"
                        : "text-gray-400"
                    }`}
                    onClick={() => {
                      setActiveTab(label);
                      if (typeof onClick === "function") {
                        onClick();
                      }
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="pt-3">
              {children.map((child) => {
                return child.props.label === activeTab ? child.props.children : null;
              })}
            </div>
        </div>
    )
}