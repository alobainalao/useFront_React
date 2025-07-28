import { useTranslation } from 'react-i18next';
import './Home.css';
import React from 'react';

export default function Home() {
    const { t } = useTranslation();

    return (
        <div className="landing-page">
            <div className="content">
                <div className="landing_content">
                    <h1>{t('welcome')}</h1>
                </div>
            </div>

        </div>
    );
}



