function cardSwitchAnimation(cards, className) {
  return `${className} ${(cards.length % 2 === 0) ? 'switchAnimation' : 'switchAnimation2'}`
}

export default cardSwitchAnimation;
