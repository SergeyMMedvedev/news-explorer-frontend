export default function getTimeInterval() {
  const date = new Date();
  const dateToISO = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`;
  const dateFromTimeStamp = date.getTime() - (7 * 24 * 3600 * 1000);
  const dateFrom = new Date(dateFromTimeStamp);
  const dateFromISO = `${dateFrom.getFullYear()}-${(dateFrom.getMonth() + 1)}-${dateFrom.getDay()}`;

  return {
    from: dateFromISO,
    to: dateToISO,
  };
}
