export const CONTENT_ID = 'content'


export const clearContent = () => {
  /*
   * Empties the main content wrapper
   */
  document.getElementById(CONTENT_ID).innerHTML = ''
}


export const setContent = (content) => {
  /*
   * Loads the message text `content` into the main content wrapper.  Used for
   * any content, including success and error messages
   */
  clearContent()
  const contentWrapper = document.getElementById(CONTENT_ID)
  const textWrapper = document.createElement('span')
  textWrapper.textContent = content

  contentWrapper.appendChild(textWrapper)
}


export const createLink = (text, destination) => {
  /*
   * To simulate a conversion event, after the `advref` is stored
   * in a cookie, we'll create a link to the `/conversion/`
   * page, which would simulate completing some action on the client
   * site (e.g. signing up for a service, making a purchase).
   * Clicking on that link will finish the conversion process.
   */
  clearContent()
  const contentWrapper = document.getElementById('content')
  const anchor = document.createElement('a')
  anchor.textContent = text
  anchor.setAttribute('href', destination)

  contentWrapper.appendChild(anchor)
}
