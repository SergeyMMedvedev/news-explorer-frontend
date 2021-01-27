const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'авгута', 'сентября', 'октября', 'ноября', 'декабря'];

function returnNewsPubDate(date) {
  return `${date.getDay()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
}

export default returnNewsPubDate;
