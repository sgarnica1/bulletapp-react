import { info } from "./info";

const utils = {
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
  searchDataFromInput: (data, searchedValue) => {
    let filteredData = [];

    if (!searchedValue.length > 0) {
      filteredData = data;
    } else {
      filteredData = data.filter((element) => {
        const dataText = `${element.user.first_name.toLowerCase()} ${element.user.last_name.toLowerCase()}`;
        const searchedValueText = searchedValue.toLowerCase().trim();

        return dataText.includes(searchedValueText);
      });
    }
    console.log(filteredData);
    return filteredData;
  },

  // FORMAT HOUR
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

  // FORMAT DATE
  formatDate: (date) => {
    const newDate = new Date(date);

    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;

    return `${day}/${month}/${year}`;
  },

  // FORMAT CURRENCY
  formatCurrency: (number) => {
    number = parseFloat(number);

    let formattedCurrency = new Intl.NumberFormat("en-US");
    return `$${formattedCurrency.format(number)}`;
  },

  // FORMAT INPUT TIMER FOR SECONDS AND MINUTES
  formatTimerInput: (value, prev) => {
    // SET INPUT TO 00 IF IT IS 0
    if (value == 0) value = "00";

    // IF PREV VALUE WAS 0, AND NEW VALUE IS > 0 BUT < 10, ALLOW ONLY 1 DIGIT
    if (prev == "00" && value != 0) {
      if (value < 10) value = value.slice(1, 3);
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
};

export { utils };
