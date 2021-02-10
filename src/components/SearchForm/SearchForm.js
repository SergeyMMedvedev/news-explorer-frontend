import React, { useState } from 'react';
import './SearchForm.css';
import FormButton from '../ui/FormButton/FormButton';

function SearchForm({ onSubmit }) {
  const [keyword, setKeyword] = useState('');
  const [isKeywordValid, setIsKeywordValid] = useState(false);

  function handleKeywordChange(e) {
    setKeyword(e.target.value.trimLeft());
    setIsKeywordValid(e.target.validity.valid);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(isKeywordValid, keyword);
    setIsKeywordValid(false);
    setKeyword('');
  }

  return (
    <section className="searchform">
      <h2 className="searchform__header">Что творится в мире?</h2>
      <p className="searchform__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <form onSubmit={handleSubmit} className="searchform__form" noValidate>
        <input
          value={keyword}
          onChange={handleKeywordChange}
          type="text"
          className="searchform__input"
          placeholder="Введите тему новости"
          required
        />
        <FormButton
          className="searchform__submit-button"
          value="Искать"
        />
      </form>
    </section>
  );
}

export default SearchForm;
