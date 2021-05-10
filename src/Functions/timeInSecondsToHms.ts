const padNumber = (number: number, size: number) => {
  let numberAsString = number.toString();
  while (numberAsString.length < size) numberAsString = `0${numberAsString}`;
  return numberAsString;
};

const timeInSecondsToHms = (timeInSeconds: number | undefined) => {
  let currentTimeInSecondsToHms = "00:00";
  if (timeInSeconds) {
    const timeInSecondsAsNumber = Number(timeInSeconds);

    const hour = Math.floor(timeInSecondsAsNumber / 3600);
    const minute = Math.floor((timeInSecondsAsNumber % 3600) / 60);
    const second = Math.floor((timeInSecondsAsNumber % 3600) % 60);
    const paddedHour = padNumber(hour, 2);
    const paddedMinute = padNumber(minute, 2);
    const paddedSecond = padNumber(second, 2);

    if (hour && hour > 0) {
      currentTimeInSecondsToHms = `${paddedHour}:${paddedMinute}:${paddedSecond}`;
    }

    if (!hour || hour <= 0) {
      currentTimeInSecondsToHms = `${paddedMinute}:${paddedSecond}`;
    }
  }

  return currentTimeInSecondsToHms;
};

export default timeInSecondsToHms;
