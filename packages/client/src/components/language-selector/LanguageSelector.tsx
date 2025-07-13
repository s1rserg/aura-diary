import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.css';
import globeIcon from '../../assets/images/globe.svg';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="language-selector">
      <img
        className="header__icon language-selector__icon"
        src={globeIcon}
        alt="language selector"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="language-selector__dropdown">
          <button
            className="button language-selector__button language-selector__button-1"
            onClick={() => changeLanguage('en-US')}
          >
            EN
          </button>
          <button
            className="button language-selector__button language-selector__button-2"
            onClick={() => changeLanguage('ua')}
          >
            UA
          </button>
          <button
            className="button language-selector__button language-selector__button-3"
            onClick={() => changeLanguage('he')}
          >
            HE
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
