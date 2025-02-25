import "./Header.css";

export default function Header() {
  return (
    <header className="header flex w-full items-center justify-between">
      {/* 로고 */}
      <div>
        <img src="/src/assets/images/logo.svg" alt="Logo" className="logo" />
      </div>

      {/* 아이콘 */}
      <div className="flex items-center space-x-4">
        <img
          src="/src/assets/images/header/search.svg"
          alt="Search"
          className="icon"
        />
        <img
          src="/src/assets/images/header/notification.svg"
          alt="Notification"
          className="icon"
        />
        <img
          src="/src/assets/images/header/menu.svg"
          alt="Menu"
          className="icon"
        />
      </div>
    </header>
  );
}
