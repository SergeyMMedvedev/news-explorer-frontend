import './NewsCard.css';
import {
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';

import { CurrentMaxWidthContext } from '../../context/CurrentMaxWidthContext';
import { cards } from '../../db/cards';
import SaveIcon from '../svg/SaveIcon';
import DeleteIcon from '../svg/DeleteIcon';

function NewsCard({
  mainPage,
  image,
  title,
  text,
  source,
  pubDate,
  url,
  keyword,
  onDelete,
  card,
  cardHiddenClass
}) {
  const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "авгута", "сентября", "октября", "ноября", "декабря"
  ];

  const maxWidth = useContext(CurrentMaxWidthContext);


  const date = new Date(pubDate)
  const newsPubDate = `${date.getDay()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
  // console.log(mainPage)

  function handleNewsCardClick(evt) {
    if (!evt.target.classList.contains('newscard__button') &&
      !evt.target.classList.contains('svg') &&
      !evt.target.classList.contains('svg__path')) {
      window.open(url, "_blank")
    }
  }

  const [hintClassName, setHintClassName] = useState('newscard__button-hint')

  function handleMouseOver() {
    setHintClassName('newscard__button-hint newscard__button-hint_active')
  }

  function handleMouseLeave() {
    setHintClassName('newscard__button-hint')
  }


  const [newsCardText, setNewsCardText] = useState(text)
  const [newsCardTitle, setNewsCardTitle] = useState(title)

  useEffect(() => {


    let numOfTextLetters;
    let numOfTitleLetters;
    // console.log('1440 < width', 1440 < maxWidth)
    // console.log('1280 < width && width <= 1440', 1280 < maxWidth && maxWidth <= 1440)
    // console.log('1024 < width && width <= 1280', 1024 < maxWidth && maxWidth <= 1280)
    // console.log('680 < width && width <= 1024', 680 < maxWidth && maxWidth <= 1024)
    // console.log('480 <width && width <= 680', 480 < maxWidth && maxWidth <= 680)
    // console.log('width < 480', maxWidth < 480)

    if (maxWidth === 1440) {
      numOfTitleLetters = 60
      numOfTextLetters = 150
    } else if (maxWidth === 1280) {
      numOfTitleLetters = 60
      numOfTextLetters = 150
    } else if (maxWidth === 1024) {
      numOfTitleLetters = 45
      numOfTextLetters = 130
    } else if (maxWidth === 768) {
      numOfTitleLetters = 30
      numOfTextLetters = 60
    } else if (maxWidth === 680) {
      numOfTitleLetters = 33
      numOfTextLetters = 90
    } else if (maxWidth === 480) {
      numOfTitleLetters = 33
      numOfTextLetters = 90
    } else if (maxWidth === 320) {
      numOfTitleLetters = 33
      numOfTextLetters = 90
    }

    if (numOfTextLetters < text.length) {
      setNewsCardText(`${text.slice(0, numOfTextLetters)}...`)
    } else {
      setNewsCardText(text)
    }

    if (numOfTitleLetters < title.length) {
      setNewsCardTitle(`${title.slice(0, numOfTitleLetters)}...`)
    } else {
      setNewsCardTitle(title)
    }

  }, [maxWidth])

  function handleDelete() {
    onDelete(card)
  }


  const newscardRef = useRef();

  return (
    <li ref={newscardRef} className={`newscard ${cardHiddenClass ? 'newscard_hidden' : 'newscard_show'}`} onClick={handleNewsCardClick}>
      <img src={image} className='newscard__picture' alt='' />
      <div className='newscard__info'>
        <p className='newscard__date'>{newsPubDate}</p>
        <p className='newscard__title'>{newsCardTitle}</p>
        <p className='newscard__text'>{newsCardText}</p>
        <a href={url} rel='noreferrer' className='newscard__source-link' target='_blank'>{source}</a>
      </div>

      {mainPage

        ?
        //TODO иконки
        <div className='newscard__button-container'>
          <div className='newscard__button-hint-container'>
            <p className={hintClassName}>Войдите, чтобы сохранять статьи</p>
          </div>
          <button onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} className='newscard__button'>
            <SaveIcon />
          </button>
        </div>

        :
        <div className='newscard__button-container'>
          <div className='newscard__keyword'>{keyword}</div>
          <div className='newscard__button-hint-container'>
            <p className={hintClassName + ' newscard__button-hint_delete'}>Убрать из сохраненных</p>
          </div>
          <button onClick={handleDelete} onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} className='newscard__button newscard__button_delete'>
            <DeleteIcon />
          </button>
        </div>

      }

    </li>
  )
}

export default NewsCard;