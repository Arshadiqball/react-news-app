import React from "react"

const Footer = ({ isDarkMode }) => {
  return (
    <footer
      style={{
        backgroundColor: isDarkMode ? "#000" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        zIndex: "9999",
        borderTop: isDarkMode ? "1px solid white" : "1px solid black",
      }}
    >
      <div>© 2023 Copy right CC</div>
    </footer>
  )
}

export default Footer
