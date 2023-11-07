export const calcDateDiff = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - createdDate.getTime();
  const date = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return `${date}`;
};

export const getToday = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const toBeforeString = (date: string) => {
  const diff = (new Date().getTime() - new Date(date).getTime()) / 1000 / 60 / 60 / 24 / 30 / 12;

  if (diff >= 1) {
    return `${diff}년 전`;
  } else if (diff * 12 >= 1) {
    return `${Math.floor(diff * 12)}달 전`;
  } else if (diff * 12 * 30 >= 1) {
    return `${Math.floor(diff * 12 * 30)}일 전`;
  } else if (diff * 12 * 30 * 24 >= 1) {
    return `${Math.floor(diff * 12 * 30 * 24)}시간 전`;
  } else if (diff * 12 * 30 * 24 * 60 >= 1) {
    return `${Math.floor(diff * 12 * 30 * 24 * 60)}분 전`;
  } else if (diff * 12 * 30 * 24 * 60 * 60 >= 1) {
    return `${Math.floor(diff * 12 * 30 * 24 * 60 * 60)} 초 전`;
  }
  return '';
};

export const getMonthDate = (date: string) => {
  const then = new Date(date);
  const month = then.getMonth() + 1;
  const day = then.getDate();
  return `${month}. ${day}.`;
};
