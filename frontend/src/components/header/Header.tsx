import { useLocation, Link } from "react-router-dom";
import ProfileNav from "./profileNav/ProfileNav";

import "./Header.css";
import { AppPath } from "../../common/enums/enums";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36px"
            height="36px"
            version="1.1"
            viewBox="0 0 512 512"
          >
            <g id="Layer_x0020_1">
              <metadata id="CorelCorpID_0Corel-Layer"></metadata>
              <path d="M237 512c-18,0 -36,-1 -53,-2 -77,-6 -124,-26 -144,-61 -13,-22 -15,-49 -7,-81 8,-33 28,-74 59,-120l98 -145c8,-12 13,-22 18,-29 14,-26 21,-35 67,-53 2,-1 4,-1 6,-2 18,-7 42,-15 65,-18 28,-4 49,3 61,21 39,55 15,87 14,88 -1,2 -3,3 -6,3l-98 -5c-24,-2 -39,-2 -46,3 -7,5 -10,16 -16,39 -1,5 -2,11 -3,16 -5,24 -10,52 -19,74 -10,26 -11,53 -10,68 59,-45 117,-24 143,-15 3,1 5,2 7,2 9,2 38,-8 58,-15 18,-6 34,-12 45,-13 2,0 4,0 5,1l0 0 0 0 0 1c2,1 3,3 3,5l0 216c0,1 0,1 0,2 0,4 -3,7 -7,7 -25,0 -58,3 -92,5 -48,4 -99,8 -148,8zm61 -102c-10,0 -19,-1 -26,-3 -24,-7 -38,-20 -39,-20 -3,-3 -3,-7 0,-10 2,-3 7,-3 9,0l0 0c1,0 13,11 34,16 27,8 56,1 85,-18 3,-2 7,-1 9,2 3,3 2,7 -1,9 -27,19 -51,24 -71,24z"></path>
            </g>
          </svg>
          aura diary
        </Link>
        {!isAuthPage && (
          <nav className="header__nav">
            <ul className="nav-header__list">
              <li className="nav-header__item">
              <Link to="/friends">
                <svg
                className="nav-header__item__svg"
                  width="40px"
                  height="40px"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g id="Icon">
                    <path d="M17.75,15c0,-0.414 0.336,-0.75 0.75,-0.75c0.414,0 0.75,0.336 0.75,0.75l-0,7c0,0.414 -0.336,0.75 -0.75,0.75c-0.414,0 -0.75,-0.336 -0.75,-0.75l-0,-7Z"></path>
                    <path d="M15,19.25c-0.414,0 -0.75,-0.336 -0.75,-0.75c-0,-0.414 0.336,-0.75 0.75,-0.75l7,0c0.414,0 0.75,0.336 0.75,0.75c-0,0.414 -0.336,0.75 -0.75,0.75l-7,0Z"></path>
                    <path d="M10.5,1.25c3.036,0 5.5,2.464 5.5,5.5c0,3.036 -2.464,5.5 -5.5,5.5c-3.036,0 -5.5,-2.464 -5.5,-5.5c0,-3.036 2.464,-5.5 5.5,-5.5Zm0,1.5c-2.208,0 -4,1.792 -4,4c0,2.208 1.792,4 4,4c2.208,-0 4,-1.792 4,-4c0,-2.208 -1.792,-4 -4,-4Z"></path>
                    <path d="M2,22.75c-0.241,-0 -0.456,-0.114 -0.594,-0.292c-0.075,-0.09 -0.132,-0.208 -0.15,-0.363c-0.004,-0.03 -0.006,-0.062 -0.006,-0.095c0,-0.004 0,-0.008 0,-0.012l-0,-0.988c-0,-4.28 3.47,-7.75 7.75,-7.75l5.5,0c0.414,-0 0.75,0.336 0.75,0.75c0,0.414 -0.336,0.75 -0.75,0.75l-5.5,-0c-3.452,0 -6.25,2.798 -6.25,6.25l0,0.988c0,0.708 -0.75,0.762 -0.75,0.762Z"></path>
                  </g>
                </svg>
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
