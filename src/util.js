// polyfill
if (!Object.entries) {
  Object.entries = function (obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i) // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]]

    return resArray
  }
}

// FIXME IE url constructor

export function updateLocationParams(data) {
  const url = new URL(window.location)
  Object.entries(data).map(([key, val]) => { // eslint-disable-line
    url.searchParams.set(key, val)
  })
  window.history.pushState({}, "", url)
}

export function getLocationParam(key) {
  const url = new URL(window.location)
  return url.searchParams.get(key)
}
