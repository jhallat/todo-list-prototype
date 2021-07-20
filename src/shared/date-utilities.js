
const padding = (value) => {
    return `0${value}`.substr(-2);
}

const convertToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${year}${padding(month + 1)}${padding(day)}`;
}

const convertYYYYMMDDtoDate = (value) => {
    if (value.length != 8) {
        return null;
    }
    const year = parseInt(value.substr(0, 4));
    const month = parseInt(value.substr(4, 2)) - 1;
    const day = parseInt(value.substr(6, 2));
    const date = new Date();
    date.setFullYear(year, month, day);
    return date;
}

const getAbrrDayName = (date) => {
    if (date === null || date === undefined) {
        return "";
    }
    const day = date.getDay();
    switch(day) {
        case 0:
            return "SUN";
        case 1:
            return "MON";
        case 2:
            return "TUE";
        case 3:
            return "WED";
        case 4:
            return "THU";
        case 5:
            return "FRI";
        case 6:
            return "SAT";
    }
    return "";
}

const addDays = (date, days) => {
   const newDate = new Date();
   newDate.setTime(date.getTime() + days * 24 * 3600000);
   return newDate;
}

export const dateUtilities = {
    convertToYYYYMMDD,
    convertYYYYMMDDtoDate,
    addDays,
    getAbrrDayName
}
