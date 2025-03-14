import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BackNavigation from "../../components/BackNavigation";
import Footer from "../../layout/Footer";
import { toast, ToastContainer } from "react-toastify";

import "./StockPage.css";
import apiClient from "../../apis/apiClient";

export default function StockTradingPage() {
  const navigate = useNavigate();
  const { trademode, tripGoal } = useParams();
  const location = useLocation();
  const { name, code } = location.state || {};
  console.log("📌 tripGoal 값:", tripGoal);

  const [tradeMode, setTradeMode] = useState(trademode || "buy");
  const [price, setPrice] = useState("0");
  const [stockChangeRate, setStockChangeRate] = useState("0");
  const [askPrices, setAskPrices] = useState([]);
  const [bidPrices, setBidPrices] = useState([]);
  const [askQuantities, setAskQuantities] = useState([]);
  const [bidQuantities, setBidQuantities] = useState([]);
  const [purchasePrice, setPurchasePrice] = useState("0");
  const [quantity, setQuantity] = useState(0);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [availableFunds, setAvaliableFunds] = useState(0);
  const [currencyPrice, setCurrencyPrice] = useState();
  const [currencySymbol, setCurrencySymbol] = useState("원");
  const [isTradeCompleted, setIsTradeCompleted] = useState(false);
  const [currencyCode, setCurrencyCode] = useState("KRW");
  const scrollRef = useRef(null);

  const isCheckCode = /^\d+$/.test(code);

  useEffect(() => {
    setCurrencySymbol(isCheckCode ? "원" : "$");
    setCurrencyCode(isCheckCode ? "KRW" : "USD");
  }, [currencySymbol, currencyCode]);

  useEffect(() => {
    apiClient
      .get(`/exchanges/order/amount/${tripGoal}/${currencyCode}`)
      .then((response) => {
        console.log("📌 API 금액 확인:", response.data);
        setAvaliableFunds(response.data.data.amount);
        setIsTradeCompleted(false);
      })
      .catch((err) => {
        console.error("API 호출 중 오류 발생:", err);
      });
  }, [isTradeCompleted]);

  useEffect(() => {
    apiClient
      .get(`/exchanges/order/quantity/${tripGoal}/${code}`)
      .then((response) => {
        console.log("📌 API 금액 확인:", response.data);
        setAvailableQuantity(response.data.data.quantity);
        setIsTradeCompleted(false);
      })
      .catch((err) => {
        console.error("API 호출 중 오류 발생:", err);
      });
  }, [isTradeCompleted]);

  useEffect(() => {
    const apiUrl = isCheckCode ? `/exchanges/${code}` : `/exchanges/us/${code}`;

    apiClient
      .get(apiUrl)
      .then((response) => {
        console.log("📌 API 응답 데이터:", response.data);
        console.log("넘어온 ticker", code);

        const priceData = isCheckCode
          ? response.data.data.output2.stck_prpr
          : response.data.data.output1.last;
        setPrice(priceData);

        const changeRate = isCheckCode
          ? response.data.data.output2.antc_cntg_prdy_ctrt
          : (
              ((parseFloat(response.data.data.output1.last) -
                parseFloat(response.data.data.output1.base)) /
                parseFloat(response.data.data.output1.base)) *
              100
            ).toFixed(2);
        setStockChangeRate(changeRate);

        const askP = Object.values(
          isCheckCode
            ? response.data.data.output1.askPrices || {}
            : response.data.data.output2.paskPrices || {}
        );
        const bidP = Object.values(
          isCheckCode
            ? response.data.data.output1.bidPrices || {}
            : response.data.data.output2.pbidPrices || {}
        );
        const askQ = Object.values(
          isCheckCode
            ? response.data.data.output1.askQuantities || {}
            : response.data.data.output2.vaskQuantities || {}
        );
        const bidQ = Object.values(
          isCheckCode
            ? response.data.data.output1.bidQuantities || {}
            : response.data.data.output2.vbidQuantities || {}
        );
        setAskPrices(askP);
        setBidPrices(bidP);
        setAskQuantities(askQ);
        setBidQuantities(bidQ);

        setCurrencyPrice(price);
        setPurchasePrice(price);

        if (scrollRef.current) {
          scrollRef.current.scrollTop = 150;
        }
      })
      .catch((err) => {
        console.error("API 호출 중 오류 발생:", err);
      });
  }, [code, price]);

  const handleTradeModeChange = (mode) => {
    setTradeMode(mode);
    navigate(`/trip/${tripGoal}/stocks/${mode}`, {
      state: { name, code },
      replace: true,
    });
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(Math.max(0, quantity - 1));
  const increasePurchasePrice = () => setPurchasePrice(purchasePrice + 10);
  const decreasePurchasePrice = () =>
    setPurchasePrice(Math.max(0, purchasePrice - 10));

  const totalAmount = purchasePrice * quantity;

  const handlePurchase = () => {
    if (quantity === 0) {
      toast.error("주문 실패: 수량은 0보다 커야 합니다.", {
        position: "bottom-center",
        autoClose: 1000,
        style: { bottom: "80px" },
      });
      return;
    }

    if (quantity * purchasePrice > availableFunds) {
      if (tradeMode === "buy") {
        toast.error("매수 실패: 보유 예수금이 주문 금액보다 작습니다.", {
          position: "bottom-center",
          autoClose: 1000,
          style: { bottom: "80px" },
        });
        return;
      }
    }

    const apiUrl =
      tradeMode === "buy" ? "/exchanges/stocks/buy" : "/exchanges/stocks/sell";

    const currencyCode = isCheckCode ? "KRW" : "USD";

    const requestData = {
      tripId: tripGoal,
      amount: quantity * purchasePrice,
      currencyCode: currencyCode,
      stockCode: code,
      quantity,
      pricePerUnit: purchasePrice,
      totalPrice: quantity * purchasePrice,
    };

    apiClient
      .post(apiUrl, requestData)
      .then((response) => {
        console.log("📌 API 응답:", response.data);
        toast.success(`${tradeMode === "buy" ? "매수" : "매도"} 완료!`, {
          position: "bottom-center",
          autoClose: 1000,
          style: { bottom: "80px" },
        });
        setIsTradeCompleted(true);
      })
      .catch((err) => {
        console.error(
          "🚨 거래 실패! 서버 응답:",
          err.response?.data || err.message
        );
        toast.error("거래 실패! 다시 시도해주세요.", {
          position: "bottom-center",
          autoClose: 1000,
          style: { bottom: "80px" },
        });
      });
  };

  return (
    <div>
      <BackNavigation text="" />
      <ToastContainer />
      <div className="p-1 border-b-3 border-gray-100">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-center flex-1">{name}</h1>
        </div>
        <div className="text-center flex items-center justify-center gap-2">
          <div className="text-l font-bold text-blue-600">
            {Number(price).toLocaleString()}
            {currencySymbol}
          </div>
          <div className="text-xs text-blue-600">
            {stockChangeRate ?? "데이터 없음"}%
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className="w-2/5 border-r border-gray-100 flex flex-col min-h-0 h-[614px] overflow-y-auto scrollbar-hide "
          ref={scrollRef}
        >
          {[...askPrices]
            .sort((a, b) => b - a)
            .map((price, index) => (
              <div
                key={`ask-${index}`}
                style={{ backgroundColor: "rgba(224, 231, 255, 0.1)" }}
                className="flex border-b border-gray-100 items-center"
              >
                <div className="w-20 p-3 text-red-600 font-medium text-center">
                  {Number(price).toLocaleString()}
                </div>
                <div className="w-20 p-3 text-sm text-gray-500 text-right text-center">
                  {Number(askQuantities[index]).toLocaleString()}
                </div>
              </div>
            ))}

          {[...bidPrices]
            .sort((a, b) => b - a)
            .map((price, index) => (
              <div
                key={`bid-${index}`}
                style={{ backgroundColor: "rgba(255, 233, 233, 0.1)" }}
                className="flex border-b border-gray-100 items-center"
              >
                <div className="w-20 p-3 text-blue-600 font-medium text-center">
                  {Number(price).toLocaleString()}
                </div>
                <div className="w-20 p-3 text-sm text-gray-500 text-right text-center">
                  {Number(bidQuantities[index]).toLocaleString()}
                </div>
              </div>
            ))}
        </div>

        <div className="w-3/5 p-4 flex flex-col flex-grow">
          <div className="flex text-center ">
            <button
              className={`w-1/2 font-bold h-[34px] rounded-sm ${
                tradeMode === "buy"
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-500"
              }`}
              onClick={() => {
                handleTradeModeChange("buy");
                setQuantity(0);
                setPurchasePrice(currencyPrice);
              }}
            >
              매수
            </button>
            <button
              className={`w-1/2 font-bold h-[34px] rounded-sm ${
                tradeMode === "sell"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-500"
              }`}
              onClick={() => {
                handleTradeModeChange("sell");
                setQuantity(0);
                setPurchasePrice(currencyPrice);
              }}
            >
              매도
            </button>
          </div>

          <div className="py-2">
            <div className="w-full flex flex-col items-left justify-between border rounded-lg px-4 py-3 border-gray-300">
              <div className="text-sm text-gray-600 mb-2">
                {tradeMode === "buy" ? "매수 가격" : "매도 가격"}
              </div>
              <div className="flex">
                <p className="text-xl font-bold">
                  {Number(purchasePrice).toLocaleString()}
                  {currencySymbol}
                </p>
                <div className="flex ml-auto">
                  <button onClick={decreasePurchasePrice} className="p-1">
                    -
                  </button>
                  <button onClick={increasePurchasePrice} className="p-1">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="w-full flex flex-col items-left justify-between border rounded-lg px-4 py-3 border-gray-300">
              <div className="text-sm text-gray-600 mb-2">
                {tradeMode === "buy" ? "매수 수량" : "매도 수량"}
              </div>
              <div className="flex">
                <p className="text-lg font-bold">{quantity} 주</p>
                <div className="flex ml-auto">
                  <button onClick={decreaseQuantity} className="p-1">
                    -
                  </button>
                  <button onClick={increaseQuantity} className="p-1">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {tradeMode === "buy" ? "매수 가능 금액" : "매도 가능 수량"}
            </p>
            {/* <p className="font-medium">{availableFunds.toLocaleString()}{currencySymbol}</p> */}
            {tradeMode === "buy" ? (
              <p className="font-medium">
                {availableFunds.toLocaleString()}
                {currencySymbol}
              </p>
            ) : (
              <p className="font-medium">{availableQuantity} 주</p>
            )}
          </div>

          <div className="mt-auto">
            <div className="p-2 flex justify-between items-center mt-auto">
              <p className="text-sm text-gray-600">
                {tradeMode === "buy" ? "매수 금액" : "매도 금액"}
              </p>
              <p className="text-xl font-semibold">
                {totalAmount.toLocaleString()}
                {currencySymbol}
              </p>
            </div>
            <button
              onClick={handlePurchase}
              className={`w-full p-2 text-xl font-bold h-[48px] text-white rounded-lg ${
                tradeMode === "buy" ? "bg-red-500" : "bg-blue-500"
              }`}
            >
              {tradeMode === "buy" ? "매수하기" : "매도하기"}
            </button>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
