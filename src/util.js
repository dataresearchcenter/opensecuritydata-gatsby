import slugify from "slugify"

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
  if (typeof window !== `undefined`) {
    const url = new URL(window.location)
    for (const [key, val] of Object.entries(data)) {
      !!val ? url.searchParams.set(key, val) : url.searchParams.delete(key)
    }
    window.history.replaceState({}, "", url)
  }
}

export function getLocationParam(key) {
  if (typeof window !== `undefined`) {
    const url = new URL(window.location)
    return url.searchParams.get(key)
  }
}

export function setHashValue(key, value) {
  if (typeof window !== `undefined`) {
    window.location.hash = `${key}=${value}`
  }
}

export function getHashValue(key) {
  if (typeof window !== `undefined`) {
    return window.location.hash.split(`#${key}=`).slice(1)[0]
  }
}

export function pathSlugify(path) {
  return path
    .split("/")
    .map(p => slugify(p))
    .join("/")
}

export function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// DATA
export function filterByScope(items, scope) {
  const scopes = {
    military: ["PADR", "EDIDP", "EDF"],
    nonMilitary: [
      "FP7 Security",
      "Horizon 2020",
      "Horizon Europe",
      "Internal Security Fund",
    ],
  }
  if (!scope) return items
  return items.filter(i => scopes[scope].indexOf(i.program) > -1)
}
