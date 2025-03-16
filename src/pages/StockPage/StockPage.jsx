import React, { useEffect, useState } from "react";
import BackNavigation from "../../components/BackNavigation";

import Tabs from "../../components/Tabs";
import Tab from "../../components/Tab";
import StockItem from "../../components/StockItem";
import apiClient from "../../apis/apiClient";
import StockLogo from "../../components/StockLogo";
import StockLogoUs from "../../components/StockLogoUs";
import StockLogoRandom from "../../components/StockLogoRandom";

import "./StockPage.css";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Toggle from "../../components/Toggle";
import { StockIndexCard } from "../../components/StockIndexCard";

export default function StockPage() {
  const { tripGoal } = useParams();
  const navigate = useNavigate();
  const portfoliBanner = "/assets/images/stock/portfolioBanner.svg";

  const [nationTab, setNationTab] = useState("국내");
  const [type, setType] = useState("popular");
  const [stockItems, setStockItems] = useState({ list: [] });
  const [isToggled, setIsToggled] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(0);

  const marketData = {
    국내: [
      {
        name: "코스피",
        value: 2566.36,
        changePercentage: -0.2,
        changeValue: -7.28,
        color: "text-blue-500",
      },
      {
        name: "코스닥",
        value: 734.26,
        changePercentage: 1.5,
        changeValue: 11.46,
        color: "text-red-500",
      },
    ],
    미국: [
      {
        name: "나스닥",
        value: 15012.55,
        changePercentage: 1.2,
        changeValue: 178.45,
        color: "text-red-500",
      },
      {
        name: "다우",
        value: 34567.89,
        changePercentage: -0.8,
        changeValue: -276.43,
        color: "text-blue-500",
      },
    ],
  };

  const [stockDataIndex, setStockDataIndex] = useState(0);
  const [stockData, setStockData] = useState(marketData[nationTab][stockDataIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStockDataIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setStockData(marketData[nationTab][stockDataIndex]);
  }, [nationTab, stockDataIndex]);

  useEffect(() => {
    apiClient
      .get("/exchanges/rate/us")
      .then((response) => {
        console.error("달러 환율:", response.data.rate);
        const rate = parseFloat(response.data.rate.replace(/,/g, ""));
        setExchangeRate(rate);
      })
      .catch((err) => {
        console.error("환율 가져오기 실패", err);
      });
  }, [isToggled]);

  const convertType = (type) =>
    ({
      상승: "top",
      하락: "low",
      인기: "popular",
      거래량: "volume",
    }[type] || "popular");

  const getStockLogo = (stockCode, isKorean) => {
    const stockLogos = isKorean ? StockLogo : StockLogoUs;
    const stock = stockLogos.find((item) => item.stockCode === stockCode);
    const randomIndex = Math.floor(Math.random() * StockLogoRandom.length);

    return stock ? stock.logoImageUrl : StockLogoRandom[randomIndex];
  };

  useEffect(() => {
    console.log("🟢 API 호출! nationTab:", nationTab, "type:", type);
    apiClient
      .get(
        nationTab === "국내" ? "/exchanges/ranking" : "/exchanges/us/ranking",
        {
          params: { type: convertType(type) },
        }
      )
      .then((response) => {
        console.log(response.data.output);
        console.log(response.data.output2);
        const stockData =
          nationTab === "국내"
            ? response.data.data.output
            : response.data.output2;
        setStockItems({ list: Array.isArray(stockData) ? stockData : [] });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [nationTab, type]);

  

  return (
    <div>
      <BackNavigation text="투자하기" />
      <div>
        <section className="nation-container  px-8">
          <Tabs>
            <Tab
              label="국내"
              onClick={() => {
                setNationTab("국내");
              }}
            >
              <div className="search-container">
              <StockIndexCard 
                  name={stockData.name}
                  value={stockData.value}
                  changeValue={stockData.changeValue}
                  changePercentage={stockData.changePercentage}
                  color={stockData.color}
                />
              </div>
              <div className="ranking-title-k">실시간 랭킹</div>
              <section>
                <Tabs>
                  {[
                    { label: "인기", value: "popular" },
                    { label: "거래량", value: "volume" },
                    { label: "상승", value: "top" },
                    { label: "하락", value: "low" },
                  ].map(({ label, value }) => (
                    <Tab
                      key={value}
                      label={label}
                      onClick={() => setType(label)}
                    >
                      <div className="ranking-tab">
                        {stockItems.list.map((item) => (
                          <Link
                            key={item.data_rank}
                            to={`/trip/${tripGoal}/stocks/buy`}
                            state={{
                              name: item.hts_kor_isnm,
                              code: item.ticker,
                              tripGoal,
                            }}
                          >
                            <StockItem
                              rank={item.data_rank}
                              logo={getStockLogo(item.ticker, true)}
                              name={item.hts_kor_isnm}
                              code={item.ticker}
                              price={item.stck_prpr}
                              change={item.prdy_ctrt}
                            />
                          </Link>
                        ))}
                      </div>
                      <div className="portfoliBanner" onClick={() => navigate("/top")}>
                        <img src={portfoliBanner} alt="banner" />
                      </div>
                    </Tab>
                  ))}
                </Tabs>
              </section>
            </Tab>

            <Tab
              label="미국"
              onClick={() => {
                console.log("미국 선택함");
                setNationTab("미국");
              }}
            >
              <div className="search-container">
                <StockIndexCard 
                    name={stockData.name}
                    value={stockData.value}
                    changeValue={stockData.changeValue}
                    changePercentage={stockData.changePercentage}
                    color={stockData.color}
                  />
              </div>
              <div className="ranking-header">
                <span className="ranking-title">실시간 랭킹</span>
                <Toggle
                  label={"원화로 보기"}
                  isChecked={isToggled}
                  onChange={() => setIsToggled((prev) => !prev)}
                />
              </div>
              <section className="ranking-container">
                <Tabs>
                  {[
                    { label: "인기", value: "popular" },
                    { label: "거래량", value: "volume" },
                    { label: "상승", value: "top" },
                    { label: "하락", value: "low" },
                  ].map(({ label, value }) => (
                    <Tab
                      key={value}
                      label={label}
                      onClick={() => {
                        console.log(label);
                        setType(label);
                      }}
                    >
                      <div className="ranking-tab">
                        {stockItems.list.slice(0, 30).map((item, index) => (
                          <Link
                            key={item.rank}
                            to={`/trip/${tripGoal}/stocks/buy`}
                            state={{
                              name: item.knam,
                              code: item.symb,
                              tripGoal,
                            }}
                          >
                            <StockItem
                              rank={item.rank > 0 ? item.rank : index + 1}
                              logo={getStockLogo(item.symb, false)}
                              name={
                                item.knam
                                  ? item.knam.toLocaleString()
                                  : "undefined"
                              }
                              code={item.symb}
                              price={
                                isToggled
                                  ? (item.last * exchangeRate)
                                      .toFixed(0)
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                  : Number(item.last).toFixed(2)
                              }
                              change={item.rate}
                              isDollar={!isToggled}
                            />
                          </Link>
                        ))}
                      </div>
                      <div className="portfoliBanner">
                        <img src={portfoliBanner} alt="banner" />
                      </div>
                    </Tab>
                  ))}
                </Tabs>
              </section>
            </Tab>
          </Tabs>
        </section>
      </div>

      <Outlet />
    </div>
  );
}
