const onLogout = () => {
  localStorage.removeItem("user");
  window.location = "../login.html";
  console.log("logout");
};

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function formatDatetime(datetime) {
  var d = new Date(datetime),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
    hour = d.getHours();
    minute = d.getMinutes();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  return [year, month, day].join("-") + " / " + [hour, minute].join(":");
}

function getFullYear(date) {
  const d = new Date(date);
  let year = d.getFullYear();
  return year;
}

function checkPhoneNumber(phoneNumber) {
  var check = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  if (phoneNumber.match(check)) {
    return true;
  } else {
    return false;
  }
}
