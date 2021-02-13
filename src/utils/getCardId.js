export default function getCardId(cards, currentCard) {
  if (currentCard.link) {
    return currentCard._id;
  }
  let id;
  cards.forEach((card) => {
    if (card.link === currentCard.url) id = card._id;
  });
  return id;
}
