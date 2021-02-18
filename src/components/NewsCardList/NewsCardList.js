import React from 'react';
import './NewsCardList.css';
import '../appearAnimation/appearAnimation.css';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({
  mainPage,
  cards,
  onBookmarkClikToSave,
  onBookmarkClikToDelete,
  disappear,
  onLoginClick,
  newsCardListRef,
  onTrashClick,
}) {
  return (
    <ul ref={newsCardListRef} className={`newscardlist appearAnimation ${disappear ? 'disappearAnimation' : 'appearAnimation'}`}>
      {cards.map((card) => (
        <NewsCard
          key={card.url || card.link}
          mainPage={mainPage}
          pubDate={card.publishedAt || card.date}
          image={card.urlToImage || card.image}
          title={card.title}
          text={card.description || card.text}
          source={card.source.name || card.source}
          url={card.url || card.link}
          keyword={card.keyword}
          card={card}
          onBookmarkClikToSave={onBookmarkClikToSave}
          onBookmarkClikToDelete={onBookmarkClikToDelete}
          onLoginClick={onLoginClick}
          onTrashClick={onTrashClick}
        />
      ))}
    </ul>
  );
}

export default NewsCardList;
