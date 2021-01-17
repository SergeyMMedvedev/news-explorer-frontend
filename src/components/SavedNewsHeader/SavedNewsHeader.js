import './SavedNewsHeader.css';
import { getKeyWords, getNumberForSavedNews } from '../../utils/getEndingsForNumbers';
import cardSwitchAnimation from '../../utils/switchAnimation';

function SavedNewsHeader({ cards }) {

  return (
    <div className='section saved-news-header'>
      <h2 className='saved-news-header__title'>Сохранненные статьи</h2>
      <h3 className={`section-title ${cardSwitchAnimation(cards, 'saved-news-header__subtitle')}`}>Сергей, у вас {cards.length || 'нет'}<br></br> {getNumberForSavedNews(cards.length)}</h3>
      <p className={cardSwitchAnimation(cards, 'saved-news-header__keywords')}>{getKeyWords(cards)}</p>
    </div>
  )
}

export default SavedNewsHeader;
