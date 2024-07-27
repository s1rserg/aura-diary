import './Footer.css';
import heartIcon from '../../assets/images/heart.svg';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <span className="footer__text">
        {t('footer text')}
        <img className="footer__icon" src={heartIcon} alt="heart" />
      </span>
    </footer>
  );
};

export default Footer;
