import React from "react"


export default function LoginModal({ isOpen, onClose }) {
    if(!isOpen) return null;

    return (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl w-96 p-6 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:bg-gray-100 p-1 rounded-full">
          &#x2715;
        </button>

        {/* Logo */}
        <div className="h-16 w-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-3xl font-bold">T</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center">TTT 서비스 이용을 위해서는</h2>
        <h2 className="text-xl font-bold text-center mb-4">로그인이 필요해요.</h2>

        {/* Description */}
        <p className="text-sm text-center text-gray-500 mb-6">
          로그인 후 투자부터 환전까지 한번에 가능한
          <br />
          TTT 서비스를 이용해보세요.
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-brand-blue text-white py-3 rounded-lg font-bold hover:bg-blue-600">
            로그인 하기
          </button>
          <button className="w-full text-gray-500 py-3 rounded-lg border border-gray-300 hover:bg-gray-100">
            회원가입 하기
          </button>
        </div>
      </div>
    </div>
    )
}