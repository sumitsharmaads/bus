export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const nameRegex = /^[A-Za-z]+([-' ]?[A-Za-z]+)*$/;
export const phoneRegex = /^\d{10}$/;
export const inputDateRegex = /^\d{4}-\d{2}-\d{2}$/;
export const inputDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/;

export const getTodayDateTime = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const parseExpirationToken = (expiration: string): number => {
  const unit = expiration.slice(-1);
  const value = parseInt(expiration.slice(0, -1), 10);
  switch (unit) {
    case "s":
      return value * 1000;
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    default:
      throw new Error("Invalid expiration format");
  }
};

export const getTourDayNight = (
  startDate: string | Date,
  endDate: string | Date
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
    return { days: 0, nights: 0, label: "Invalid date range" };
  }

  // Count distinct calendar days
  const startDay = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  const msInDay = 1000 * 60 * 60 * 24;
  const diffDays =
    Math.floor((endDay.getTime() - startDay.getTime()) / msInDay) + 1;

  const nights = diffDays - 1;

  return {
    days: diffDays,
    nights,
    label: `${diffDays} Day${diffDays > 1 ? "s" : ""} / ${nights} Night${
      nights > 1 ? "s" : ""
    }`,
  };
};
