import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer flex w-full items-center justify-between">
      <div className="mt-2">
        <img src="/src/assets/images/footer/home.svg" alt="Home" />
      </div>
      <div className="mt-2">
        <img src="/src/assets/images/footer/mytrip.svg" alt="Mytrip" />
      </div>
      <div className="mt-2">
        <img src="/src/assets/images/footer/wallet.svg" alt="Wallet" />
      </div>
      <div className="mt-2">
        <img src="/src/assets/images/footer/mypage.svg" alt="MyPage" />
      </div>
    </footer>
  );
}
