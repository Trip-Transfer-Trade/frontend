"use client"

import { useState } from "react"

export default function TopTrip() {
  // Mock data based on the image
  const [activeTab, setActiveTab] = useState("domestic")

  const portfolioData = {
    name: "미국 여행 가기",
    evaluationProfit: 200000,
    profitPercentage: 5.32,
    evaluationAmount: 510000,
    purchaseAmount: 310000,
    totalAssets: 1510000,
    deposit: 1000000,
  }

  return (
      <div className="mx-4 mt-4 bg-white rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">누적수익금</span>
          <div className="flex items-center">
            <span className="text-lg font-medium text-red-500">
              {portfolioData.evaluationProfit.toLocaleString()}원
            </span>
            <span className="ml-2 text-sm text-red-500">+{portfolioData.profitPercentage}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex justify-between">
            <span className="text-gray-500">평가금액</span>
            <span>{portfolioData.evaluationAmount.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">매입금액</span>
            <span>{portfolioData.purchaseAmount.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">총 자산</span>
            <span>{portfolioData.totalAssets.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">예수금</span>
            <span>{portfolioData.deposit.toLocaleString()}원</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <button className="py-2 border border-gray-300 rounded-md text-sm">이체하기</button>
          <button className="py-2 border border-gray-300 rounded-md text-sm">투자하기</button>
          <button className="py-2 border border-gray-300 rounded-md text-sm">환전하기</button>
        </div>
      </div>

  )
}

