import React from 'react';

import './styles.css';
import LogoImg from '../../assets/logo.svg';
import LandingImg from '../../assets/landing.svg';
import studyIcon from '../../assets/icons/study.svg';
import giveClassesIcon from '../../assets/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/icons/purple-heart.svg';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <article id="page-landing">
      <section id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={LogoImg} alt="Logo App" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img src={LandingImg} alt="Plataforma de estudos" className="hero-image" />

        <section className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Give Classes" />
            Estudar
          </Link>
        </section>

        <span className="total-connections">
          Total de 200 conexões já realizadas
          <img src={purpleHeartIcon} alt="Coração roxo" />
        </span>
      </section>
    </article>
  );
};

export default Landing;
