import React, { useEffect, useState } from "react";
import BackNavigation from "../../components/BackNavigation";
import Footer from "../../layout/Footer";
import Tabs from "../../components/Tabs";
import Tab from "../../components/Tab";
import StockItem from "../../components/StockItem";
import axios from "axios";

import "./StockPage.css"
import { Link, Outlet } from "react-router-dom";
import Toggle from "../../components/Toggle";

export default function StockPage() {
    const portfoliBanner = "/assets/images/stock/portfolioBanner.svg";

    const [nationTab, setNationTab] = useState("국내");
    const [type, setType] = useState("top");
    const [stockItems, setStockItems] = useState({ list: [] });
    const [isToggled, setIsToggled] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8084/api/exchanges/rate/us")
        .then((response) => {
            console.error("달러 환율:", response.data.rate)
            const rate = parseFloat(response.data.rate.replace(/,/g, ""));
            setExchangeRate(rate)
        })
        .catch((err) => {
            console.error("환율 가져오기 실패", err)
        })
    }, [isToggled])

    
    const convertType = (type) => ({
        "상승": "top",
        "하락": "low",
        "인기": "popular",
        "거래량": "volume"
    }[type] || "top");

    useEffect(() => {
        axios.get(nationTab === "국내" ? "http://localhost:8084/api/stocks" : "http://localhost:8084/api/stocks/us", {
            params: { type: convertType(type) }
        })
        .then((response) => {
            console.log(response.data.output)
            const stockData = nationTab === "국내" ? response.data.output : response.data.output2;
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
                <section className="nation-container">
                <Tabs className="stockTab">
                    <Tab label="국내" onClick={() => { setNationTab("국내"); }}>
                        <div className="search-container">
                            <input type="text" className="searchInput" placeholder="검색어를 입력해 주세요."/>
                            <img src="/assets/images/stock/searchBtn.svg" alt="검색 돋보기 아이콘" className="searchBtn" />
                        </div>
                        <div className="ranking-title-k">실시간 랭킹</div>
                        <section className="ranking-container">
                            <Tabs>
                                {[
                                    { label: "상승", value: "top"},
                                    { label: "하락", value: "low"},
                                    { label: "인기", value: "popular"},
                                    { label: "거래량", value: "volume"},
                                ].map(({ label, value }) => (
                                    <Tab key={value} label={label} onClick={() => setType(label)} >
                                        <div className="ranking-tab">
                                            {stockItems.list.map((item) => (
                                                <Link key={item.data_rank} to="/stocks/buy" state={{ name: item.hts_kor_isnm, code: item.ticker }}>
                                                    <StockItem 
                                                        rank={item.data_rank}
                                                        logo="https://via.placeholder.com/40"
                                                        name={item.hts_kor_isnm}
                                                        code={item.ticker }
                                                        price={item.stck_prpr}
                                                        change={item.prdy_ctrt}
                                                    />
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="portfoliBanner" >
                                            <img src={portfoliBanner} alt="banner"/>
                                        </div>
                                    </Tab>
                                ))}
                            </Tabs>
                        </section>
                    </Tab>

                    <Tab label="미국" onClick={() =>{ console.log("미국 선택함"); setNationTab("미국")}}>
                        <div className="search-container">
                            <input type="text" className="searchInput" placeholder="검색어를 입력해 주세요."/>
                            <img src="/assets/images/stock/searchBtn.svg" alt="검색 돋보기 아이콘" className="searchBtn" />
                        </div>
                        <div className="ranking-header">
                            <span className="ranking-title">실시간 랭킹</span>
                            <Toggle label={"원화로 보기"} isChecked={isToggled} onChange={() => setIsToggled(prev => !prev)}/>
                        </div>
                        <section className="ranking-container">
                            <Tabs>
                                {[
                                    { label: "상승", value: "top"},
                                    { label: "하락", value: "low"},
                                    { label: "인기", value: "popular"},
                                    { label: "거래량", value: "volume"},
                                ].map(({ label, value }) => (
                                    <Tab key={value} label={label} onClick={() => {console.log(label); setType(value)}} >
                                        <div className="ranking-tab">
                                            {stockItems.list.slice(0, 30).map((item, index) => (
                                                <Link key={item.rank} to="/stocks/buy" state={{ name: item.knam, code: item.symb }}>
                                                <StockItem 
                                                    rank={item.rank > 0 ? item.rank : index + 1}
                                                    logo="https://via.placeholder.com/40"
                                                    name={item.knam ? item.knam.toLocaleString() : "undefined"}
                                                    code={item.symb}
                                                    price={isToggled ? (item.last * exchangeRate).toFixed(2) : item.last}
                                                    change={item.rate}
                                                    isDollar={!isToggled}
                                                />
                                            </Link>
                                            ))}
                                        </div>
                                        <div className="portfoliBanner" >
                                            <img src={portfoliBanner} alt="banner"/>
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
            <Footer />
        </div>
    )
}