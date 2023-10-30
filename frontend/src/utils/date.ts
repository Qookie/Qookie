export const calcDateDiff = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - createdDate.getTime();
  const date = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return `${date}`;
};
