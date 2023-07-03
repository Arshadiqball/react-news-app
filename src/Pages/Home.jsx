import React, { useState, useEffect, useRef, useReducer } from "react"
import {
  fetchSources,
  fetchCategories,
  fetchArticles,
} from "../actions/homeActions"
import { homeReducer } from "../reducers/homeReducer"
import "./Home.css"

const Home = ({ setIsLoading, isLoading, isDarkMode }) => {
  const apiSource = localStorage.getItem("apisource") ?? 'newsapi'
  const [searchKeyword, setSearchKeyword] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const [preferredSources, setPreferredSources] = useState("")
  const [isDisabled, setIsDisabled] = useState("disabled")
  const isFirstRender = useRef(true)

  const [state, dispatch] = useReducer(homeReducer, {
    sources: [],
    categories: [],
    articles: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      if (apiSource === "nyt" || apiSource === "newsapi") {
        await Promise.all([
          fetchSources(apiSource, dispatch),
          fetchCategories(apiSource, dispatch),
          fetchArticles(
            searchKeyword,
            filterCategory,
            preferredSources,
            filterDate,
            dispatch,
            setIsLoading
          ),
          setIsDisabled(""),
        ])
      } else {
        setIsDisabled("disabled")
      }
    }

    if (isFirstRender.current) {
      isFirstRender.current = false
      fetchData()
    }
  }, [])

  useEffect(() => {
    if (
      searchKeyword ||
      filterCategory ||
      filterDate ||
      preferredSources.length > 0
    ) {
      fetchArticles(
        searchKeyword,
        filterCategory,
        preferredSources,
        filterDate,
        dispatch,
        setIsLoading
      )
    }
  }, [filterCategory, filterDate, preferredSources])

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value)
  }

  const handleSourceChange = (e) => {
    setPreferredSources(e.target.value)
  }

  const handleDateChange = (e) => {
    setFilterDate(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchArticles(
      searchKeyword,
      filterCategory,
      preferredSources,
      filterDate,
      dispatch,
      setIsLoading
    )
  }

  return (
    <div className={"container pb-5"}>
    <br />
    <form className="search-form">
      <div className="row">
        <div className="col-sm-12 col-md-2 mt-1">
          <label>Search: </label>
        </div>
        <div className="col-10 col-xs-10 col-sm-10 col-md-9 mb-3">
          <input
            className="search-input"
            type="text"
            value={searchKeyword}
            onChange={handleSearch}
            disabled={isDisabled ? "disabled" : undefined}
            placeholder="Enter keywords to search articles"
          />
        </div>
        <div className="col-2 col-xs-2 col-sm-2 col-md-1 mt-1">
          <button
            className="btn btn-default button-theme"
            onClick={handleSubmit}
          >
            {" "}
            <i className="fas fa-search"></i>{" "}
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-2 mt-1">
          <label>Filter: </label>
        </div>
        <div className="col-sm-12 col-md-3 mb-3">
          <select
            className="category-select"
            value={filterCategory}
            onChange={handleCategoryChange}
            disabled={isDisabled ? "disabled" : undefined}
          >
            <option value="">All Categories</option>
            {state.categories.map((category, index) =>
              apiSource === "newsapi" ? (
                <option key={index} value={category.value}>
                  {category.label}
                </option>
              ) : (
                <option key={category.value} value={category.value}>
                  {category.value}
                </option>
              )
            )}
          </select>
        </div>
        <div className="col-sm-12 col-md-3 mb-3">
          <select
            className="category-select"
            value={preferredSources}
            onChange={handleSourceChange}
            disabled={isDisabled ? "disabled" : undefined}
          >
            <option value="">All Sources</option>
            {state.sources.map((source, index) =>
              apiSource === "newsapi" ? (
                <option key={index} value={source.value}>
                  {source.label}
                </option>
              ) : (
                <option key={index} value={source.value}>
                  {source.value}
                </option>
              ) 
            )}
          </select>
        </div>
        <div className="col-sm-12 col-md-4 mb-3">
          <input
            className="date-input"
            type="date"
            value={filterDate}
            onChange={handleDateChange}
            disabled={isDisabled ? "disabled" : undefined}
          />
        </div>
      </div>
    </form>
      {isLoading ?
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        :
        state.articles ? (
          <>
            <div className="row">
              {apiSource === "newsapi"
                ? state.articles.map((article, index) => (
                    <div key={index} className="col-md-4 mb-4">
                      <div className="card shadow">
                        {article.urlToImage ? (
                          <img
                            src={article.urlToImage}
                            className="card-img-top image-size"
                            alt={article.title}
                          />
                        ) : 
                        <img
                          src={"https://engineering.ucdavis.edu/sites/g/files/dgvnsk2151/files/styles/sf_landscape_16x9/public/media/images/413f7eda-5991-660f-a0e9-36d5a7ee2754.png?h=e1043f6d&itok=0jrdgkk5"}
                          className="card-img-top image-size"
                          alt={article.title}
                        />}
                        <div className="card-body">
                          <div className="text-center">
                            <h4 className="card-title">
                              <b>{article.title?.slice(0, 23)}</b>
                            </h4>
                            <a href={article.url} className="btn"
                            style={{ border: `${isDarkMode ? "1px solid white" : "1px solid black"}`, color: `${isDarkMode ? 'white' : 'black'}` }}>
                              Read More
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : state.articles.map((article, index) => (
                    <div key={index} className="col-md-4 mb-4">
                      <div className="card shadow">
                        {article.multimedia?.length > 0 ? (
                          <img
                            src={
                              "https://www.nytimes.com/" +
                              article.multimedia[0].legacy?.xlarge
                            }
                            className="card-img-top image-size"
                            alt={article.headline?.main?.slice(0, 23)}
                          />
                        ): 
                        <img
                          src={"https://engineering.ucdavis.edu/sites/g/files/dgvnsk2151/files/styles/sf_landscape_16x9/public/media/images/413f7eda-5991-660f-a0e9-36d5a7ee2754.png?h=e1043f6d&itok=0jrdgkk5"}
                          className="card-img-top image-size"
                          alt={article.title}
                        />}
                        <div className="card-body">
                          <div className="text-center">
                            <h4 className="card-title">
                              <b>{article?.headline?.main?.slice(0, 23)}</b>
                            </h4>
                            <a href={article?.web_url} className="btn"
                            style={{ border: `${isDarkMode ? "1px solid white" : "1px solid black"}`, color: `${isDarkMode ? 'white' : 'black'}` }}>
                              Read More
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </>
        ) : (
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <h1 className="title text-danger">
                Please Select API Source From Settings
              </h1>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Home
