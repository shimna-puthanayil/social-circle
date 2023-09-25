//function to format date which is used to format fields in Thought model and Reaction schema

//Format e.g- September 25, 2023 at 1:51 PM

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
