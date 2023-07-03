import { Navigate } from "react-router-dom"
function Protected({ children }) {
  if (localStorage.getItem("accessToken") !== null) {
    return <Navigate to="/" replace />
  }
  return children
}
export default Protected
