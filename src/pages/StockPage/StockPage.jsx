import React from "react";
import BackNavigation from "../../components/BackNavigation";
import Footer from "../../layout/Footer";
import Tabs from "../../components/Tabs";
import Tab from "../../components/Tab";
import searchBtn from "../../assets/images/stock/searchBtn.svg";
import StockItem from "../../components/StockItem";
import portfoliBanner from "../../assets/images/stock/portfolioBanner.svg"

import "./StockPage.css"
import { Link, Outlet } from "react-router-dom";

export default function StockPage() {

    const stockItems = [
        {
            id: 1,
            name: "SOL 미국 S&P500",
            code: "433330",
            price: "21,000",
            change: "40",
          },
          {
            id: 2,
            name: "SOL 미국 나스닥100",
            code: "433331",
            price: "19,500",
            change: "-10",
          },
          {
            id: 3,
            name: "SOL 미국 S&P500",
            code: "433330",
            price: "21,000",
            change: "40",
          },
          {
            id: 4,
            name: "SOL 미국 나스닥100",
            code: "433331",
            price: "19,500",
            change: "-10",
          },
          {
            id: 5,
            name: "SOL 미국 S&P500",
            code: "433330",
            price: "21,000",
            change: "40",
          },
          {
            id: 6,
            name: "SOL 미국 나스닥100",
            code: "433331",
            price: "19,500",
            change: "-10",
          },

    ]
    
    return (
        <div>
            <BackNavigation text="투자하기" />
            <div>
                <section className="nation-container">
                <Tabs className="stockTab">
                    <Tab label="국내">
                        <div className="search-container">
                            <input type="text" className="searchInput" placeholder="검색어를 입력해 주세요."/>
                            <img src={searchBtn} alt="검색 돋보기 아이콘" className="searchBtn" />
                        </div>
                        <div className="ranking-title">실시간 랭킹</div>
                        <section className="ranking-container">
                            <Tabs>
                                <Tab label="상승">
                                    <div className="ranking-tab">
                                        {stockItems.map((item) => (
                                            <Link 
                                            key={item.id} 
                                            to="/stock/buy"
                                            state={{ code: item.code }}
                                            >
                                                <StockItem
                                                    rank={item.id}
                                                    logo="https://via.placeholder.com/40"
                                                    name={item.name}
                                                    code={item.code}
                                                    price={item.price}
                                                    change={item.change}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="portfoliBanner" >
                                        <img src={portfoliBanner} alt="banner"/>
                                    </div>
                                </Tab>
                                <Tab label="하락">
                                    <div className="ranking-tab">
                                        {stockItems.map((item) => (
                                            <Link 
                                            key={item.id} 
                                            to="/stock/buy"
                                            state={{ code: item.code }}
                                            >
                                                <StockItem
                                                    rank={item.id}
                                                    logo="https://via.placeholder.com/40"
                                                    name={item.name}
                                                    code={item.code}
                                                    price={item.price}
                                                    change={item.change}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="portfoliBanner" >
                                        <img src={portfoliBanner} alt="banner"/>
                                    </div>
                                </Tab>
                                <Tab label="인기">
                                    <div className="ranking-tab">
                                        {stockItems.map((item) => (
                                            <Link 
                                            key={item.id} 
                                            to="/stock/buy"
                                            state={{ code: item.code }}
                                            >
                                                <StockItem
                                                    rank={item.id}
                                                    logo="https://via.placeholder.com/40"
                                                    name={item.name}
                                                    code={item.code}
                                                    price={item.price}
                                                    change={item.change}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="portfoliBanner" >
                                        <img src={portfoliBanner} alt="banner"/>
                                    </div>
                                </Tab>
                                <Tab label="거래량">
                                    <div className="ranking-tab">
                                        {stockItems.map((item) => (
                                            <Link 
                                            key={item.id} 
                                            to="/stock/buy"
                                            state={{ code: item.code }}
                                            >
                                                <StockItem
                                                    rank={item.id}
                                                    logo="https://via.placeholder.com/40"
                                                    name={item.name}
                                                    code={item.code}
                                                    price={item.price}
                                                    change={item.change}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="portfoliBanner" >
                                        <img src={portfoliBanner} alt="banner"/>
                                    </div>
                                </Tab>
                            </Tabs>
                        </section>
                    </Tab>
                    <Tab label="미국">
                    <div className="search-container">
                            <input type="text" className="searchInput" placeholder="검색어를 입력해 주세요."/>
                            <img src={searchBtn} alt="검색 돋보기 아이콘" className="searchBtn" />
                        </div>
                        <div className="ranking-title">실시간 랭킹</div>
                        <section className="ranking-container">
                            <Tabs>
                                <Tab label="상승">
                                    <div className="ranking-tab">
                                        {stockItems.map((item) => (
                                            <Link 
                                            key={item.id} 
                                            to="/stock/buy"
                                            state={{ code: item.code }}
                                            >
                                                <StockItem
                                                    rank={item.id}
                                                    logo="https://via.placeholder.com/40"
                                                    name={item.name}
                                                    code={item.code}
                                                    price={item.price}
                                                    change={item.change}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="portfoliBanner" >
                                        <img src={portfoliBanner} alt="banner"/>
                                    </div>
                                </Tab>
                                <Tab label="하락">
                                    <div className="ranking-tab">
                                        {stockItems.map((item) => (
                                            <Link 
                                            key={item.id} 
                                            to="/stock/buy"
                                            state={{ code: item.code }}
                                            >
                                                <StockItem
                                                    rank={item.id}
                                                    logo="https://via.placeholder.com/40"
                                                    name={item.name}
                                                    code={item.code}
                                                    price={item.price}
                                                    change={item.change}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="portfoliBanner" >
                                        <img src={portfoliBanner} alt="banner"/>
                                    </div>
                                </Tab>
                                <Tab label="인기">
                                    <div className="ranking-tab">
                                        {stockItems.map((item) => (
                                            <Link 
                                            key={item.id} 
                                            to="/stock/buy"
                                            state={{ code: item.code }}
                                            >
                                                <StockItem
                                                    rank={item.id}
                                                    logo="https://via.placeholder.com/40"
                                                    name={item.name}
                                                    code={item.code}
                                                    price={item.price}
                                                    change={item.change}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="portfoliBanner" >
                                        <img src={portfoliBanner} alt="banner"/>
                                    </div>
                                </Tab>
                                <Tab label="거래량">
                                    <div className="ranking-tab">
                                        {stockItems.map((item) => (
                                            <Link 
                                            key={item.id} 
                                            to="/stock/buy"
                                            state={{ code: item.code }}
                                            >
                                                <StockItem
                                                    rank={item.id}
                                                    logo="https://via.placeholder.com/40"
                                                    name={item.name}
                                                    code={item.code}
                                                    price={item.price}
                                                    change={item.change}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="portfoliBanner" >
                                        <img src={portfoliBanner} alt="banner"/>
                                    </div>
                                </Tab>
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