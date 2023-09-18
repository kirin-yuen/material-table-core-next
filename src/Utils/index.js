export const capitalizeStrBySplit = (str, separator = '-') => {
  const textArr = str.split(separator);

  return textArr
    .map((item) => item.replace(/^(\S)/g, (match, p1) => p1.toUpperCase()))
    .join(' ');
};
