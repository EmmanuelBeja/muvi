import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combines class names using clsx and merges Tailwind classes to avoid conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats a number into a readable string with suffixes (K, M, B, T)
export function formatNumber(num: number) {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(1).replace(/\.0$/, '') + 'T'; // Trillions
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B'; // Billions
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'; // Millions
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'; // Thousands
  }
  return num.toString();
}

// Converts movie duration in minutes to a formatted string (e.g., "2h 15m")
export function formatMovieDuration(minutes: number) {
  const hrs = Math.floor(minutes / 60); // Calculate hours
  const mins = minutes % 60; // Calculate remaining minutes

  if (hrs > 0 && mins > 0) {
    return `${hrs}h ${mins}m`;
  } else if (hrs > 0) {
    return `${hrs}h`;
  } else {
    return `${mins}m`;
  }
}
