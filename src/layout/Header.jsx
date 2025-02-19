import React from "react";
import "./Header.css";

export default function Header() {
    return (

        <header className="header">
            <div className="logo">
                <img src="/src/assets/images/logo.svg" alt="Logo" className="h-8" />
            </div>

            <div className="icons">
                <img src="/src/assets/images/header/search.svg" alt="Search" className="icon" />
                <img src="/src/assets/images/header/notification.svg" alt="Notification" className="icon" />
                <img src="/src/assets/images/header/menu.svg" alt="Menu" className="icon" />
            </div>

            
        </header>

    )
}