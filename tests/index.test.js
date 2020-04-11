import { CONTENT_ID } from '../src/js/utils'
import { setCookie, clearCookie } from '../src/js/cookies'
import { startConversion, finishConversion, ADVOCATE_COOKIE_NAME } from '../src/js/conversion'
import 'babel-polyfill'

const flushPromises = () => new Promise(setImmediate)


describe('startConversion', () => {
  beforeEach(() => {
    delete window.location
    clearCookie(ADVOCATE_COOKIE_NAME)
  })

  it('shows an error message when no source', () => {
    document.body.innerHTML = `<div id="${CONTENT_ID}">Checking...</div>`

    window.location = { search: 'foo=bar' }
    startConversion()

    const body = document.body.innerHTML
    expect(body).toContain(
      `<div id="content"><span>
        No valid source detected. A valid conversion should
        include a link source in the 'advref' query parameter.
      </span></div>`
    )
  })
})


describe('finishConversion', () => {
  beforeEach(() => {
    fetch.resetMocks()
    clearCookie(ADVOCATE_COOKIE_NAME)
  })

  it('shows success message if status is 200 range', async () => {
    document.body.innerHTML = `<div id="${CONTENT_ID}">Checking...</div>`

    fetch.mockResponseOnce('', { status: 201 })
    setCookie(ADVOCATE_COOKIE_NAME, 'abcdef')
    finishConversion()

    await flushPromises()
    const body = document.body.innerHTML
    expect(body).toContain(
      '<div id="content"><span>I\'m Converted!</span></div>'
    )
  })

  it('shows error message if status is 400', async () => {
    document.body.innerHTML = `<div id="${CONTENT_ID}">Checking...</div>`

    fetch.mockResponseOnce('', { status: 400 })
    setCookie(ADVOCATE_COOKIE_NAME, 'abcdef')
    finishConversion()

    await flushPromises()
    const body = document.body.innerHTML
    expect(body).toContain(
      `<div id="content"><span>
        There was an issue posting this conversion to the
        Advocate API. This is likely, although not exclusively,
        due to the source not matching one on an active
        Tracking Link.
      </span></div>`
    )
  })
})
