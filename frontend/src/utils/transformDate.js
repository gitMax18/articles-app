export const transformDate = (mongoDate) => {
  const date = new Date(Date.parse(mongoDate));

  const day = date.getDate().toString().padStart(2, 0);
  const month = (date.getMonth() + 1).toString().padStart(2, 0);
  const years = date.getFullYear().toString();

  return `${day}/${month}/${years}`;
};
