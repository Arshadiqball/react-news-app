import axios from "./../axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export async function registers(data, navigate) {
  try {
    const response = await axios.post("register", data)
    const { bool, result, message } = response
    if (bool) {
      const { token } = result

      localStorage.setItem("settings", JSON.stringify(result))
      localStorage.setItem("accessToken", token)

      toast.success(message)
      navigate("/")
    }else{
      toast.error(message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}
