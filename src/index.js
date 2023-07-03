import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "bootstrap/dist/css/bootstrap.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { I18nextProvider } from "react-i18next"
import i18n from "i18next"
import enTranslation from "./translations/en.json"
import esTranslation from "./translations/es.json"

i18n.init({
  interpolation: { escapeValue: false },
  lng: "en", // Set the default language
  resources: {
    en: {
      translation: enTranslation, // Assign the translation file for each language
    },
    es: {
      translation: esTranslation,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
    <ToastContainer />
  </React.StrictMode>
)

reportWebVitals()
