import React from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import "../../Pages/Home.css"
import { registers } from "./../../actions/authActions"

const Register = ({ setIsLoading, isLoading, isDarkMode }) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    await registers(data, navigate).then(() => {
      setIsLoading(false)
    })
  }

  return (
    <>
      <div className="container">
        <div className="login-box shadow p-4">
          <h1 className="title">
            <u>CREATE</u> <u>ACCOUNT</u>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                name="name"
                placeholder="Name"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[^\d]+$/,
                    message: "Numbers are not allowed in the name",
                  },
                })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>


            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                name="email"
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
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
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input
                type="password"
                name="password_confirmation"
                className={`form-control ${
                  errors.password_confirmation ? "is-invalid" : ""
                }`}
                placeholder="Password"
                {...register("password_confirmation", {
                  required: "Confirm Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                })}
              />
              {errors.password_confirmation && (
                <div className="invalid-feedback">
                  {errors.password_confirmation.message}
                </div>
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
                Creating...
              </button>
            ) : (
              <button
                type="submit"
                className="btn"
                style={{ border: `${isDarkMode ? "1px solid white" : "1px solid black"}`, color: `${isDarkMode ? 'white' : 'black'}` }}
                disabled={isLoading}
              >
                Create
              </button>
            )}

            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
