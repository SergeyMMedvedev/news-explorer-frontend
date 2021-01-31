import React, { useState } from 'react';
import './SearchForm.css';
import FormButton from '../ui/FormButton/FormButton';

function SearchForm({ onSubmit }) {
  const [keyword, setKeyword] = useState('');

  function handleKeywordChange(e) {
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(keyword);
    setKeyword('');
  }

  return (
    <section className="searchform">
      <h2 className="searchform__header">Что творится в мире?</h2>
      <p className="searchform__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <form onSubmit={handleSubmit} className="searchform__form">
        <input value={keyword} onChange={handleKeywordChange} type="text" className="searchform__input" placeholder="Введите тему новости" />
        {/* <input type="submit"
         className="searchform__submit-button form-button" value="Искать" /> */}
        <FormButton
          className="searchform__submit-button"
          value="Искать"
        />
      </form>
    </section>
  );
}

export default SearchForm;
