import './SavedNewsHeader.css';
import getKeyWords from '../../utils/getKeyWords';

function SavedNewsHeader({ cards }) {
  return (
    <div className='section saved-news-header'>
      <h2 className='saved-news-header__title'>Сохранненные статьи</h2>
      <h3 className='saved-news-header__subtitle section-title'>Грета, у вас 5<br></br> сохранённых статей</h3>
      <p className='saved-news-header__keywords'>{getKeyWords(cards)}</p>
    </div>





  )
}

export default SavedNewsHeader;
