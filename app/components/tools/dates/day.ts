const dayjs = require("dayjs");
require("dayjs/locale/fr");

export default function day(weatherDate: number) {
  dayjs.locale("fr");
  const weatherCurrentDayNumber = dayjs.unix(weatherDate).date();
  const weatherCurrentDayString = dayjs.unix(weatherDate).format("ddd");
  const currentDayNumber = dayjs().date();

  if (weatherCurrentDayNumber === currentDayNumber) {
    return "Aujourd'hui";
  } else if (weatherCurrentDayNumber === currentDayNumber + 1) {
    return "Demain";
  } else {
    return (
      weatherCurrentDayString.slice(0, 1).toUpperCase() +
      weatherCurrentDayString.slice(1)
    );
  }
}
