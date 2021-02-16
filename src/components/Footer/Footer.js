import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <div className="section footer appearAnimationDelay">
      <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
      <ul className="footer__navigation">
        <li className="footer__navigation-item">
          <NavLink exact to="/" className="footer__navigation-link">Главная</NavLink>
        </li>
        <li className="footer__navigation-item">
          <a href="https://praktikum.yandex.ru/job/?utm_source=yandex&utm_medium=serp&utm_campaign=first" className="footer__navigation-link" target="blank">Яндекс.Практикум</a>
        </li>
        <li className="footer__navigation-item">
          <a href="https://github.com/SergeyMMedvedev" className="footer__navigation-link" target="blank">
            <div className="footer__github" />
          </a>
        </li>
        <li className="footer__navigation-item">
          <a href="https://www.facebook.com/profile.php?id=100004792398978" className="footer__navigation-link" target="blank">
            <div className="footer__facebook" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
