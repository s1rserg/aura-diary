import "./ProfileNav.css";
import { useSignOut } from "../../../hooks/hooks";
import userIcon from "../../../assets/images/user.svg";
import { useTranslation } from "react-i18next";

interface ProfileNavProps {
  userName: string | undefined;
}

const ProfileNav: React.FC<ProfileNavProps> = ({ userName }) => {
  const { t } = useTranslation();

  const handleSignOut = useSignOut();

  return (
    <li className="nav-header__item" title="Profile">
      <div className="nav-header__inner profile-nav" tabIndex={0}>
        <span className="visually-hidden">Profile</span>
        <img className="header__icon" src={userIcon} alt="user-icon" />
        <ul className="profile-nav__list">
          <li className="profile-nav__item">{userName}</li>
          <li className="profile-nav__item">
            <a
              href="/sign-in"
              className="profile-nav__sign-out button"
              onClick={handleSignOut}
            >
              {t("sign out")}
            </a>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default ProfileNav;
