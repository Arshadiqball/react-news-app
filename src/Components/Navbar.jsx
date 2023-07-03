import React, { useEffect, useRef, useState, useReducer } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { authReducer, signout } from "./../reducers/authReducer"
import "./../Pages/Home.css"

const Navbar = ({ isDarkMode }) => {
  const user = localStorage.getItem("accessToken")
  const collapseRef = useRef(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [state, dispatch] = useReducer(authReducer, {})
  const [isExpanded, setIsExpanded] = useState(false)
  const navigate = useNavigate()

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMenu = () => {
    setIsExpanded(!isExpanded)
  }

  const signoutHandler = async () => {
    try {
      const response = await signout(dispatch)
      const { bool, result } = response
      if (bool) {
        localStorage.removeItem("settings")
        localStorage.removeItem("user")
        localStorage.removeItem("accessToken")

        toast.success(result)
        navigate("/login")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (collapseRef.current && !collapseRef.current.contains(event.target)) {
  //       const isMenuItem = event.target.closest(".menu-items")
  //       if (!isMenuItem) {
  //         setIsExpanded(false)
  //       }
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside)

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside)
  //   }
  // }, [])

  return (
    <nav className="navbar navbar-expand-lg borderChange">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand">
          <div
            className="logo-container"
            style={{
              backgroundImage: `url(${
                isDarkMode
                  ? `${process.env.PUBLIC_URL}/Thenews-logo-dark.png`
                  : `${process.env.PUBLIC_URL}/Thenews-logo.svg`
              })`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100px",
              height: "50px",
            }}
          />
        </Link>
        <div className="d-flex align-items-center">
          <button
            className="navbar-toggler"
            style={{ marginRight: "10px" }}
            type="button"
            onClick={toggleCollapse}
          >
            <i className="fas fa-bars"></i>
          </button>

          {user ? (
            <nav className="d-lg-none">
              {/* Icon to toggle menu */}
              <button
                className="menu-icon"
                onClick={toggleMenu}
                style={{ borderRadius: "50%", width: "40px", height: "40px" }}
              >
                <i className="fas fa-user"></i>
              </button>

              {/* Menu items */}
              {isExpanded && (
                <div
                  className="menu-items-container"
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: "0",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    zIndex: "10",
                  }}
                >
                  <div className="d-lg-none align-items-center">
                    <Link
                      className="nav-link"
                      style={{ padding: "5px" }}
                      to="/settings"
                    >
                      Settings
                    </Link>
                    <Link
                      className="nav-link d-lg-none"
                      style={{ padding: "10px" }}
                      onClick={signoutHandler}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </nav>
          ) : (
            <div className="d-lg-none align-items-center">
              <Link className="nav-link" style={{ padding: "5px" }} to="/login">
                Login
              </Link>
              <Link
                className="nav-link"
                style={{ paddingBottom: "5px" }}
                to="/register"
              >
                Register
              </Link>
            </div>
          )}
        </div>
        <div
          className={`collapse navbar-collapse ${isCollapsed ? "show" : ""}`}
          style={{ borderTop: isCollapsed ? "1px solid black" : "" }}
          ref={collapseRef}
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Latest News
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-none d-lg-block">
          {user ? (
            <nav>
              {/* Icon to toggle menu */}
              <button
                className="menu-icon"
                onClick={toggleMenu}
                style={{ borderRadius: "50%", width: "40px", height: "40px" }}
              >
                <i className="fas fa-user"></i>
              </button>

              {/* Menu items */}
              {isExpanded && (
                <div
                  className="menu-items-container"
                  style={{ position: "relative" }}
                >
                  <div
                    className="menu-items"
                    style={{
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      zIndex: "100",
                      position: "absolute",
                      top: "100%",
                      right: "0",
                      padding: "10px",
                    }}
                  >
                    <div className="align-items-center">
                      <Link
                        className="nav-link"
                        style={{ padding: "5px" }}
                        to="/settings"
                      >
                        Settings
                      </Link>
                      <Link
                        className="nav-link"
                        style={{ padding: "10px" }}
                        onClick={signoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                    <div className="d-lg-none align-items-center">
                      <Link
                        className="nav-link"
                        style={{ padding: "5px" }}
                        to="/login"
                      >
                        Login
                      </Link>
                      <Link
                        className="nav-link"
                        style={{ paddingBottom: "5px" }}
                        to="/register"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </nav>
          ) : (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Link className="nav-link" style={{ padding: "5px" }} to="/login">
                Login
              </Link>
              <Link
                className="nav-link"
                style={{ padding: "5px" }}
                to="/register"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
