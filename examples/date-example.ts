// Date handling example
import {
  isValidDate,
  addDays,
  addMonths,
  differenceInDays,
  isSameDay,
} from "@mwakidenis/logx";

const start = new Date(2024, 0, 1);
console.log(isValidDate(start)); // true

const later = addDays(start, 10);
console.log(later.getDate()); // 11

const nextMonth = addMonths(start, 1);
console.log(nextMonth.getMonth()); // 1 (February)

console.log(differenceInDays(start, later)); // 10
console.log(isSameDay(start, start)); // true
