import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import { getAccountStatus } from "../../apis/accounts";
import StockToggle from "../../components/StockToggle";
import StockItem from "../../components/StockItem";
import apiClient from "../../apis/apiClient";
import Tabs from "../../components/Tabs";
import Tab from "../../components/Tab";
import StockLogo from "../../components/StockLogo";
import StockLogoUs from "../../components/StockLogoUs";
import StockLogoRandom from "../../components/StockLogoRandom";

export default function MainPage() {
  const navigate = useNavigate();
  const [accountStatus, setAccountStatus] = useState(null);

  const [selected, setSelected] = useState("국내");
  const [stockItems, setStockItems] = useState({ list: [] });
  const [type, setType] = useState("popular");
  const [count, setCount] = useState(0);

  // 🔹 계좌 상태 확인
  useEffect(() => {
    async function checkAccountStatus() {
      try {
        const status = await getAccountStatus();
        console.log("Account Status:", status);
        setAccountStatus(status);
      } catch (error) {
        console.error("계좌 상태 조회 실패:", error);
        setAccountStatus("NOT_LOGGED_IN");
      }
    }
    checkAccountStatus();
  }, []);

  useEffect(() => {
    apiClient
      .get("/accounts/count")
      .then((response) => {
        setCount(response.data);
        console.log("진행 중 목표 : " + count);
      })
      .catch((err) => {
        console.error("목표 count 가져오기 실패", err);
      });
  }, [count]);

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
    if (selected === "해외") {
      apiClient
        .get("/exchanges/rate/us")
        .then((response) => {
          const rate = parseFloat(response.data.rate.replace(/,/g, ""));
        })
        .catch((err) => {
          console.error("환율 가져오기 실패", err);
        });
    }
    setType("인기");
  }, [selected]);

  useEffect(() => {
    const fetchStockData = () => {
      apiClient.get(selected === "국내" ? "/exchanges/ranking" : "/exchanges/us/ranking", {
        params: { type: convertType(type) }
      })
        .then((response) => {
          console.log("API 응답 데이터:", response.data);
          const stockData = selected === "국내" ? response.data.data.output : response.data.output2;
          setStockItems({ list: Array.isArray(stockData) ? stockData : [] });
        })
        .catch((err) => {
          console.log("주식 데이터 조회 실패", err);
        });
    }
    fetchStockData();

    const interval = setInterval(fetchStockData, 5000);

    return () => clearInterval(interval);
  }, [selected, type]);

  const renderBanner = () => {
    if (accountStatus === null) {
      return <div className={styles.banner}>로딩 중...</div>;
    }

    switch (accountStatus) {
      case "NOT_LOGGED_IN":
        return (
          <div
            className={styles.banner}
            onClick={() => navigate("/auth/login")}
          >
            <div className={styles.header}>
              <h1 className={styles.title}>목표를 설정하고</h1>
              <h1 className={styles.title}>투자부터 환전까지 한번에 해요!</h1>
            </div>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>나의 목표 보기</h2>
              <div className={styles.cardContent}>
                <div className={styles.cardText2}>
                  <p className={styles.instruction}>
                    로그인하고
                    <br />
                    나의 목표를 만들어 보세요!
                  </p>
                </div>
                <div className={styles.LogincardImage}>
                  <img src="/assets/images/main/loginBefore.svg" alt="로그인" />
                </div>
              </div>
            </div>
          </div>
        );
      case "LOGGED_IN_NO_ACCOUNT":
        return (
          <div
            className={styles.banner}
            onClick={() => navigate("/createAccount")}
          >
            <div className={styles.header}>
              <h1 className={styles.title}>목표를 설정하고</h1>
              <h1 className={styles.title}>투자부터 환전까지 한번에 해요!</h1>
            </div>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>나의 목표 보기</h2>
              <div className={styles.cardContent}>
                <div className={styles.cardText2}>
                  <p className={styles.accountQuestion}>TTT가 처음이신가요?</p>
                  <p className={styles.accountInstruction}>
                    먼저 새로운 계좌를 개설해주세요.
                  </p>
                </div>
                <div className={styles.cardImage}>
                  <img src="/assets/images/main/tripGoal.svg" alt="환전지갑" />
                </div>
              </div>
            </div>
          </div>
        );
      case "LOGGED_IN_WITH_ACCOUNT":
        if (count === 0) {
          return (
            <div
              className={styles.banner}
              onClick={() => navigate("/trip/tripgoal")}
            >
              <div className={styles.header}>
                <h1 className={styles.title}>목표를 설정하고</h1>
                <h1 className={styles.title}>투자부터 환전까지 한번에 해요!</h1>
              </div>
              <div className={styles.card}>
                <h2 className={styles.lastcardTitle}>내 목표 생성하기</h2>
                <p className={styles.description}>
                  새로운 목표를 생성해보세요.
                </p>
                <div className={styles.cardContent}>
                  <div className={styles.cardText}>
                    <p className={styles.countGoal}> 도전 중 목표&nbsp; </p>
                    <p className={styles.countGoalCount}> {count} </p>
                    <p className={styles.countGoal}>개 </p>
                  </div>
                  <div className={styles.cardImage}>
                    <img src="/assets/images/main/Dart.svg" alt="목표 확인" />
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className={styles.banner} onClick={() => navigate("/trip")}>
              <div className={styles.header}>
                <h1 className={styles.title}>목표를 설정하고</h1>
                <h1 className={styles.title}>투자부터 환전까지 한번에 해요!</h1>
              </div>
              <div className={styles.card}>
                <h2 className={styles.lastcardTitle}>나의 목표 보기</h2>
                <p className={styles.description}>
                  목표 달성을 위해 투자하러 가기
                </p>
                <div className={styles.cardContent}>
                  <div className={styles.cardText}>
                    <p className={styles.countGoal}> 도전 중 목표&nbsp; </p>
                    <p className={styles.countGoalCount}> {count} </p>
                    <p className={styles.countGoal}>개 </p>
                  </div>
                  <div className={styles.cardImage}>
                    <img src="/assets/images/main/Dart.svg" alt="목표 확인" />
                  </div>
                </div>
              </div>
            </div>
          );
        }

      default:
        return <div className={styles.banner}>잘못된 상태입니다.</div>;
    }
  };

  return (
    <div className={styles.container}>
      {renderBanner()}

      <div className={styles.serviceGrid}>
        <div
          className={styles.serviceCard}
          onClick={() => navigate("/exchange")}
        >
          <div className={styles.iconWrapper}>
            <img
              src="/assets/images/main/wallet.svg"
              alt="환전지갑"
              className={styles.serviceIcon}
            />
          </div>
          <h5 className={styles.serviceTitle}>환전 지갑</h5>
        </div>

        <div className={styles.serviceCard} onClick={() => navigate("/top")}>
          <div className={styles.iconWrapper}>
            <img
              src="/assets/images/portfolio/trp.svg"
              alt="수익률 랭킹"
              className={styles.serviceIcon}
              style={{ width: "30px", height: "auto" }}
            />
          </div>
          <h5 className={styles.serviceTitle}>수익률 랭킹</h5>
        </div>

        <div
          className={styles.serviceCard}
          onClick={() => navigate("/destination")}
        >
          <div className={styles.iconWrapper}>
            <img
              src="/assets/images/main/trip.svg"
              alt="여행지"
              className={styles.serviceIcon}
            />
          </div>
          <h5 className={styles.serviceTitle}>여행지 추천</h5>
        </div>
      </div>

      <div>
        <div className="pt-6">
          <StockToggle selected={selected} setSelected={setSelected} />
        </div>
        <div className="pb-5">
          <section className="px-3">
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
                    setType(label);
                    console.log("API 응답 데이터:", response.data);
                  }}
                >
                  <div className="ranking-tab">
                    {stockItems.list.slice(0, 10).map((item, index) => (
                      <StockItem
                        key={item.rank || index}
                        rank={item.rank || index + 1}
                        logo={
                          selected === "국내"
                            ? getStockLogo(item.ticker, true)
                            : getStockLogo(item.symb, false)
                        }
                        name={
                          selected === "국내"
                            ? item.hts_kor_isnm
                            : item.knam
                            ? item.knam.toLocaleString()
                            : "undefined"
                        }
                        code={selected === "국내" ? item.ticker : item.symb}
                        price={
                          selected === "국내"
                            ? item.stck_prpr
                            : Number(item.last).toFixed(2)
                        }
                        change={
                          selected === "국내" ? item.prdy_ctrt : item.rate
                        }
                        isDollar={selected === "국내" ? false : true}
                      />
                    ))}
                  </div>
                </Tab>
              ))}
            </Tabs>
          </section>
        </div>
      </div>
    </div>
  );
}
