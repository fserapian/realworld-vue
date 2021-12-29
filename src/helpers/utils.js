export const range = (num, start) => {
  return [...Array(num).keys()].map((el) => el + start);
};
