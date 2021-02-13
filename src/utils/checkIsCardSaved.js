export default function checkIsCardSaved(cards, currentCard) {
  let isCardSaved = false;
  cards.forEach((card) => {
    if (card.link === currentCard.url) isCardSaved = true;
  });
  return isCardSaved;
}
