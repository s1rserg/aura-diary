import "./Footer.css";

import heartIcon from '../../assets/images/heart.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer__text">
        from
        sirserg
        with
        <img className="footer__icon" src={heartIcon} alt="heart" />
      </span>
    </footer>
  );
};

export default Footer;
