import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { createAccount } from "../../apis/accounts";
import { fetchSetAmount } from "../../apis/exchanges";

import BackNavigation from "../../components/BackNavigation";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState({
    terms1: false,
    terms2: false,
    terms3: false,
  });

  const agreementTexts = {
    terms1: {
      title: "전자금융거래 이용약관",
      content:
        "본 약관은 투자자와 회사 간의 전자금융거래에 관한 기본적인 사항을 정함으로써 전자금융거래의 안정성과 신뢰성을 확보하고 거래당사자의 권리·의무관계를 명확히 하는 것을 목적으로 합니다.",
    },
    terms2: {
      title: "개인정보 수집 및 이용 동의",
      content:
        "회사는 계좌개설 및 금융투자상품 거래를 위하여 필요한 최소한의 개인정보를 수집·이용하며, 수집된 개인정보는 해당 서비스 제공 및 법령상 의무이행 목적으로만 이용됩니다.",
    },
    terms3: {
      title: "주식거래 위험고지 동의",
      content:
        "주식거래는 원금손실의 위험이 있으며, 과거의 수익률이 미래의 수익률을 보장하지 않습니다. 투자자는 투자원금의 손실 가능성을 충분히 인지하고 있어야 합니다.",
    },
  };

  const toggleAgreement = (key) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isAllAgreed = Object.values(agreements).every((value) => value);

  const handleCreateAccount = async () => {
    try {
      const accountNumber = await createAccount("NORMAL");
      await fetchSetAmount(accountNumber);
      navigate(`/accountComplete?accountNumber=${accountNumber}`);
    } catch (error) {
      console.error("계좌 생성 실패:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white font-sans px-6">
      <main>
        <h1 className="text-xl font-semibold mb-8">계좌 개설 동의</h1>

        {Object.entries(agreementTexts).map(([key, { title, content }]) => (
          <div
            key={key}
            className="bg-gray-100 rounded-lg p-5 mb-4 cursor-pointer"
            onClick={() => toggleAgreement(key)}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">{title}</h2>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  agreements[key]
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "border-gray-300"
                }`}
              >
                <Check size={16} />
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
          </div>
        ))}

        <button
          className={`w-full py-4 rounded-lg font-semibold mt-8 transition-all ${
            isAllAgreed
              ? "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
              : "bg-gray-300 text-white cursor-not-allowed"
          }`}
          disabled={!isAllAgreed}
          onClick={handleCreateAccount}
        >
          동의하기
        </button>
      </main>
    </div>
  );
};

export default CreateAccount;
