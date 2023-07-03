import React from "react"
import { useForm } from "react-hook-form"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"
import "./../../Pages/Home.css"
import { login } from "./../../reducers/authReducer"

const Login = ({ setIsLoading, isLoading, isDarkMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setIsLoading(true)
    await login(data).then((result) => {
      if (result !== undefined) {
        setTimeout(() => {
          navigate("/")
        }, 200)
      }
    })
    setIsLoading(false)
  }

  return (
    <div className="container">
      <div className="login-box shadow p-4">
        <h1 className="title">
          <u>LOGIN</u> <u>FORM</u>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="text"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="col d-flex justify-content-end">
            {isLoading ? (
              <button
                type="submit"
                className="btn"
                style={{ border: "1px solid black", position: "relative" }}
                disabled={isLoading}
              >
                Login...
              </button>
            ) : (
              <button
                type="submit"
                className="btn"
                style={{ border: `${isDarkMode ? "1px solid white" : "1px solid black"}`, color: `${isDarkMode ? 'white' : 'black'}` }}
                disabled={isLoading}
              >
                Login
              </button>
            )}

            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
