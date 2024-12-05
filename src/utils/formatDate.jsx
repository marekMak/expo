const formatDate = (dateExpense) => {
  const date = new Date(dateExpense);
  return date.toLocaleString('sk-SK', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default formatDate;
