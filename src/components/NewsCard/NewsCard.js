import './NewsCard.css';
import React, {
  useState,
  useRef,
  useContext,
  useEffect,
} from 'react';

import SaveIcon from '../svg/SaveIcon';
import DeleteIcon from '../svg/DeleteIcon';
import returnNewsPubDate from '../../utils/returnNewsPubDate';
import CurrentUserContext from '../../context/CurrentUserContext';
import CurrentSavedCardsContext from '../../context/CurrentSavedCardsContext';
import mainApi from '../../utils/MainApi';
import getCardId from '../../utils/getCardId';
import checkIsCardSaved from '../../utils/checkIsCardSaved';
import { DEFAULT_IMAGE } from '../../utils/constants';
import isURL from '../../utils/urlValidation';

function NewsCard({
  mainPage,
  pubDate,
  image,
  title,
  text,
  source,
  url,
  keyword,
  card,
  onBookmarkClikToSave,
  onBookmarkClikToDelete,
  onTrashClick,
  onLoginClick,
}) {
  const date = new Date(pubDate);
  const currentUser = useContext(CurrentUserContext);
  const savedNewsCards = useContext(CurrentSavedCardsContext);
  const [hintClassName, setHintClassName] = useState('newscard__button-hint');
  const newscardRef = useRef();

  function handleMouseOver() {
    setHintClassName('newscard__button-hint newscard__button-hint_active');
  }

  function handleMouseLeave() {
    setHintClassName('newscard__button-hint');
  }

  const [saveIconClassName, setSaveIconClassName] = useState('');

  function handleDelete(evt) {
    if (!evt.currentTarget.disabled) {
      onTrashClick(card);
    }
    evt.currentTarget.disabled = 'true';
  }

  function handleSaveClick() {
    if (saveIconClassName === 'newscard__button_pressed') {
      const className = '';
      const cardId = getCardId(savedNewsCards, card);
      if (cardId) {
        onBookmarkClikToDelete({ cardId, setSaveIconClassName, className });
      }
    } else {
      mainApi.saveArticle({
        keyword,
        title,
        text,
        date,
        source,
        image: (isURL(image) ? image : DEFAULT_IMAGE),
        link: url,
      }).then(() => {
        onBookmarkClikToSave({});
      }).catch((error) => {
        onBookmarkClikToSave({ error });
      });
    }
  }

  function getSaveHint() {
    if (saveIconClassName === 'newscard__button_pressed') {
      return 'Убрать из сохраненных';
    }
    return 'Сохранить статью';
  }

  useEffect(() => {
    const isCurrentCardSaved = checkIsCardSaved(savedNewsCards, card);
    if (isCurrentCardSaved) setSaveIconClassName('newscard__button_pressed');
  }, [card, savedNewsCards]);

  return (
    <li ref={newscardRef} className={`newscard ${((!card.invisible || !mainPage)) ? 'newscard_show' : ''}`}>
      <div className="newscard__picture-container">
        <img src={image || DEFAULT_IMAGE} className="newscard__picture" alt={`${card.title.slice(0, 16)}...`} />
      </div>
      <a href={url} rel="noreferrer" className="newscard__info" target="_blank">
        <p className="newscard__date">{returnNewsPubDate(date)}</p>
        <p className="newscard__title">{title}</p>
        <p className="newscard__text" dangerouslySetInnerHTML={{ __html: text }} />
      </a>
      <a href={url} rel="noreferrer" className="newscard__source-link" target="_blank">{source.toUpperCase()}</a>

      {mainPage
        ? (
          <div className="newscard__button-container">
            <div className="newscard__button-hint-container">
              <p className={hintClassName}>
                {currentUser.name ? (
                  getSaveHint()
                ) : (
                  'Войдите, чтобы сохранять статьи'
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={currentUser.name ? handleSaveClick : onLoginClick}
              onMouseLeave={handleMouseLeave}
              onFocus={handleMouseOver}
              onMouseOver={handleMouseOver}
              className="newscard__button"
            >
              <SaveIcon
                saveIconClassName={saveIconClassName}
              />
            </button>
          </div>
        )
        : (
          <div className="newscard__button-container">
            <div className="newscard__keyword">{keyword}</div>
            <div className="newscard__button-hint-container">
              <p className={`${hintClassName} newscard__button-hint_delete`}>Убрать из сохраненных</p>
            </div>
            <button type="button" onClick={handleDelete} onFocus={handleMouseOver} onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} className="newscard__button newscard__button_delete">
              <DeleteIcon />
            </button>
          </div>

        )}

    </li>
  );
}

export default NewsCard;
