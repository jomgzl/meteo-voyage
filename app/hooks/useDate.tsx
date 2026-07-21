export default function useDate(weatherDate) {
  const weatherCurrentDateObject = new Date(weatherDate);
  const currentDateObject = new Date(Date.now());
  const weatherCurrentDay = weatherCurrentDateObject.getUTCDate();
  const currentDay = currentDateObject.getUTCDate();
  const daysOfTheWeek = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  console.log(daysOfTheWeek[weatherCurrentDateObject.getDay()]);

  if (weatherCurrentDay === currentDay) {
    return "Aujourd'hui";
  } else if (weatherCurrentDay === currentDay + 1) {
    return "Demain";
  } else {
    return (
      daysOfTheWeek[weatherCurrentDateObject.getDay()] + " " + weatherCurrentDay
    );
  }
}
