import { Platform } from "react-native";

export const myId = "z69D";
export const proxy = Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";
export const maxUploadImg = 10;
export const starRatingArr = [1, 2, 3, 4, 5];

export const timeSince = (date) => {
  //   var aDay = 24*60*60*1000;
  if (typeof date !== "object") {
    date = new Date(date);
  }

  const seconds = Math.floor((new Date() - date) / 1000);
  let intervalType;

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = "year";
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = "month";
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = "day";
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += "s";
  }

  return interval + " " + intervalType + " ago";
};

export const dateWithoutTime = () => {
  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  const monthLetters = month[new Date().getMonth()];
  const date = new Date().getDate();
  const year = new Date().getFullYear();

  return `${monthLetters} ${date}, ${year}`;
};
