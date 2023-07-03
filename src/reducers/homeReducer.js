export const homeReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SOURCES":
      return { ...state, sources: action.payload }
    case "FETCH_CATEGORIES":
      return { ...state, categories: action.payload }
    case "FETCH_AUTHORS":
      return { ...state, authors: action.payload }
    case "FETCH_ARTICLES":
      return { ...state, articles: action.payload }
    default:
      throw new Error("Invalid action type")
  }
}
