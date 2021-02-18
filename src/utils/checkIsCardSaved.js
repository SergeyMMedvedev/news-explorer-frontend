export default function checkIsCardSaved(cards, currentCard) {
  return cards.some((card) => (card.link === currentCard.url));
}
