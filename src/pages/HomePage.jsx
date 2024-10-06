import React from 'react';
import '../styles/HomePage.scss';

const HomePage = () => {
    return (
        <div className="home-page">
            <section className="home-hero">
                <div className="home-content">
                    <h1 className="home-title">Запускайте и развивайте свой бизнес с помощью ИИ</h1>
                    <p className="home-subtitle">
                        Создавайте изображения товаров, не тратя время на фотосессии!
                    </p>
                    <button className="generate-button">Создайте любое изображение</button>
                    <p className="home-note">Оплата не требуется</p>
                </div>
                <div className="home-images">
                    <div className="image-card image-card1"></div>
                    <div className="image-card image-card2"></div>
                    <div className="image-card image-card3"></div>
                </div>
            </section>
            <footer className="home-footer">
                <p>1K+ изображений сгенерировано</p>
                <span className="wordpress-logo">ООО "Циклоп"</span>
            </footer>
        </div>
    );
};

export default HomePage;
