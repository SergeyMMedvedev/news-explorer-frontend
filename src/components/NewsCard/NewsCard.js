import './NewsCard.css';
import React, {
  useState,
  useRef,
  useContext,
} from 'react';

import SaveIcon from '../svg/SaveIcon';
import DeleteIcon from '../svg/DeleteIcon';
import returnNewsPubDate from '../../utils/returnNewsPubDate';
import CurrentUserContext from '../../context/CurrentUserContext';
import mainApi from '../../utils/MainApi';

function NewsCard({
  mainPage,
  pubDate,
  image,
  title,
  text,
  source,
  url,
  keyword,
  onDelete,
  card,
  cardHiddenClass,
}) {
  const date = new Date(pubDate);
  const currentUser = useContext(CurrentUserContext);
  const [hintClassName, setHintClassName] = useState('newscard__button-hint');

  function handleMouseOver() {
    setHintClassName('newscard__button-hint newscard__button-hint_active');
  }

  function handleMouseLeave() {
    setHintClassName('newscard__button-hint');
  }

  const [saveIconClassName, setSaveIconClassName] = useState('');

  function handleDelete(evt) {
    evt.currentTarget.disabled = 'true';
    onDelete(card);
  }

  const newscardRef = useRef();

  function handleSaveClick() {
    if (saveIconClassName === 'newscard__button_pressed') {
      setSaveIconClassName('');
      mainApi.deleteArticle();
    } else {
      // console.log(localStorage.getItem('jwt'));
      // console.log('card.description', card.description);
      mainApi.saveArticle({
        keyword: 'article4',
        title,
        text,
        date,
        source,
        image,
        link: url,
      }).then((res) => {
        console.log(res);
        setSaveIconClassName('newscard__button_pressed');
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  function getSaveHint() {
    if (saveIconClassName === 'newscard__button_pressed') {
      return 'Убрать из сохраненных';
    }
    return 'Сохранить статью';
  }

  return (
    <li ref={newscardRef} className={`newscard ${cardHiddenClass ? 'newscard_hidden' : 'newscard_show'}`}>
      <img src={image} className="newscard__picture" alt={card.title} />
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
            <button type="button" onClick={currentUser.name && handleSaveClick} onMouseLeave={handleMouseLeave} onFocus={handleMouseOver} onMouseOver={handleMouseOver} className="newscard__button">
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
