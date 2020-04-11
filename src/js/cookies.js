/* eslint-disable consistent-return */
export const clearCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}


export const setCookie = (name, value) => {
  document.cookie = `${name}=${value}`
}


// Extracts a cookie by name, taken from:
// https://stackoverflow.com/a/21125098/3362468
export const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  if (match) return match[2]
}
