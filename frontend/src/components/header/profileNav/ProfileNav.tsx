import "./ProfileNav.css";

import { useSignOut } from "../../../hooks/hooks";

interface ProfileNavProps {
  userName: string | undefined;
}

const ProfileNav: React.FC<ProfileNavProps> = ({ userName }) => {
  const handleSignOut = useSignOut();

  return (
    <li className="nav-header__item" title="Profile">
      <div
        className="nav-header__inner profile-nav"
        tabIndex={0}
      >
        <span className="visually-hidden">Profile</span>
        <svg width="40px" height="40px" viewBox="0 0 32 32">
          <title></title>
          <g id="about">
            <path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z"></path>
            <path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z"></path>
          </g>
        </svg>
        <ul
          className="profile-nav__list"
        >
          <li
            className="profile-nav__item"
          >
            {userName}
          </li>
          <li className="profile-nav__item">
            <a
              href="/sign-in"
              className="profile-nav__sign-out button"
              onClick={handleSignOut}
            >
              Sign Out
            </a>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default ProfileNav;
