import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import cardimage1 from '../../images/image_08.jpg';
import cardimage2 from '../../images/image_04.jpg';
import cardimage3 from '../../images/image_07.jpg';

function NewsCardList() {

  console.log(cardimage1)
  console.log(cardimage2)
  console.log(cardimage3)



  return (
    <section className='newscardlist'>
      <h2 className='newscardlist__title'>Результаты поиска</h2>
      <ul className='newscardlist__elements'>
        <NewsCard
          image={cardimage1}
          title='Национальное достояние – парки'
          text='В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.'
          source='ЛЕНТА.РУ'
        />
        <NewsCard
          image={cardimage2}
          title='Лесные огоньки: история одной фотографии'
          text='Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного 
          из местных чудес природы.'
          source='МЕДУЗА'
        />
        <NewsCard
          image={cardimage3}
          title='«Первозданная тайга»: новый фотопроект Игоря Шпиленка'
          text='Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...'
          source='РИА'
        />
      </ul>
      <button className='newscardlist__show-more-button'>Показать еще</button>
    </section>

  )
}

export default NewsCardList;