
export const formatDateHour = (dateString: string) => {
  let date = new Date(dateString);

  var day = date.getDate();       // yields date
  var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
  var year = date.getFullYear();  // yields year
  var hour = date.getHours();     // yields hours 
  var minute = date.getMinutes(); // yields minutes

  let minuteString = minute.toString();
  if (minute < 10) minuteString = "0" + minuteString

  if(day.toString() === 'NaN') return ' - '

  return day + "/" + month + "/" + year + " " + hour + ':' + minuteString;
}