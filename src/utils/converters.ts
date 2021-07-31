
export const formatDateHour = (dateString: string) => {
  let date = new Date(dateString);

  var day = date.getDate();       // yields date
  var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
  var year = date.getFullYear();  // yields year
  var hour = date.getHours();     // yields hours 
  var minute = date.getMinutes(); // yields minutes
  var seconds = date.getSeconds();

  let minuteString = minute.toString();
  if (minute < 10) minuteString = "0" + minuteString

  let secondString = seconds.toString();
  if (seconds < 10) secondString = "0" + secondString

  if(day.toString() === 'NaN') return ' - '

  return day + "/" + month + "/" + year + " " + hour + ':' + minuteString + ":" + secondString;
}

export const formatDate = (dateString: string) => {
  let date = new Date(dateString);

  var day = date.getDate();       // yields date
  var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
  var year = date.getFullYear();  // yields year


  if(day.toString() === 'NaN') return ' - '

  return day + "/" + month + "/" + year;
}

export const formatHour = (dateString: string) => {
  let date = new Date(dateString);
  var hour = date.getHours();     // yields hours 
  var minute = date.getMinutes(); // yields minutes
  var seconds = date.getSeconds();

  let minuteString = minute.toString();
  if (minute < 10) minuteString = "0" + minuteString

  let secondString = seconds.toString();
  if (seconds < 10) secondString = "0" + secondString

  if(hour.toString() === 'NaN') return ' - '

  return hour + ':' + minuteString + ":" + secondString;
}