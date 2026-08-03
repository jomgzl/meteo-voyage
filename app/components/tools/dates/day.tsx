const dayjs = require("dayjs");

export default function day(weatherDate) {
  const weatherCurrentDayNumber = dayjs.unix(weatherDate).date();
  const weatherCurrentDayString = dayjs.unix(weatherDate).format("ddd");
  const currentDayNumber = dayjs().date();

  if (weatherCurrentDayNumber === currentDayNumber) {
    return "Aujourd'hui";
  } else if (weatherCurrentDayNumber === currentDayNumber + 1) {
    return "Demain";
  } else {
    return weatherCurrentDayString;
  }
}
