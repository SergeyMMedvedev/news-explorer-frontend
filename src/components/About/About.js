import React from 'react';
import './About.css';
import '../appearAnimation/appearAnimation.css';
import myImage from '../../images/DSC01449.jpg';

function About() {
  return (
    <section className="section about appearAnimation">
      <img className="about__image" src={myImage} alt="Сергей Медведев" />
      <div className="about__info-container">
        <h2 className="about__title section-title">Сергей</h2>
        <p className="about__text">
          Приветствую! Меня зовут Сергей Медведев. Я студент Яндекс.Практикума.
        </p>
        <p className="about__text">
          В процессе обучения мною были приобретены необходимые навыки для веб-разработки:
          изучены HTML, CSS и JavaScript,
          методология БЭМ,
          библиотека React, система управления версиями Git,
          основы бэк-енда для настройки сервера с помощью Nginx и Node.js.
        </p>
      </div>
    </section>
  );
}

export default React.memo(About);
