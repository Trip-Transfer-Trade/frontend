import NextConfirmButton from "../../components/NextConfirmButton";

// import complete from "../../assets/images/complete.svg";

export default function SignupCompletePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="p-6">
          <img src="/assets/images/complete.svg" alt="complete" />
        </div>
        <h2 className="text-xl font-bold">회원가입 완료</h2>
      </div>
      <div className="w-full max-w-sm p-6">
        <NextConfirmButton text="시작하기" />
      </div>
    </div>
  );
}
