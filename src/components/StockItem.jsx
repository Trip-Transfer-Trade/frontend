import React from "react"
import "./StockItem.css"

const StockItem = ({ rank, logo, name, code, price, change, isDollar = false }) => {
  const formattedCode = code ?? "ticker"
  const formattedPrice = (price ?? 0).toLocaleString();
  const checkChange = change ?? "0";
  const formattedChange = `${checkChange.startsWith("+") || checkChange.startsWith("-") ? "" : "+"}${checkChange}%`;
  const priceChangeClass = change >= 0 ? "price-up" : "price-down"

  return (
    <div className="stock-item">
      <div className="stock-info">
        <span className="stock-rank">{rank}.</span>
        <img src={logo || "/placeholder.svg"} alt="" className="stock-logo" />
        <div className="stock-details">
          <div className="stock-name">{name}</div>
          <div className="stock-code">{formattedCode}</div>
        </div>
      </div>
      <div className="stock-price">
        <div className="price">{formattedPrice}{isDollar ? "$" : "원"}</div>
        <div className={`price-change ${priceChangeClass}`}>{formattedChange}</div>
      </div>
    </div>
  )
}

export default StockItem

