import axios from "../axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const settingsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, settings: action.payload }
    case "UPDATE_FIELD":
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.field]: action.payload.value,
        },
      }
    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: action.payload,
      }
    default:
      throw new Error("Invalid action type")
  }
}

export const fetchSettings = async (dispatch) => {
  try {
    await axios.get("settings").then((response) => {
      const { bool, result } = response
      if (bool) {
        dispatch({ type: "FETCH_SUCCESS", payload: result })
      }
    })
  } catch (error) {
    toast.error(error)
  }
}

export const updateField = (field, value, dispatch) => {
  dispatch({
    type: "UPDATE_FIELD",
    payload: { field, value },
  })
}

export const postSettings = async (settings, dispatch) => {
  try {
    return await axios.post("settings", settings).then((response) => {
      dispatch({ type: "UPDATE_SETTINGS", payload: response.result })
      return response
    })
  } catch (error) {
    toast.error(error)
  }
}
