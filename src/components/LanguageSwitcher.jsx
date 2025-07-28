import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css'; // Importa sin "styles"

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const isActive = (lang) => i18n.language === lang;

    return (
        <div className="language-switcher">
            <img
                src="/en.png"
                alt="English"
                onClick={() => changeLanguage('en')}
                className={`language-flag ${isActive('en') ? 'language-active' : ''}`}
            />
            <img
                src="/es.png"
                alt="Español"
                onClick={() => changeLanguage('es')}
                className={`language-flag ${isActive('es') ? 'language-active' : ''}`}
            />
        </div>
    );
}
