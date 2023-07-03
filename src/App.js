import { BrowserRouter } from "react-router-dom"
import AppRouter from "./AppRouter"
import Navbar from "Components/Navbar.jsx"
import React, { useState, useEffect } from "react"
import Footer from "Components/Footer"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar isDarkMode={isDarkMode} />
        <AppRouter
          toggleDarkMode={toggleDarkMode}
          setIsDarkMode={setIsDarkMode}
          isDarkMode={isDarkMode}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
        <Footer isDarkMode={isDarkMode} />
      </BrowserRouter>
    </>
  )
}

export default App
