import React from 'react';
import './SearchForm.css';

function SearchForm({ onSubmit }) {
  return (
    <section className="searchform">
      <h2 className="searchform__header">Что творится в мире?</h2>
      <p className="searchform__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <form onSubmit={onSubmit} className="searchform__form">
        <input type="text" className="searchform__input" placeholder="Введите тему новости" />
        <input type="submit" className="searchform__submit-button form-button" value="Искать" />
      </form>
    </section>
  );
}

export default SearchForm;
