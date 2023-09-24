function formatDate(date) {
  const formattedDate = new Date(date).toLocaleString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedDate;
}
module.exports = formatDate;
