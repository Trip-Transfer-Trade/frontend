import { useState } from "react";
import styles from "./TargetForm.module.css";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import BackNavigation from "../../components/BackNavigation";

export default function TargetForm() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", { dateRange });
  };

  return (
    <div className={styles["container"]}>
      <header className={styles["header"]}>
        <BackNavigation text="목표 금액 설정하기"/>
      </header>

      <form onSubmit={handleSubmit} className={styles["form"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="targetAmount" className={styles["label"]}>
            목표 금액
          </label>
          <input type="text" id="targetAmount" className={styles["input"]} placeholder="목표 금액 입력" />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="targetPeriod" className={styles["label"]}>
            목표 기간
          </label>
          <div className={styles["input-with-icon"]}>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              className={styles["input"]}
              placeholderText="목표 기간 입력"
              locale={ko}
              dateFormat="yyyy.MM.dd"
              isClearable={true}
            />
            <Calendar className={styles["calendar-icon"]} size={24} />
          </div>
        </div>

        <button type="submit" className={styles["submit-button"]}>
          다음
        </button>
      </form>
    </div>
  );
}
