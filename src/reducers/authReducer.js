import axios from "../axios"
import { toast } from "react-toastify"

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNOUT":
      return {
        ...state,
        user: null,
      }
    case "LOGIN":
      return {
        ...state,
        user: action.payload, // or however you need to update the state
      }
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
      }
    default:
      throw new Error()
  }
}

export const signout = async (dispatch) => {
  try {
    const response = await axios.post("logout")
    const { bool } = response
    if (bool) {
      dispatch({ type: "SIGNOUT" })
    }
    return response
  } catch (error) {
    console.error(error)
  }
}

export const login = async (data) => {
  try {
    const response = await axios.post("login", data)
    const { bool, result } = response
    if (bool) {
      const { token } = result

      localStorage.setItem("settings", JSON.stringify(result))
      localStorage.setItem("accessToken", token)

      toast.success("Login successful")
      return result
    }
  } catch (error) {
    if (!error.bool) {
      toast.error(error.message)
    }
  }
}
