import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

export default function ExchangeModal({ onClose, toCurrency }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50 z-40"
        onClick={onClose}
      ></div>

      <div className="relative bg-white p-6 rounded-t-2xl w-full pb-10 z-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">어떤 통화를 환전할까요?</h2>
          <button onClick={onClose}>
            <IoCloseOutline size={24} />
          </button>
        </div>

        <div className="flex justify-around">
          <button
            onClick={() => {
              navigate("/exchange/currency", {
                state: { fromCurrency: "USD", toCurrency },
              });
            }}
            className="flex flex-col bg-custom-gray-1 px-8 py-4 rounded-2xl justify-center items-center"
          >
            <img
              src={`https://flagsapi.com/US/flat/64.png`}
              alt={`US flag`}
              className="h-10"
            />
            <p>미국 USD</p>
          </button>
          <button
            onClick={() => {
              navigate("/exchange/currency", {
                state: { fromCurrencyCode: "KRW", toCurrency },
              });
            }}
            className="flex flex-col bg-custom-gray-1 px-8 py-4 rounded-2xl justify-center items-center"
          >
            <img
              src={`https://flagsapi.com/KR/flat/64.png`}
              alt={`KR flag`}
              className="h-10"
            />
            <p>한국 KRW</p>
          </button>
        </div>
      </div>
    </div>
  );
}
