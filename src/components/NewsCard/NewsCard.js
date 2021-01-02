import './NewsCard.css';



function NewsCard({ image, title, text, source }) {

  return (
    <li className='newscard'>
      <div className='newscard__picture-container'>
        <img src={image} className='newscard__picture' alt='' />
      </div>
      <div className='newscard__info'>
        <p className='newscard__date'>2 августа, 2019</p>
        <p className='newscard__title'>{title}</p>
        <p className='newscard__text'>{text}</p>
        <a href='' className='newscard__source-link'>{source}</a>
      </div>
      <button className='newscard__save-button' />
    </li>
  )
}

export default NewsCard;