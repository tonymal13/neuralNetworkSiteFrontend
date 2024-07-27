import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'
import logo from '../assets/icon_bg.png'

const Navbar = (props) => {
    return (
        <div>
            <div className="navbar_container">
                <div className="navbar_logo">
                    <img className="navbar_logo_image" src={logo}/>
                </div>
                <div className="navbar_items">
                    <div className="navbar_item">
                        <Link className="navbar_link" to="/home" >Главная</Link>
                    </div>
                    <div className="navbar_item">
                        <Link className="navbar_link" to="/login">Войдите в аккаунт</Link>
                    </div>
                    <div className="navbar_item">
                        <Link className="navbar_link" to="/neuralNetworkPage">Наши нейросети</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;