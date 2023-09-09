const calcTime = (time: number): string => {
  let minute = Math.floor(time / 60);
  const second = Math.floor(time % 60);
  const hour = Math.floor(minute / 60);
  if (hour > 0) minute -= hour * 60;

  return `${hour < 1 ? "" : "0" + hour + ":"}${
    minute < 10 ? "0" : ""
  }${minute}:${second < 10 ? "0" : ""}${second}`;
};

export default calcTime;
