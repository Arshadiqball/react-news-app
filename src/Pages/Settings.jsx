import React, { useEffect, useReducer, useRef, useState } from "react"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./Home.css"
import { useTranslation } from "react-i18next"
import {
  settingsReducer,
  fetchSettings,
  updateField,
  postSettings,
} from "./../reducers/settingsReducer.js"
import {
  fetchSources,
  fetchCategories,
  fetchAuthors,
} from "../actions/homeActions"
import { homeReducer } from "../reducers/homeReducer"
import Select from "react-select"

const Settings = ({ isDarkMode, toggleDarkMode, setIsLoading, isLoading }) => {
  const [selectedOptionsSource, setSelectedOptionsSource] = useState([])
  const [selectedOptionsCategory, setSelectedOptionsCategory] = useState([])
  const [selectedOptionsAuthor, setSelectedOptionsAuthor] = useState([])

  const settingsData = localStorage.getItem("settings")
  const apisource = localStorage.getItem("apisource") ?? "newsapi"
  const { sources, categories, authors } = settingsData
    ? JSON.parse(settingsData)
    : {}

  const { t, i18n } = useTranslation()
  const [state, dispatch] = useReducer(settingsReducer, { settings: {} })
  const [homeState, homeDispatch] = useReducer(homeReducer, {
    sources: [],
    categories: [],
    authors: [],
  })
  const isFirstRender = useRef(true)

  useEffect(() => {
    const fetchData = async () => {
      if (apisource === "nyt" || apisource === "newsapi") {
        await Promise.all([
          fetchSources(apisource, homeDispatch),
          fetchCategories(apisource, homeDispatch),
          fetchAuthors(apisource, homeDispatch),
        ])
      }
    }

    if (isFirstRender.current) {
      isFirstRender.current = false
      fetchData()
      fetchSettings(dispatch)
      let dataSource, dataCategory, source, category, author, dataAuthor
      if (sources != null) {
        if (sources.indexOf(",") !== -1) {
          dataSource = sources.split(",")
          source = dataSource.map((value) => ({ label: value, value }))
        } else {
          if (Array.isArray(sources)) {
            source = sources
          } else {
            source = [{ value: sources, label: sources }]
          }
        }
        setSelectedOptionsSource(source)
      }
      if (categories != null) {
        if (categories.indexOf(",") !== -1) {
          dataCategory = categories.split(",")
          category = dataCategory.map((value) => ({ label: value, value }))
        } else {
          if (Array.isArray(categories)) {
            category = categories
          } else {
            category = [{ value: categories, label: categories }]
          }
        }
        setSelectedOptionsCategory(category)
      }
      if (authors != null) {
        if (authors.indexOf(",") !== -1) {
          dataAuthor = authors.split(",")
          author = dataAuthor.map((value) => ({ label: value, value }))
        } else {
          if (Array.isArray(authors)) {
            author = authors
          } else {
            author = [{ value: authors, label: authors }]
          }
        }
        setSelectedOptionsAuthor(author)
      }
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === "checkbox" ? checked : value
    updateField(name, newValue, dispatch)
  }

  const handleSelectChange = (selectedValues) => {
    setSelectedOptionsSource(selectedValues)
  }

  const handleSelectChangeCategory = (selectedValues) => {
    setSelectedOptionsCategory(selectedValues)
  }

  const handleSelectChangeAuthor = (selectedValues) => {
    setSelectedOptionsAuthor(selectedValues)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    let params = state.settings
    params.categories = selectedOptionsCategory
    params.sources = selectedOptionsSource
    params.authors = selectedOptionsAuthor
    await postSettings(params, dispatch).then((response) => {
      const { bool, message } = response
      const { settings } = state

      if (bool) {
        const { theme, language } = settings

        document.body.classList.toggle("dark-theme", theme === "dark")
        document.body.classList.toggle("light-theme", theme === "light")

        if ((theme === "dark") !== isDarkMode) {
          toggleDarkMode()
        }

        i18n.changeLanguage(language)
        localStorage.setItem("settings", JSON.stringify(settings))

        toast.success(message)
        setIsLoading(false)
      }
    })
  }

  const renderSelectOptions = (name, options) => {
    return (
      <Input
        type="select"
        name={name}
        id={name}
        value={state.settings[name] ?? ""}
        onChange={handleInputChange}
      >
        <option value="">
          {t(`settings.select${name.charAt(0).toUpperCase() + name.slice(1)}`)}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Input>
    )
  }

  const themeOptions = [
    { value: "dark", label: "Dark" },
    { value: "light", label: "Light" },
  ]

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
  ]

  return (
    <div className="container">
      <h1 className="title">{t("settings.title")}</h1>
      <hr />
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-12 col-md-4 mb-3">
            <FormGroup>
              <Label for="theme">
                <b>{t("settings.theme")}</b>
              </Label>
              {renderSelectOptions("theme", themeOptions)}
            </FormGroup>
          </div>

          <div className="col-sm-12 col-md-4 mb-3">
            <FormGroup>
              <Label for="language">
                <b>{t("settings.language")}</b>
              </Label>
              {renderSelectOptions("language", languageOptions)}
            </FormGroup>
          </div>

          <div className="col-sm-12 col-md-4 mb-3">
            <FormGroup>
              <Label for="sources">
                <b>{t("settings.sources")}</b>
              </Label>
              <Select
                isMulti
                name={"sources"}
                id={"sources"}
                options={homeState.sources}
                value={selectedOptionsSource}
                onChange={handleSelectChange}
              />
            </FormGroup>
          </div>

          <div className="col-sm-12 col-md-4 mb-3">
            <FormGroup>
              <Label for="categories">
                <b>{t("settings.categories")}</b>
              </Label>
              <Select
                isMulti
                name={"categories"}
                id={"categories"}
                options={homeState.categories}
                value={selectedOptionsCategory}
                onChange={handleSelectChangeCategory}
              />
            </FormGroup>
          </div>

          <div className="col-sm-12 col-md-4 mb-3">
            <FormGroup>
              <Label for="authors">
                <b>{t("settings.authors")}</b>
              </Label>
              <Select
                isMulti
                name={"authors"}
                id={"authors"}
                options={homeState.authors}
                value={selectedOptionsAuthor}
                onChange={handleSelectChangeAuthor}
              />
            </FormGroup>
          </div>

          <div className="col-sm-12 col-md-12 mb-3 pb-5">
            {isLoading ? (
              <button
                type="submit"
                className="btn"
                style={{ border: "1px solid black", position: "relative" }}
                disabled={isLoading}
              >
                Setting...
              </button>
            ) : (
              <Button
                type="submit"
                color="btn"
                style={{
                  border: `${
                    isDarkMode ? "1px solid white" : "1px solid black"
                  }`,
                  color: `${isDarkMode ? "white" : "black"}`,
                }}
              >
                {t("settings.save")}
              </Button>
            )}
          </div>
        </div>
      </Form>
    </div>
  )
}

export default Settings
