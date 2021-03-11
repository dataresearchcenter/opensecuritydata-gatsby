// have it as singleton available across the page

const SearchStore = {
  currentPromise: false,
}

SearchStore.init = urls => {
  SearchStore.urls = urls
}

SearchStore.data = async () => {
  if (!SearchStore.currentPromise) {
    const { publicIndexURL, publicStoreURL } = SearchStore.urls
    const [indexRes, storeRes] = await Promise.all([
      fetch(publicIndexURL),
      fetch(publicStoreURL),
    ])
    SearchStore.currentPromise = Promise.all([
      await indexRes.text(),
      await storeRes.json(),
    ])
  }
  return SearchStore.currentPromise
}

export default SearchStore
