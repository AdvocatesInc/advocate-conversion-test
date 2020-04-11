import { getCookie, setCookie } from './cookies'
import { setContent, createLink } from './utils'

export const ADVOCATE_COOKIE_NAME = 'advref'
const conversionsURL = `${PROTOCOL}://${HOST}/v1/register-conversion/`


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


export const startConversion = () => {
  /*
   * Store the advref value in a cookie, so we can access it
   * after a conversion event
   */
  const source = getSource()

  if (!source) {
    setContent(`
        No valid source detected. A valid conversion should
        include a link source in the 'advref' query parameter.
      `)
  } else {
    setCookie(ADVOCATE_COOKIE_NAME, source)
    createLink('Get Converted!', '/conversion')
  }
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
      setContent('I\'m Converted!')
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
        Advocate API. This is likely, although not exclusively,
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


export const finishConversion = () => {
  /*
   * Pull the conversion advref source from the stored cookie,
   * echo it back to the conversion endpoint
   */
  const source = getCookie(ADVOCATE_COOKIE_NAME)

  if (!source) {
    setContent(`
        No matching cookie found. A valid conversion should
        include a link source in the 'advref' cookie.
      `)
  } else {
    postJSON(conversionsURL, { source }).then(
      response => handleResponse(response)
    ).catch(
      error => setContent(error)
    )
  }
}
