import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Route, Routes, useNavigate } from "react-router-dom"
import Protected from "Components/Protected"
import ProtectedLogin from "Components/ProtectedLogin"
import Home from "Pages/Home"
import Login from "Pages/auth/Login"
import Register from "Pages/auth/Register"
import Settings from "Pages/Settings.jsx"

function AppRouter({
  isDarkMode,
  toggleDarkMode,
  setIsDarkMode,
  setIsLoading,
  isLoading
}) {
  const navigate = useNavigate()
  const { i18n } = useTranslation()

  useEffect(() => {
    const checkAuth = async () => {
      const settingsData = localStorage.getItem("settings");
      const { theme, language } = settingsData ? JSON.parse(settingsData) : {};
    
      document.body.classList.toggle("dark-theme", theme === "dark")
      document.body.classList.toggle("light-theme", theme !== "dark")
      setIsDarkMode(theme === "dark")

      i18n.changeLanguage(language)
    }
    return () => {
      if (localStorage.getItem("settings") != null) {
        checkAuth()
      }
    }
  }, [navigate, i18n, setIsDarkMode])

  return (
    <>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home isLoading={isLoading} setIsLoading={setIsLoading} isDarkMode={isDarkMode} />} />
          <Route
            path="/register"
            element={
              <Protected>
                <Register isLoading={isLoading} setIsLoading={setIsLoading} isDarkMode={isDarkMode} />
              </Protected>
            }
          />
          <Route
            path="/login"
            element={
              <Protected>
                <Login isLoading={isLoading} setIsLoading={setIsLoading} isDarkMode={isDarkMode} />
              </Protected>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedLogin>
                <Settings
                  toggleDarkMode={toggleDarkMode}
                  isDarkMode={isDarkMode}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                />
              </ProtectedLogin>
            }
          />
        </Routes>
      </div>
    </>
  )
}

export default AppRouter
