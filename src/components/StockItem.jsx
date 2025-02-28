import React from "react"
import "./StockItem.css"

const StockItem = ({ rank, logo, name, code, price, change }) => {
  const formattedPrice = price.toLocaleString("ko-KR")
  const formattedChange = `${change >= 0 ? "+" : ""}${change}%`
  const priceChangeClass = change >= 0 ? "price-up" : "price-down"

  return (
    <div className="stock-item">
      <div className="stock-info">
        <span className="stock-rank">{rank}.</span>
        <img src={logo || "/placeholder.svg"} alt="" className="stock-logo" />
        <div className="stock-details">
          <div className="stock-name">{name}</div>
          <div className="stock-code">{code}</div>
        </div>
      </div>
      <div className="stock-price">
        <div className="price">{formattedPrice}원</div>
        <div className={`price-change ${priceChangeClass}`}>{formattedChange}</div>
      </div>
    </div>
  )
}

export default StockItem

