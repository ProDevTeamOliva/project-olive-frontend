export const parseDate = (date) => {
  const newDate = new Date(
    Date.UTC(
      date.year,
      date.month,
      date.day,
      date.hour,
      date.minute,
      date.second
    )
  );
  const convertDate = `${newDate.getFullYear()}-${
    newDate.getMonth().toString().length > 1
      ? newDate.getMonth()
      : "0" + newDate.getMonth()
  }-${
    newDate.getDate().toString().length > 1
      ? newDate.getDate()
      : "0" + newDate.getDate()
  } ${newDate.getHours()}:${
    newDate.getMinutes().toString().length > 1
      ? newDate.getMinutes()
      : "0" + newDate.getMinutes()
  }`;
  return convertDate;
};
