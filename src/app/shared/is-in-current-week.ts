export const isInCurrentWeek = (date: Date) => {
  const currentDate = new Date();
  const currentWeekStart = new Date(currentDate);
  currentWeekStart.setHours(0, 0, 0, 0);
  currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay());

  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 7);
  return date >= currentWeekStart && date <= currentWeekEnd;
};
