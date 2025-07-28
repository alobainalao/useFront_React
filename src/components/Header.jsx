import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal'; // si ya existe
import { userContext } from '../context/userContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Header.css';

export default function Header() {
    const { t } = useTranslation();
    const {user, setShowLogin, setShowRegister, handleLogOut} = useContext(userContext); // Asumiendo que usas este contexto

    return (
        <header>
            <nav>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* SVG libro abierto */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="logo-svg"
                        fill="#800020"
                        width="40"
                        height="40"
                    >
                        <path d="M4 12v40c10 0 18 4 28 8 10-4 18-8 28-8V12c-10 0-18 4-28 8C22 16 14 12 4 12z" />
                        <path d="M32 20v40" stroke="#800020" strokeWidth="2" />
                    </svg>

                    <div className="logo-text" style={{ display: 'flex', flexDirection: 'column' }}>
                        <h3>{t('library.name')}</h3>
                        <small>{t('library.tagline')}</small>
                    </div>
                </div>
            </nav>
            
            <div className="auth-buttons">
                
                {user? (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <AccountCircleIcon style={{ fontSize: '1.5rem', color: 'white' }} />
                        <button onClick={() => handleLogOut(null, null)} className="auth-btn" style={{marginLeft: '0'}}>
                            {t('nav.logout')}
                        </button>
                    </div>
                ) : (
                    <>
                        <button onClick={() => setShowLogin(true)} className="auth-btn">
                            {t('nav.login')}
                        </button>
                        <button onClick={() => setShowRegister(true)} className="auth-btn">
                            {t('nav.register')}
                        </button>
                    </>
                )}
                <LanguageSwitcher />
            </div>
 
            <LoginModal />
            <RegisterModal />
        </header>
    );
}

