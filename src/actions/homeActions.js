import axios from "./../axios"
import { toast } from "react-toastify"


const API_KEY_NEWSAPI_SOURCE = process.env.REACT_APP_NEWS_API_SOURCE
const API_KEY_NEWSAPI = process.env.REACT_APP_NEWS_API_TOKEN
const API_KEY_NYT = process.env.REACT_APP_NEW_YORK_API_TOKEN
const API_URL_NEWSAPI = process.env.REACT_APP_NEWS_API
const API_URL_NYT = process.env.REACT_APP_NEW_YORK_API
const API_URL_NYT_SOURCE = process.env.REACT_APP_NEW_YORK_API_SOURCE_LIST

export const fetchSources = async (apiSource, dispatch) => {
  try {
    if (apiSource === "newsapi") {
      const response = await axios.get(`${API_KEY_NEWSAPI_SOURCE}`, {
        params: {
          apiKey: API_KEY_NEWSAPI,
          language: "en"
        },
      })
      const filteredSources = response.sources.map((keyword) => ({
        value: keyword.country,
        label: keyword.name,
      }))
      dispatch({ type: "FETCH_SOURCES", payload: filteredSources })
    } else if (apiSource === "nyt") {
      try {
        const response = await fetch(`${API_URL_NYT}?api-key=${API_KEY_NYT}`)
        const data = await response.json()
        const filteredSources = [
          ...new Set(
            data.response.docs.flatMap((result) =>
              result.keywords
                .filter((keyword) => keyword.name === "glocations")
                .map((keyword) => ({
                  value: keyword.value,
                  label: keyword.value,
                }))
            )
          ),
        ]

        dispatch({ type: "FETCH_SOURCES", payload: filteredSources })
      } catch (error) {
        toast.error(error)
      }
    }
  } catch (error) {
    toast.error(error)
  }
}

export const fetchCategories = async (apiSource, dispatch) => {
  try {
    if (apiSource === "newsapi") {
      const response = await axios.get(
        `${process.env.REACT_APP_NEWS_API_CATEGORY}`,
        {
          params: {
            apiKey: API_KEY_NEWSAPI,
          },
        }
      )
      const sources = response.sources

      const categories = sources.reduce((uniqueCategories, source) => {
        const foundCategory = uniqueCategories.find(
          (category) => category.value === source.category
        )

        if (!foundCategory) {
          uniqueCategories.push({
            value: source.category,
            label: source.category,
          })
        }

        return uniqueCategories
      }, [])

      dispatch({ type: "FETCH_CATEGORIES", payload: categories })
    } else if (apiSource === "nyt") {
      try {
        const response = await fetch(
          `${API_URL_NYT_SOURCE}?api-key=${API_KEY_NYT}`
        )
        const data = await response.json()
        const categories = data.results.map((keyword) => ({
          value: keyword.section,
          label: keyword.display_name,
        }))

        dispatch({ type: "FETCH_CATEGORIES", payload: categories })
      } catch (error) {
        toast.error(error)
      }
    }
  } catch (error) {
    toast.error(error)
  }
}

export const fetchAuthors = async (apiSource, dispatch) => {
  try {
    if (apiSource === "newsapi") {
      const response = await axios.get(API_URL_NEWSAPI, {
        params: {
          apiKey: API_KEY_NEWSAPI,
          language: "en",
        },
      })
      const filteredArticles = response.articles
        .filter((article) => article.author && article.author.trim() !== "")
        .map((article) => ({
          value: article.author,
          label: article.author,
        }))

      dispatch({
        type: "FETCH_AUTHORS",
        payload: filteredArticles,
      })
    } else if (apiSource === "nyt") {
      try {
        const response = await fetch(`${API_URL_NYT}?api-key=${API_KEY_NYT}`)
        const data = await response.json()
        const filteredArticles = [
          ...new Set(
            data.response.docs.flatMap((result) =>
              result.byline.person
                .map((keyword) => ({
                  value: keyword.firstname,
                  label: keyword.firstname,
                }))
            )
          ),
        ]
        dispatch({
          type: "FETCH_AUTHORS",
          payload: filteredArticles,
        })
      } catch (error) {
        toast.error(error)
      }
    }
  } catch (error) {
    toast.error(error)
  }
}

const filterByDate = (articles, targetDate) => {
  return articles.articles.filter((article) => {
    const articleDate = article.publishedAt.split("T")[0]
    return articleDate === targetDate
  })
}

const filterByDateNYT = (articles, targetDate) => {
  return articles.filter((article) => {
    const articleDate = article.pub_date.split("T")[0]
    return articleDate === targetDate
  })
}

