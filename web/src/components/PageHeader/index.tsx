import React from 'react';

import './styles.css';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import backIcon from '../../assets/icons/back.svg';

interface IPageHeaderProps {
  title: string;
}

const PageHeader: React.FC<IPageHeaderProps> = (props) => {
  return (
    <article className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>

        <img src={logoImg} alt="Proffy" />
      </div>

      <div className="header-content">
        <strong>{props.title}</strong>

        {props.children}
      </div>
    </article>
  );
};

export default PageHeader;
