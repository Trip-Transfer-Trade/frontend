import { useState } from "react"
import { ChevronLeft, Plus, Home, Globe, DollarSign, User } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-coverflow"
import { EffectCoverflow } from "swiper/modules"
import BackNavigation from "../../components/BackNavigation"
import Footer from "../../layout/Footer"

const TripListPage = () => {
  const [goals] = useState([
    {
      id: 1,
      country: "미국",
      flag: "🇺🇸",
      title: "미국 여행 가기",
      amount: "1,000,000원",
      daysLeft: 51,
      bgColor: "bg-white",
      textColor: "text-black",
    },
    {
      id: 2,
      country: "일본",
      flag: "🇯🇵",
      title: "일본 여행 가기",
      amount: "1,000,000원",
      daysLeft: 51,
      bgColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      id: 3,
      country: "프랑스",
      flag: "🇫🇷",
      title: "프랑스 여행 가기",
      amount: "2,000,000원",
      daysLeft: 120,
      bgColor: "bg-white",
      textColor: "text-black",
    },
  ])

  return (
    <div className="flex flex-col h-screen">
    <BackNavigation/>
      {/* Main Content */}
      <div className="flex-1 px-4 pb-20">
        <h1 className="text-xl font-medium mb-6 mt-2">내가 가고싶은 여행지는?</h1>

        {/* Swiper Carousel */}
        <div className="mt-4">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow]}
            className="mySwiper"
          >
            {goals.map((goal) => (
              <SwiperSlide key={goal.id} className="w-[280px] h-[280px]">
                <div className={`${goal.bgColor} ${goal.textColor} rounded-3xl shadow-lg p-5 h-full flex flex-col`}>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-2">{goal.flag}</span>
                    <span className="text-lg font-medium">{goal.title}</span>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <img src="/placeholder.svg?height=100&width=150" alt="Airplane" className="w-32 h-auto" />
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    <div>
                      <div className="text-sm opacity-80">목표 금액</div>
                      <div className="text-xl font-bold">{goal.amount}</div>
                    </div>
                    <div className="text-lg font-medium">D-{goal.daysLeft}</div>
                  </div>

                  <button
                    className={`mt-4 text-sm py-2 w-full text-center rounded-full ${goal.bgColor === "bg-white" ? "text-black" : "text-white"}`}
                  >
                    수익 확인하러 가기
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Add Goal Button */}
        <div className="mt-8 px-4">
          <button className="w-full py-4 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center">
            <Plus size={20} className="mr-2" />
            <span>목표 등록</span>
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default TripListPage

