import { Moment } from 'moment';

export const calcDateDiff = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - createdDate.getTime();
  const date = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return `${date}`;
};

export const convertDate = (date: string) => {
  const createdDate = new Date(date);
  const year = createdDate.getFullYear();
  const month = (createdDate.getMonth() + 1).toString().padStart(2, '0');
  const day = createdDate.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const getToday = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const toBeforeString = (date: string) => {
  const seconds = (new Date().getTime() - new Date(date).getTime()) / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / 30;
  const years = months / 12;

  if (years >= 1) {
    return `${years}년 전`;
  } else if (months >= 1) {
    return `${Math.floor(months)}달 전`;
  } else if (days >= 1) {
    return `${Math.floor(days)}일 전`;
  } else if (hours >= 1) {
    return `${Math.floor(hours)}시간 전`;
  } else if (minutes >= 1) {
    return `${Math.floor(minutes)}분 전`;
  } else if (seconds >= 1) {
    return `${Math.floor(seconds)} 초 전`;
  }
  return '';
};

export const getMonthDate = (date: string) => {
  const then = new Date(date);
  const month = then.getMonth() + 1;
  const day = then.getDate();
  return `${month}. ${day}.`;
};

const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

export const formatMoment = (moment: Moment) => {
  const year = moment.year();
  const month = (moment.month() + 1).toString().padStart(2, '0');
  const date = moment.date().toString().padStart(2, '0');
  const day = days[moment.day()];

  return `${year}-${month}-${date} ${day}`;
};
