export function getUserDuration(createdAt) {
  const memberSince = new Date(createdAt);
  const currentTime = new Date();

  // Calculate the difference in years, months, and days
  let years = currentTime.getFullYear() - memberSince.getFullYear();
  let months = currentTime.getMonth() - memberSince.getMonth();
  let days = currentTime.getDate() - memberSince.getDate();

  // Adjust months and years if necessary
  if (days < 0) {
    months--;
    // Get the last day of the previous month
    const lastMonth = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      0
    );
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}
