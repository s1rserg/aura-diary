import "./ProfileNav.css";

import userIcon from '../../../assets/images/user.svg';
import { useSignOut } from "../../../hooks/hooks";


interface ProfileNavProps{
  userName: string | undefined
}

const ProfileNav: React.FC<ProfileNavProps> = ({userName}) => {
  const handleSignOut = useSignOut();

  return (
    <li className="nav-header__item" title="Profile">
      <div
        data-test-id="header-profile-nav"
        className="nav-header__inner profile-nav"
        tabIndex={0}
      >
        <span className="visually-hidden">Profile</span>
        <img src={userIcon} alt="profile" />
        <ul
          data-test-id="header-profile-nav-list"
          className="profile-nav__list"
        >
          <li
            data-test-id="header-profile-nav-username"
            className="profile-nav__item"
          >
            {userName}
          </li>
          <li className="profile-nav__item">
            <a
              data-test-id="header-profile-nav-sign-out"
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
