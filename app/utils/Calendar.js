import moment from 'moment';
import { Moment } from 'moment';
import momentLocale from 'moment/locale/zh-cn';

moment.updateLocale('zh-cn', momentLocale);

const showYear = moment().year();
const showMonth = moment().month();

const weeksCalendar: Array<{
  days: Array<{
    number: number,
    isLastMonth: boolean,
    isNextMonth: boolean,
    isPastDay: boolean,
    isToday: boolean,
    title: string,
    date: Moment,

    data: any
  }>
}> = [];

const listOfWeekName: Array<string> = [];

const buildCalendar = (year = showYear, month = showMonth) => {
  const date = moment()
    .year(year)
    .month(month);
  const listOfWeekName = moment.weekdaysMin();
  const weeksCalendar = buildMonth(date);

  return { weeksCalendar, listOfWeekName };
};

const buildMonth = (date: Moment) => {
  const weeks = [];
  const dateWithoutTime = removeTime(date);
  const start = dateWithoutTime
    .clone()
    .date(1)
    .day(0);
  const month = dateWithoutTime.clone();

  const d = start.clone();
  let done = false;
  let count = 0;

  while (!done) {
    weeks.push({
      days: buildWeeks(d.clone(), month)
    });
    d.add(1, 'w');
    done = ++count > 4;
  }

  return weeks;
};

const buildWeeks = (date: Moment, month: Moment) => {
  // console.log('date', date);
  // return;
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push({
      number: date.date(),
      isLastMonth: date.month() < month.month(),
      isNextMonth: date.month() > month.month(),
      isPastDay: date.isBefore(new Date(), 'day'),
      isToday: date.isSame(new Date(), 'day'),
      title: date.format('YYYY-MM-DD'),
      date: date,
      data: null
    });
    date = date.clone();
    date.add(1, 'd');
  }
  return days;
};

const removeTime = (date: Moment) => {
  return date
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0);
};

export default {
  buildCalendar
};
