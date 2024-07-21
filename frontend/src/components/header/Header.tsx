import { useLocation, Link } from "react-router-dom";
import ProfileNav from "./profileNav/ProfileNav";

import "./Header.css";
import { AppPath } from "../../common/enums/enums";

interface HeaderProps{
  userName: string | undefined
}

const Header: React.FC<HeaderProps> = ({userName}) => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === AppPath.SIGN_IN ||
    location.pathname === AppPath.SIGN_UP;

  return (
    <header className="header">
      <div className="header__inner">
        <Link data-test-id="header-logo" to="/" className="header__logo">
          Aura Diary
        </Link>
        {!isAuthPage && (
          <nav data-test-id="header-nav" className="header__nav">
            <ul className="nav-header__list">
              <ProfileNav userName={userName}/>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
