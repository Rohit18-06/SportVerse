/**
 * Date formatting utilities that produce consistent output
 * to avoid hydration mismatches between server and client
 */

/**
 * Format time as HH:MM (24-hour format)
 * Consistent across server and client
 */
export function formatTime(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

/**
 * Format date as MMM D (e.g., "Jul 6")
 * Consistent across server and client
 */
export function formatDate(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[date.getMonth()]} ${date.getDate()}`
}

/**
 * Format date and time as "MMM D, YYYY HH:MM"
 * Consistent across server and client
 */
export function formatDateTime(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const year = date.getFullYear()
  const month = months[date.getMonth()]
  const day = date.getDate()
  const time = formatTime(date)
  return `${month} ${day}, ${year} ${time}`
}

/**
 * Format full date with weekday as "Fri, Jul 6, 2026"
 * Consistent across server and client
 */
export function formatFullDate(date: Date): string {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const weekday = weekdays[date.getDay()]
  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  return `${weekday}, ${month} ${day}, ${year}`
}
