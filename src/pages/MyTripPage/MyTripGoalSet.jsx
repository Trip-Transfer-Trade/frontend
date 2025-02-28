import "bootstrap/dist/css/bootstrap.min.css"
import { ChevronLeft } from "lucide-react"

export default function GoalConfirmation() {
  return (
    <div className="container-fluid p-0 min-vh-100 bg-white">
      {/* Header */}
      <div className="p-3">
        <button className="btn btn-link text-dark p-0">
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 text-center">
        <h1 className="mb-3 fw-bold" style={{ fontSize: "24px" }}>
          목표를 설정했어요! 🎉
        </h1>

        <h2 className="mb-5 fw-bold" style={{ fontSize: "20px" }}>
          목표 도달을 위한 투자를 떠나볼까요?
        </h2>

        {/* Cat Image */}
        <div className="my-5">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-02-24%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.46.02-kMQKsONgeYfeHA496risUeHRNHzfQY.png"
            alt="Cute cat character"
            style={{ width: "200px", height: "auto" }}
          />
        </div>

        {/* Goal Details */}
        <div className="my-4">
          <span className="text-primary fw-bold">미국</span>
          <span className="text-dark">으로 떠나기 위해</span>
        </div>

        <div className="my-4">
          <span className="fw-bold" style={{ fontSize: "18px" }}>
            2025년 6월 1일
          </span>
          <span className="mx-2">까지</span>
          <br />
          <span className="fw-bold" style={{ fontSize: "18px" }}>
            1,000,000원
          </span>
          <span className="ms-2">모아 보아요!</span>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="position-fixed bottom-0 start-0 w-100 p-4">
        <button className="btn btn-primary w-100 py-3 rounded-3" style={{ backgroundColor: "#4169E1" }}>
          목표 확정
        </button>
      </div>
    </div>
  )
}

