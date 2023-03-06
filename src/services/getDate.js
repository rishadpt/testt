export const getDate = (epoch) => {
  if (epoch) {
    const date = new Date(epoch * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDate();
    console.log(date,year,epoch)
    return `${day} ${month}, ${year}`;
  }
};
