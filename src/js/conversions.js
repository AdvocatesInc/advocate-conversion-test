import '../sass/styles.sass'

const conversionsURL = `${PROTOCOL}://${HOST}/v1/conversion/`
const CONTENT_ID = 'content'

const clearContent = () => {
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
  const contentWrapper = document.getElementById('content')
  const textWrapper = document.createElement('span')
  textWrapper.textContent = content

  contentWrapper.appendChild(textWrapper)
}

export const getSource = () => {
  /*
   * Extracts the `advref` query paramter from the URL,
   * if it exists.  This is where the `TrackingLinkSource.source`
   * relevant to the conversion will be stored.
   *
   * In a successful conversion cycle, this value should be POSTed
   * to the `/v1/conversions/` endpoint
   */
  const queryParams = new URLSearchParams(window.location.search)
  return queryParams.get('advref')
}

export const postJSON = (url, json) => fetch(url, {
  method: 'post',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(json),
})

export const handleResponse = (response) => {
  switch (true) {
    case (response.status < 200):
      setContent('How did this even happen?')
      break
    case (response.status < 300):
      setContent('Conversion completed successfully!')
      break
    case (response.status < 400):
      setContent(`
        Apparently the conversions endpoint has been moved?
        Make sure this app is configured witht he proper
        Advocate API URL and conversions endpoint
      `)
      break
    case (response.status === 400):
      setContent(`
        There was an issue posting this conversion to the
        Advocate API. This is likely, although exclusively,
        due to the source not matching one on an active
        Tracking Link.
      `)
      break
    case (response.status < 404):
      setContent(`
        There was an issue posting this conversion to the
        Advocate API. Please report this to a backend
        developer for further investigation
      `)
      break
    case (response.status === 404):
      setContent(`
        Conversions endpoint not found. Make sure this app is
        configured with the proper Advocate API URL and conversions
        endpoint.
      `)
      break
    default:
      setContent(`
        Could not connect to the Advocate API or had an error
        during processing the conversion. Please report this
        to a backend developer for further investigation.
      `)
  }
}

export const runConversion = () => {
  /*
   * Main entry point for the app.
   */
  const source = getSource()

  if (!source) {
    setContent(`
        No valid source detected. A valid conversion should
        include a link source in the 'advref' query paramter.
      `)
  } else {
    postJSON(conversionsURL, { source }).then(
      response => handleResponse(response)
    ).catch(
      error => setContent(error)
    )
  }
}
