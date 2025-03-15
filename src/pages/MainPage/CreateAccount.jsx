import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Check } from 'lucide-react';
import styles from './CreateAccount.module.css';
import { createAccount } from '../../apis/accounts';
import { fetchSetAmount } from '../../apis/exchanges';


const CreateAccount = () => {

  const navigate = useNavigate();
  const [agreements, setAgreements] = useState({
    terms1: false,
    terms2: false,
    terms3: false
  });

  const agreementTexts = {
    terms1: {
      title: "전자금융거래 이용약관",
      content: "본 약관은 투자자와 회사 간의 전자금융거래에 관한 기본적인 사항을 정함으로써 전자금융거래의 안정성과 신뢰성을 확보하고 거래당사자의 권리·의무관계를 명확히 하는 것을 목적으로 합니다."
    },
    terms2: {
      title: "개인정보 수집 및 이용 동의",
      content: "회사는 계좌개설 및 금융투자상품 거래를 위하여 필요한 최소한의 개인정보를 수집·이용하며, 수집된 개인정보는 해당 서비스 제공 및 법령상 의무이행 목적으로만 이용됩니다."
    },
    terms3: {
      title: "주식거래 위험고지 동의",
      content: "주식거래는 원금손실의 위험이 있으며, 과거의 수익률이 미래의 수익률을 보장하지 않습니다. 투자자는 투자원금의 손실 가능성을 충분히 인지하고 있어야 합니다."
    }
  };

  const toggleAgreement = (key) => {
    setAgreements(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isAllAgreed = Object.values(agreements).every(value => value);

  const handleCreateAccount = async () => {
    try{
        const accountNumber = await createAccount("NORMAL"); // API 호출
        await fetchSetAmount(accountNumber); // 노멀 계좌생성 후 잔액 설정
        navigate(`/accountComplete?accountNumber=${accountNumber}`); // 계좌번호를 URL 파라미터로 전달
    }catch(error){
        console.error("계좌 생성 실패:", error);

    }
  }

  return (
    <div className={styles.agreementContainer}>

      <main className={styles.agreementContent}>
        <h1 className={styles.agreementTitle}>계좌 개설 동의</h1>

        {Object.entries(agreementTexts).map(([key, { title, content }]) => (
          <div 
            key={key} 
            className={styles.agreementItem}
            onClick={() => toggleAgreement(key)}
          >
            <div className={styles.agreementItemHeader}>
              <h2 className={styles.agreementItemTitle}>{title}</h2>
              <div className={`${styles.checkbox} ${agreements[key] ? styles.checked : ''}`}>
                <Check size={16} />
              </div>
            </div>
            <p className={styles.agreementItemContent}>{content}</p>
          </div>
        ))}

        <button 
          className={`${styles.agreeButton} ${isAllAgreed ? styles.active : ''}`}
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
