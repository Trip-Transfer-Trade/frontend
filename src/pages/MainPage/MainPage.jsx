import styles from "./MainPage.module.css";
import { useState, Fragment } from "react";

export default function MainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const banners = [
    { text: "주식으로 떠나는 여행\n투자부터 환전까지 한 번에!", img: "/src/assets/images/main/airplane.svg" },
    { text: "목표 금액을 설정하면, 자동 매도와 환전이 손쉽게!", img: "/src/assets/images/main/chart.svg" },
  ];
  const totalPages = banners.length;

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      setCurrentPage((prev) => (prev === totalPages ? 1 : prev + 1));
    } else if (touchStartX - touchEndX < -50) {
      setCurrentPage((prev) => (prev === 1 ? totalPages : prev - 1));
    }
  };

  const currentBanner = banners[currentPage - 1];

  return (
    <div className={styles["container"]}>
      <div
        className={styles["banner"]}
        onTouchStart={handleTouchStart}
        onTouchEnd={(e) => {
          touchEndX = e.changedTouches[0].clientX;
          handleTouchEnd();
        }}
      >
        <div className={styles["banner-content"]}>
          <p className={styles["banner-text"]}>
            {currentBanner.text.split("\n").map((line, index) => (
              <Fragment key={index}>
                {line}
                {index === 0 && <br />}
              </Fragment>
            ))}
          </p>
          <img src={currentBanner.img || "/placeholder.svg"} alt="Banner" className={styles["banner-image"]} />
          <span className={styles["banner-page"]}>
            {currentPage}/{totalPages}
          </span>
        </div>
      </div>

      <h2 className={styles.title}>이하늘님을 위한 추천 서비스</h2>

      <div className={styles["service-grid"]}>
        <div className={styles["service-card"]}>
          <div className={styles["icon-wrapper"]}>
            <img src="/src/assets/images/main/wallet.svg" alt="환전지갑" className={styles["service-icon"]} />
          </div>
          <h5 className={styles["service-title"]}>환전 지갑</h5>
        </div>

        <div className={styles["service-card"]}>
          <div className={styles["icon-wrapper"]}>
            <img src="/src/assets/images/main/portfolio.svg" alt="포트폴리오" className={styles["service-icon"]} />
          </div>
          <h5 className={styles["service-title"]}>포트폴리오</h5>
        </div>

        <div className={styles["service-card"]}>
          <div className={styles["icon-wrapper"]}>
            <img src="/src/assets/images/main/trip.svg" alt="여행지" className={styles["service-icon"]} />
          </div>
          <h5 className={styles["service-title"]}>여행지 추천</h5>
        </div>
      </div>
    </div>
  );
}
