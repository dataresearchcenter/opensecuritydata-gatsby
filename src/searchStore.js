// have it as singleton available across the page

const SearchStore = {
  initialized: false,
}

SearchStore.init = urls => {
  SearchStore.urls = urls
}

SearchStore.data = async () => {
  if (!SearchStore.initialized) {
    const { publicIndexURL, publicStoreURL } = SearchStore.urls
    SearchStore.initialized = true
    const [indexRes, storeRes] = await Promise.all([
      fetch(publicIndexURL),
      fetch(publicStoreURL),
    ])
    SearchStore._index = await indexRes.text()
    SearchStore._store = await storeRes.json()
  }
  return Promise.all([SearchStore._index, SearchStore._store])
}

export default SearchStore
