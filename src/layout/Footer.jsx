import React from "react";
import "./Footer.css"

export default function Footer() {
    return (
        
        <footer className="footer">
            <div className="menu-icons">
                <div className="menu-item">
                    <img src="/src/assets/images/footer/home.svg" alt="Home" className="icon" />
                </div>
                <div className="menu-item">
                    <img src="/src/assets/images/footer/mytrip.svg" alt="Mytrip" className="icon" />
                </div>
                <div className="menu-item">
                    <img src="/src/assets/images/footer/wallet.svg" alt="Wallet" className="icon" />
                </div>
                <div className="menu-item">
                    <img src="/src/assets/images/footer/mypage.svg" alt="MyPage" className="icon" />
                </div>
            </div>

        </footer>
    )
}