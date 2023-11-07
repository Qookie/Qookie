
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

export const toBeforeString = () => {
  const now = new Date();
}
