export const myId = "z69D";

export const proxy =
  process.env.NODE_ENV === "development"
    ? "http://192.168.86.25:3001"
    : "https://marketplace-v942-production-yeccqhdvqq-wm.a.run.app";

export const timeSince = (date) => {
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

export const filterSearchItems = (filters, hideSold, items) => {
  let newItems = items;

  if (filters.minPrice && !filters.maxPrice) {
    newItems = newItems.filter((profile) => {
      return profile.items.price >= filters.minPrice;
    });
  }

  if (!filters.minPrice && filters.maxPrice) {
    newItems = newItems.filter((profile) => {
      return profile.items.price <= filters.maxPrice;
    });
  }

  if (filters.minPrice && filters.maxPrice) {
    newItems = newItems.filter((profile) => {
      return profile.items.price >= filters.minPrice && profile.items.price <= filters.maxPrice;
    });
  }

  if (hideSold) {
    newItems = newItems.filter((profile) => profile.items.status != "Sold");
  }

  if (filters.categories) {
    newItems = newItems.filter((profile) => filters.categories.include(profile.items.categories));
  }

  if (filters.sort == "Most recent") {
    newItems = newItems.sort((a, b) => new Date(b.items.date) - new Date(a.items.date));
  }

  return newItems;
};
