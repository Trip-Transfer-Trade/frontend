import { useSearchParams } from "react-router-dom"
import styles from "./AccountComplete.module.css"

const AccountComplete = () => {
    const [searchParams] = useSearchParams(); //URL에서 파라미터 가져오기
    const accountNumber = searchParams.get("accountNumber"); // 계좌번호 가져오기

    const formatAccountNumber = (number) => {
        if (!number) return "계좌번호 없음";
        return number.replace(/(\d{3})(\d{3})(\d{6})/, "$1-$2-$3"); // "XXX-XXX-XXXXXX" 형식
    };

    return (
        <div className={styles.container}>
        <button className={styles.closeButton}>
            
        </button>

        <div className={styles.content}>
            <div className={styles.checkmark}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#4F46E5" />
                <path
                d="M12 20L17.5 25.5L28 15"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
            </div>

            <h1 className={styles.title}>계좌 개설 완료</h1>

            <div className={styles.illustration}>
                <img
                src="/assets/images/main/accountComplete.svg"
                alt="환전지갑"
                />
            </div>

            <div className={styles.accountInfo}>
            <div className={styles.accountRow}>
                <span className={styles.accountLabel}>종합 계좌</span>
                <span className={styles.accountNumber}>{formatAccountNumber(accountNumber)}</span>
            </div>
            </div>
        </div>
        </div>
    )
}

export default AccountComplete

