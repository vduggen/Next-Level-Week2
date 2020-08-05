import React from 'react';

import whastappIcon from '../../assets/icons/whatsapp.svg';

import './styles.css';

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars0.githubusercontent.com/u/53385727?s=460&u=26dd749411136d12425f6c17a39aab2136e61570&v=4"
          alt="Vitor"
        />
        <div>
          <strong>Vitor Duggen</strong>
          <span>Tecnologia</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de química avançada.
        <br />
        <br />
        Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de
        200.000 pessoas já passaram por uma das minhas explosões.
      </p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whastappIcon} alt="" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
