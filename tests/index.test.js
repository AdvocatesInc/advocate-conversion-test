import { runConversion } from '../src/js/conversions'
import 'babel-polyfill'

const flushPromises = () => new Promise(setImmediate)

describe('runConversion', () => {
  beforeEach(() => {
    fetch.resetMocks()
    delete window.location
  })

  it('shows success message if status is 200 range', async () => {
    document.body.innerHTML = '<div id="content">Checking...</div>'

    fetch.mockResponseOnce('', { status: 201 })
    window.location = { search: 'advref=abcdef' }
    runConversion()

    await flushPromises()
    const body = document.body.innerHTML
    expect(body).toContain(
      '<div id="content"><span>Conversion completed successfully!</span></div>'
    )
  })

  it('shows error message if status is 400', async () => {
    document.body.innerHTML = '<div id="content">Checking...</div>'

    fetch.mockResponseOnce('', { status: 400 })
    window.location = { search: 'advref=abcdef' }
    runConversion()

    await flushPromises()
    const body = document.body.innerHTML
    expect(body).toContain(
      `<div id="content"><span>
        There was an issue posting this conversion to the
        Advocate API. This is likely, although exclusively,
        due to the source not matching one on an active
        Tracking Link.
      </span></div>`
    )
  })

  it('shows an error message when no source', () => {
    document.body.innerHTML = '<div id="content">Checking...</div>'

    window.location = { search: 'foo=bar' }
    runConversion()

    const body = document.body.innerHTML
    expect(body).toContain(
      `<div id="content"><span>
        No valid source detected. A valid conversion should
        include a link source in the 'advref' query paramter.
      </span></div>`
    )
  })
})
