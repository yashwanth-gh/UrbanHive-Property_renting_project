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

// Utility function to calculate time elapsed
export function formatTimeElapsed(createdAt) {
  const reviewDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDiff = currentDate - reviewDate; // Difference in milliseconds

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}
