import styles from "./MainPage.module.css";
import { Fragment } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function MainPage() {
  const banners = [
    {
      text: "주식으로 떠나는 여행\n투자부터 환전까지 한 번에!",
      img: "/assets/images/main/airplane.svg",
    },
    {
      text: "목표 금액을 설정하면, 자동 매도와 환전이 손쉽게!",
      img: "/assets/images/main/chart.svg",
    },
  ];

  return (
    <div className={styles["container"]}>
      <Swiper
        pagination={{ clickable: true }}
        spaceBetween={16}
        className={styles["banner-swiper"]}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className={styles["banner"]}>
              <div className={styles["banner-content"]}>
                <p className={styles["banner-text"]}>
                  {banner.text.split("\n").map((line, idx) => (
                    <Fragment key={idx}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
                </p>
                <img
                  src={banner.img || "/placeholder.svg"}
                  alt="Banner"
                  className={styles["banner-image"]}
                />
                <span className={styles["banner-page"]}>
                  {index + 1}/{banners.length}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <h2 className={styles.title}>이하늘님을 위한 추천 서비스</h2>

      <div className={styles["service-grid"]}>
        <div className={styles["service-card"]}>
          <div className={styles["icon-wrapper"]}>
            <img
              src="/assets/images/main/wallet.svg"
              alt="환전지갑"
              className={styles["service-icon"]}
            />
          </div>
          <h5 className={styles["service-title"]}>환전 지갑</h5>
        </div>

        <div className={styles["service-card"]}>
          <div className={styles["icon-wrapper"]}>
            <img
              src="/assets/images/main/portfolio.svg"
              alt="포트폴리오"
              className={styles["service-icon"]}
            />
          </div>
          <h5 className={styles["service-title"]}>포트폴리오</h5>
        </div>

        <div className={styles["service-card"]}>
          <div className={styles["icon-wrapper"]}>
            <img
              src="/assets/images/main/trip.svg"
              alt="여행지"
              className={styles["service-icon"]}
            />
          </div>
          <h5 className={styles["service-title"]}>여행지 추천</h5>
        </div>
      </div>
    </div>
  );
}
