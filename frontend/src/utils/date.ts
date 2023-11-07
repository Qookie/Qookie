
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
  const now = new Date();
  const then = new Date(date);
  const diff = (new Date()).getTime() - (new Date(date)).getTime()
  return ""
}

export const getMonthDate = (date: string) => {
  const then = new Date(date);
  const month = then.getMonth()
  const day = then.getDate()
  return `${month}. ${day}.`
}
