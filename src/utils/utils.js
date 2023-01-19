import { info } from "./info";

const utils = {
  formatDate: (currentDate) => {
    const newDate = new Date(currentDate);
    const monthDay = currentDate.getDate();
    const month = info.data.months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return `${monthDay} ${month} ${year}`;
  },
  formatISODate: (currentDate) => {
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;

    return `${year}-${month}-${day}`;
  },

  formatDateLong: (currentDate) => {
    const weekDay = info.data.days[currentDate.getDay()];
    const monthDay = currentDate.getDate();
    const month = info.data.months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return `${weekDay}, ${monthDay} ${month} ${year}`;
  },

  formatHour: (hour) => {
    let time = {};
    let timeValues = hour.split(":");

    timeValues = timeValues.map((value) =>
      parseInt(value) !== 0 ? parseInt(value) : value
    );

    time.hour = timeValues[0];
    time.minutes = timeValues[1];

    if (time.hour === 12) return `12:${time.minutes}pm`;
    if (time.hour === 24) return `12:${time.minutes}am`;
    if (time.hour < 12) return `${time.hour}:${time.minutes}am`;

    if (time.hour > 12) {
      let hour = (time.hour - 12).toString().split("");
      if (hour.length > 1) return `${hour[0]}${hour[1]}:${time.minutes}pm`;
      return `${hour[0]}:${time.minutes}pm`;
    }
  },

  formatCurrency: (number) => {
    number = parseFloat(number);

    let formattedCurrency = new Intl.NumberFormat("en-US");
    return `$${formattedCurrency.format(number)}`;
  },

  formatTimerInput: (value, prev) => {
    // IF VALUE IS 0, AND PREV VALUE WAS > 0, SET VALUE TO 00
    if (value == 0 && prev == 0) value = "00";
    if (value == 0 && prev > 0) value = "00";

    // IF PREV VALUE WAS 0, AND NEW VALUE IS > 0 BUT < 10, ALLOW ONLY 1 DIGIT
    if (value != 0) {
      if (value < 10 && value.toString().length > 2) value = value.slice(1, 3);
    }

    // IF VALUE'S LENGTH IS > 2, SLICE IT
    if (value.length >= 2) {
      // IF PREV VALUE WAS > 10, AND NEW VALUE IS < 10, KEEP FIRST TWO DIGITS
      if (value < 10 || prev >= 10) {
        value = value.slice(0, 2);
      }
      // IF PREV VALUE WAS < 10, AND NEW VALUE IS > 10, KEEP LAST TWO DIGITS
      if (prev < 10 && value >= 10) {
        value = value.slice(1, 3);
      }
    }

    // IF VALUE IS > 59, SET IT TO 59
    if (value > 59) value = 59;

    // IF VALUE IS < 10, ADD 0
    if (value.length < 2 && value < 10 && value != 0) {
      value = "0" + value;
    }

    return value;
  },

  formatTitleToUrl: (title) => {
    let url = title.toLowerCase();
    url = url.replace(/ /g, "-");
    url = url.replace(/á/g, "a");
    url = url.replace(/é/g, "e");
    url = url.replace(/í/g, "i");
    url = url.replace(/ó/g, "o");
    url = url.replace(/ú/g, "u");
    url = url.replace(/ñ/g, "n");
    url = url.replace(/,/g, "");
    url = url.replace(/:/g, "");
    url = url.replace(/;/g, "");
    url = url.replace(/"/g, "");
    url = url.replace(/'/g, "");
    url = url.replace(/\./g, "");
    url = url.replace(/\?/g, "");
    url = url.replace(/!/g, "");
    url = url.replace(/¡/g, "");
    url = url.replace(/¿/g, "");
    url = url.replace(/-/g, "-");
    url = url.replace(/\(/g, "");
    url = url.replace(/\)/g, "");
    url = url.replace(/%/g, "-");
    url = url.replace(/=/g, "-");
    url = url.replace(/_/g, "-");
    url = url.replace(/#/g, "-");
    url = url.replace(/\$/g, "-");
    url = url.replace(/@/g, "-");
    url = url.replace(/\+/g, "-");
    url = url.replace(/\*/g, "-");
    url = url.replace(/~/g, "-");
    url = url.replace(/`/g, "-");
    return url;
  },

  getIdFromTitleUrl: (titleUrl) => {
    let id = titleUrl.split("-");
    id = id[id.length - 1];
    return id;
  },

  getTitleFromTitleUrl: (titleUrl) => {
    let title = titleUrl.split("-");
    title.pop();
    title = title.join(" ");
    // capitalize all words
    title = title.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    return title;
  },

  getCurrentDate: () => {
    const currentDate = new Date();

    const weekDay = info.data.days[currentDate.getDay()];
    const monthDay = currentDate.getDate();
    const month = info.data.months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return `${weekDay}, ${monthDay} ${month} ${year}`;
  },

  getShortDate: () => {
    const currentDate = new Date();

    const monthDay = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    return `${monthDay}/${month}/${year}`;
  },

  getMonthYear: () => {
    const currentDate = new Date();

    const month = info.data.months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return `${month} ${year}`;
  },

  getWeightPercents: (weight) => {
    const percents = info.data.weightPercents;
    const percentsArray = [];

    percents.forEach((percent) => {
      const newPercent = (percent * weight) / 100;
      percentsArray.push(newPercent);
    });

    return percentsArray;
  },

  parseDate: (date) => {
    const newDate = new Date(date);
    const nextDay = new Date(newDate);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    return nextDay;
  },

  parseDateWithTime: (date) => {
    const newDate = new Date(date);
    const nextDay = new Date(newDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    nextDay.setHours(hours, minutes, seconds, 0);
    return nextDay;
  },

  searchDataFromInput: (data, searchedValue, attribute) => {
    if (searchedValue === "") return data;
    let filteredData = [];

    if (!searchedValue.length > 0) {
      filteredData = data;
    } else {
      filteredData = data.filter((element) => {
        const dataText = `${element[attribute].toLowerCase()}`;
        const searchedValueText = searchedValue.toLowerCase().trim();

        return dataText.includes(searchedValueText);
      });
    }
    return filteredData;
  },

  secondsToTime: (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    minutes = minutes % 60;
    seconds = seconds % 60;

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    return `${hours}:${minutes}:${seconds}`;
  },
  secondsToDate: (seconds) => {
    const date = new Date(seconds * 1000);

    const monthDay = date.getDate();
    const month = info.data.months[date.getMonth()].slice(0, 3).toUpperCase();
    const year = date.getFullYear();

    return `${monthDay} ${month} ${year}`;
  },

  sortSkillsByMostRecent: (data) => {
    return data.sort((a, b) => b.date.seconds - a.date.seconds);
  },

  sortSkillsByOldest: (data) => {
    return data.sort((a, b) => a.date.seconds - b.date.seconds);
  },

  sortSkillsByAlphabeticalOrder: (data) => {
    return data.sort((a, b) => a.movement.localeCompare(b.movement));
  },

  sortPrsByMostRecent: (data) => {
    return data.sort(
      (a, b) => b.scores[0].date.seconds - a.scores[0].date.seconds
    );
  },

  sortPrsByOldest: (data) => {
    return data.sort(
      (a, b) => a.scores[0].date.seconds - b.scores[0].date.seconds
    );
  },

  sortPrsByAlphabeticalOrder: (data) => {
    return data.sort((a, b) => a.movement.localeCompare(b.movement));
  },

  sortMovementsAZOrder: (data) => {
    return data.sort((a, b) => a.name.localeCompare(b.name));
  },

  sortMovementsZAOrder: (data) => {
    return data.sort((a, b) => b.name.localeCompare(a.name));
  },

  timeToSeconds: (time) => {
    let timeValues = time.split(":");
    timeValues = timeValues.map((value) => parseInt(value));

    let seconds = timeValues[0] * 60 + timeValues[1];

    return seconds;
  },
};

export { utils };
