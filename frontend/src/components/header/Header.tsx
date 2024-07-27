import { useLocation, Link } from 'react-router-dom';
import ProfileNav from './profileNav/ProfileNav';
import './Header.css';
import { AppPath } from '../../common/enums/enums';
import logoIcon from '../../assets/images/logo.svg';
import statsIcon from '../../assets/images/stats.svg';
import friendsIcon from '../../assets/images/friends.svg';
import LanguageSelector from '../languageSelector/LanguageSelector';

interface HeaderProps {
  userName: string | undefined;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === AppPath.SIGN_IN ||
    location.pathname === AppPath.SIGN_UP;

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <img className="header__icon" src={logoIcon} alt="logo" />
          aura diary
        </Link>
        {!isAuthPage && (
          <nav className="header__nav">
            <ul className="nav-header__list">
              <li className="nav-header__item">
                <LanguageSelector />
              </li>
              <li className="nav-header__item">
                <Link to="/stats/default">
                  <img
                    className="header__icon"
                    src={statsIcon}
                    alt="stats-icon"
                  />
                </Link>
              </li>
              <li className="nav-header__item">
                <Link to="/friends">
                  <img
                    className="header__icon"
                    src={friendsIcon}
                    alt="friends-icon"
                  />
                </Link>
              </li>
              <ProfileNav userName={userName} />
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
