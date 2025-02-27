import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import BackNavigation from "../../components/BackNavigation";
import Footer from "../../layout/Footer";
import { toast, ToastContainer } from "react-toastify";

import "./StockPage.css";

export default function StockTradingPage( {type} ) {


    const stockData = {
        name: "삼성전자",
        price: "352900",
        change: "-2.46",
        askPrices: ["56000", "55900", "56000", "56000", "55800", "56000", "55900", "56000", "56000", "56000", "56000"],
        bidPrices: ["56000", "55900", "56000", "56000", "55800", "56000", "55900", "56000", "56000", "56000", "56000"],
        askVolumes: ["100", "200", "150", "300", "250", "100", "200", "150", "300", "250", "100"],
        bidVolumes: ["120", "180", "130", "280", "220", "120", "180", "130", "280", "220", "120"],
    }

    const location = useLocation();
    const code = location.state?.code;
    const [tradeMode, setTradeMode] = useState("buy");
    const [purchasePrice, setPurchasePrice] = useState(354516)
    const [quantity, setQuantity] = useState(0)
    const [availableFunds] = useState(11232341)
    
    const scrollRef = useRef(null);
    
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 240;
        }
    }, [])


    useEffect(() => {
        console.log("현재 선택된 종목 코드:", code);
    }, [code]);

    const increaseQuantity = () => setQuantity(quantity + 1)
    const decreaseQuantity = () => setQuantity(Math.max(0, quantity - 1))
    const increasePurchasePrice = () => setPurchasePrice(purchasePrice + 100)
    const decreasePurchasePrice = () => setPurchasePrice(Math.max(0, purchasePrice - 100))

    const totalAmount = purchasePrice * quantity

    const handlePurchase = () => {
        if(tradeMode === "buy"){
            toast.success("매수 완료!", { position:"bottom-center", autoClose: 1000, style: {bottom: "80px"} } )
        } else {
            toast.success("매도 완료!", { position:"bottom-center", autoClose: 1000, style: {bottom: "80px"} } )
        }
    }

    return (
        <div>
            <BackNavigation text="" />
            <ToastContainer />
            <div className="p-1 border-b-3 border-gray-100">
                <div className="flex items-center">
                    <h1 className="text-xl font-bold text-center flex-1">{stockData.name}</h1>
                </div>
                <div className="text-center flex items-center justify-center gap-2">
                    <div className="text-l font-bold text-blue-600">{stockData.price.toLocaleString()}원</div>
                    <div className="text-xs text-blue-600">{stockData.change}%</div>
                </div>
            </div>
            <div className="flex">
                <div className="w-2/5 border-r border-gray-100 flex flex-col min-h-0 h-[614px] overflow-y-auto scrollbar-hide " ref={scrollRef}>
                    {stockData.askPrices.map((price, index) => (
                        <div key={`ask-${index}`} style={{ backgroundColor: "rgba(224, 231, 255, 0.1)" }} className="flex border-b border-gray-100 items-center">
                        <div className="w-20 p-3 text-blue-600 font-medium text-center">
                            {Number(price).toLocaleString()}
                        </div>
                        <div className="w-20 p-3 text-sm text-gray-500 text-right text-center">
                            {Number(stockData.askVolumes[index]).toLocaleString()}
                        </div>
                        </div>
                    ))}

                    {stockData.bidPrices.map((price, index) => (
                        <div key={`bid-${index}`} style={{ backgroundColor: "rgba(255, 233, 233, 0.1)" }} className="flex border-b border-gray-100 items-center">
                        <div className="w-20 p-3 text-red-600 font-medium text-center">
                            {Number(price).toLocaleString()}
                        </div>
                        <div className="w-20 p-3 text-sm text-gray-500 text-right text-center">
                            {Number(stockData.bidVolumes[index]).toLocaleString()}
                        </div>
                        </div>
                    ))}
                </div>
                <div className="w-3/5 p-4 flex flex-col flex-grow">
                    <div className="flex text-center ">
                        <button className={`w-1/2 font-bold h-[34px] rounded-sm ${ tradeMode === "buy" ? "bg-red-500 text-white" : "bg-white text-gray-500" }`}
                            onClick={() => {setTradeMode("buy"); setQuantity(0)}}>매수</button>
                        <button className={`w-1/2 font-bold h-[34px] rounded-sm ${ tradeMode === "sell" ? "bg-blue-500 text-white" : "bg-white text-gray-500" }`}
                            onClick={() => {setTradeMode("sell"); setQuantity(0)}}>매도</button>
                    </div>

                    <div className="py-2">
                        <div className="w-full flex flex-col items-left justify-between border rounded-lg px-4 py-3 border-gray-300">
                            <div className="text-sm text-gray-600 mb-2">{tradeMode === "buy" ? "구매 가격" : "판매 가격"}</div>
                            <div className="flex">
                                <p className="text-xl font-bold">{purchasePrice.toLocaleString()}원</p>
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
                            <div className="text-sm text-gray-600 mb-2">{tradeMode === "buy" ? "구매 수량" : "판매 수량"}</div>
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
                        <p className="text-sm text-gray-600">{tradeMode === "buy" ? "구매 가능 금액" : "판매 가능 금액"}</p>
                        <p className="font-medium">{availableFunds.toLocaleString()}원</p>
                    </div>

                    <div className="mt-auto">
                        <div className="p-2 flex justify-between items-center mt-auto">
                            <p className="text-sm text-gray-600">{tradeMode === "buy" ? "주문 금액" : "판매 금액"}</p>
                            <p className="text-xl font-semibold">{totalAmount.toLocaleString()}원</p>
                        </div>
                        <button onClick={handlePurchase} className={`w-full p-2 text-xl font-bold h-[48px] text-white rounded-lg ${ tradeMode === "buy" ? "bg-red-500" : "bg-blue-500" }`}>
                            {tradeMode === "buy" ? "구매하기" : "판매하기"}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
