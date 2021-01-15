import './NewsCard.css';
import { 
    useState,
    useRef, 
    useEffect,
    useContext,
  } from 'react';

import { CurrentMaxWidthContext } from '../../context/CurrentMaxWidthContext';

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
}) {
  const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "авгута", "сентября", "октября", "ноября", "декабря"
  ];

  const maxWidth = useContext(CurrentMaxWidthContext)

  const date = new Date(pubDate)
  const newsPubDate = `${date.getDay()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
  // console.log(mainPage)

  function handleNewsCardClick(evt) {
    if (!evt.target.classList.contains('newscard__button')) {
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

  const textRef = useRef()
  const titleRef = useRef()
  const cardRef = useRef()
  const [newsCardText, setNewsCardText] = useState(text)
  const [newsCardTitle, setNewsCardTitle] = useState(title)
  
  useEffect(() => {
    // TODO конкретное число букв
    console.log('mediaQury from cards ', maxWidth)
    let width = textRef.current.getBoundingClientRect().width
    let height = textRef.current.getBoundingClientRect().height
    // console.log('width', width)
    // console.log('hight', height)

    let numOfTextLetters;
    let numOfTitleLetters;
    console.log('1440 < width', 1440 < maxWidth)
    console.log('1280 < width && width <= 1440', 1280 < maxWidth && maxWidth <= 1440)
    console.log('1024 < width && width <= 1280', 1024 < maxWidth && maxWidth <= 1280)
    console.log('680 < width && width <= 1024', 680 < maxWidth && maxWidth <= 1024)
    console.log('480 <width && width <= 680', 480 < maxWidth && maxWidth <= 680)
    console.log('width < 480', maxWidth < 480)

    if (1440 < maxWidth) {
      console.log('now 1', maxWidth)
      numOfTitleLetters = 60
      numOfTextLetters = 150
    } else if (1280 < maxWidth && maxWidth <= 1440 ) {
      console.log('now 2', maxWidth)
      numOfTitleLetters = 60
      numOfTextLetters = 150
    } else if (1024 < maxWidth && maxWidth <= 1280) {
      console.log('now 3', maxWidth)
      numOfTitleLetters = 45
      numOfTextLetters = 130
    } else if (768 < maxWidth && maxWidth <= 1024) {
      console.log('now 4', maxWidth)
      numOfTitleLetters = 35
      numOfTextLetters = 130
    } else if (maxWidth <= 768) {
      console.log('now 5', maxWidth)
      numOfTitleLetters = 30
      numOfTextLetters = 64
    }


    // console.log('numOfTextLetters', numOfTextLetters)
    // console.log('numOfTitleLetters', numOfTitleLetters)


    if (numOfTextLetters < text.length) {
      setNewsCardText(`${text.slice(0, numOfTextLetters)}...`)
    } else {
      setNewsCardText(text)
    }

    // console.log('numOfTitleLetters < title.length', numOfTitleLetters < title.length)


    if (numOfTitleLetters < title.length) {
      setNewsCardTitle(`${title.slice(0, numOfTitleLetters)}...`)
    } else {
      setNewsCardTitle(title)
    }

    // console.log(newsCardText)
    // console.log(newsCardTitle)
    // console.log('title.slice(0, numOfTitleLetters)', title.slice(0, numOfTitleLetters))

    // forceUpdate()
  }, [maxWidth])

  function handleDelete() {
    onDelete(card)
  }

  


  return (
    <li ref={cardRef} className='newscard' onClick={handleNewsCardClick}>
      {/* <div className='newscard__picture-container'> */}
        <img src={image} className='newscard__picture' alt='' />
      {/* </div> */}
      <div className='newscard__info'>
        <p className='newscard__date'>{newsPubDate}</p>
        {/* <p ref={titleRef} className='newscard__title'>{title}</p> */}
        <p ref={titleRef} className='newscard__title'>{newsCardTitle}</p>
        {/* <p ref={textRef} className='newscard__text'>{text}</p> */}
        <p ref={textRef} className='newscard__text'>{newsCardText}</p>
        {/* <p className='newscard__text'>{text}</p> */}
        <a href={url} rel='noreferrer' className='newscard__source-link' target='_blank'>{source}</a>
      </div>



      {mainPage

        ?
        <div className='newscard__button-container'>
          <div className='newscard__button-hint-container'>
            <p className={hintClassName}>Войдите, чтобы сохранять статьи</p>
          </div>
          <button onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} className='newscard__button newscard__button_save' />
        </div>

        :
        <div className='newscard__button-container newscard__button-container_saved-news'>
          <div className='newscard__keyword'>{keyword}</div>
          <div className='newscard__button-hint-container'>
            <p className={hintClassName}>Убрать из сохраненных</p>
          </div>
          <button onClick={handleDelete} onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} className='newscard__button newscard__button_delete' />
        </div>

      }

    </li>
  )
}

export default NewsCard;