let url = API_URL_NEWSAPI
export const fetchArticles = async (
  searchKeyword,
  filterCategory,
  preferredSources,
  filterDate,
  dispatch,
  setIsLoading
) => {
  setIsLoading(true)
  const searchParams = new URLSearchParams()
  const settingsData = localStorage.getItem("settings")
  const apisource = localStorage.getItem("apisource") ?? 'newsapi';
  const { sources, categories, authors } = settingsData
    ? JSON.parse(settingsData)
    : {}

  try {
    let params = {}
    if (apisource === "nyt") {
      params.apiKey = `${API_KEY_NYT}`
    } else if (apisource === "newsapi") {
      params.apiKey = API_KEY_NEWSAPI
      params.language = "en"
    }
    
    if (!searchKeyword && !preferredSources && !filterCategory && !filterDate) {
      if (authors || categories || sources) {
        if (
          authors?.length > 0 ||
          categories?.length > 0 ||
          sources?.length > 0
        ) {
          if (authors?.length > 0) {
            params.q = "*"
          }
          if (categories?.length > 0) {
            if (apisource === "nyt") {
              let transformedData;
              if (typeof categories === 'string') {
                transformedData = categories
              }else{
                let values = categories.map((item) => item.value)
                transformedData = values.join(",")
                params.category = transformedData
              }
              searchParams.append("fq", `news_desk:(${transformedData})`)
            } else {
              let transformedData;
              if (typeof categories === 'string') {
                transformedData = categories
              }else{
                transformedData = categories[0].value
              }
              params.category = transformedData
            }
          }
          if (sources?.length > 0) {
            if (apisource === "nyt") {
              let transformedData;
              if (typeof sources === 'string') {
                transformedData = sources
              }else{
                let values = sources.map((item) => item.value)
                transformedData = values.join(",")
                params.country = transformedData
              }
              searchParams.append("fq", `glocations:(${transformedData})`)
            } else {
              params.country = sources[0].value
            }
          }

          if (categories?.length > 0 && sources?.length > 0) {
            searchParams.delete("fq")
            const result = categories.map((item) => item.value).join(",")
            searchParams.append(
              "fq",
              `news_desk:(${result}) AND glocations:(${params.country})`
            )
          }
        }
      }
    } else {
      if (searchKeyword) {
        params.q = searchKeyword
        searchParams.append("q", searchKeyword)
      }
      if (preferredSources) {
        params.country = preferredSources
        searchParams.append("fq", `glocations:("${preferredSources}")`)
      }
      if (filterCategory) {
        params.category = filterCategory
        searchParams.append("fq", `news_desk:("${filterCategory}")`)
      }
      if (filterDate) {
        params.fromDate = filterDate
      }

      if (preferredSources && filterCategory) {
        searchParams.delete("fq")
        searchParams.append(
          "fq",
          `news_desk:(${filterCategory}) AND glocations:(${preferredSources})`
        )
      }
    }

    if (apisource === "nyt") {
      if (params.q === "*") {
        delete params.q
        const url = `${API_URL_NYT}?api-key=${params.apiKey}`

        const response = await fetch(url)
        const data = await response.json()
        
        const filteredArticles = data.response.docs.filter((article) => {
          if (Array.isArray(authors)) {
            return authors.some(
              (authorObj) =>
                article?.byline?.person[0]?.firstname === authorObj.value
            );
          } else if (authors.includes(',')) {
            return authors.split(',').some(
              (authorObj) =>
                article?.byline?.person[0]?.firstname === authorObj
            );
          } else {
            return article?.byline?.person[0]?.firstname === authors;
          }
        })

        dispatch({
          type: "FETCH_ARTICLES",
          payload: filteredArticles,
        })
      } else if (params.fromDate) {
        const url = `${API_URL_NYT}?api-key=${params.apiKey}`

        const response = await fetch(url)
        const data = await response.json()

        const articles = data.response.docs
        const filteredArticles = filterByDateNYT(articles, params.fromDate)

        dispatch({
          type: "FETCH_ARTICLES",
          payload: filteredArticles,
        })
      } else {
        const urlJson = API_URL_NYT

        searchParams.append("api-key", params.apiKey)

        const url = `${urlJson}?${searchParams.toString()}`

        const response = await fetch(url)
        const data = await response.json()

        const articles = data.response.docs

        dispatch({
          type: "FETCH_ARTICLES",
          payload: articles,
        })
      }
    } else if (apisource === "newsapi") {

      if (params.q === "*") {
        delete params.q

        const response = await axios.get(url, { params })

        const filteredArticles = response.articles.filter((article) => {

          if (Array.isArray(authors)) {
            return authors.some(
              (authorObj) =>
                article.author === authorObj.value
            );
          } else if (authors.includes(',')) {
            return authors.split(',').some(
              (authorObj) =>
                article?.author === authorObj
            );
          } else {
            return article?.author === authors;
          }
        })

        dispatch({
          type: "FETCH_ARTICLES",
          payload: filteredArticles,
        })
      } else if (params.fromDate) {
        const response = await axios.get(url, { params })
        const filteredArticles = filterByDate(response, params.fromDate)

        dispatch({
          type: "FETCH_ARTICLES",
          payload: filteredArticles,
        })
      } else {
        const response = await axios.get(url, { params })
        dispatch({
          type: "FETCH_ARTICLES",
          payload: response.articles,
        })
      }
    }
  } catch (error) {
    toast.error(error)
  }
  setIsLoading(false)
}
