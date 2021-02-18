import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import FormButton from '../ui/FormButton/FormButton';
import handleSearchPhrase from '../../utils/handleSearchPhrase';

function SearchForm({
  onSubmit,
  startLoading,
  isCardsLoaded,
}) {
  const [keyword, setKeyword] = useState('');
  const [isKeywordValid, setIsKeywordValid] = useState(false);
  const [searchFormDisabled, setSearchFormDisabled] = useState(false);

  function handleKeywordChange(e) {
    setKeyword(e.target.value.trimLeft());
    setIsKeywordValid(e.target.validity.valid);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const preparedKeyword = handleSearchPhrase(keyword);
    onSubmit(isKeywordValid, preparedKeyword);
  }

  useEffect(() => {
    if (startLoading) {
      setSearchFormDisabled(true);
    } else if (isCardsLoaded) {
      setSearchFormDisabled(false);
    }
  }, [startLoading, isCardsLoaded]);

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
          disabled={searchFormDisabled}
        />
        <FormButton
          className="searchform__submit-button"
          value="Искать"
          disabled={searchFormDisabled}
        />
      </form>
    </section>
  );
}

export default SearchForm;
