import { Navigate } from "react-router-dom"
function ProtectedLogin({ children }) {
  if (localStorage.getItem("accessToken") == null) {
    return <Navigate to="/login" replace />
  }
  return children
}
export default ProtectedLogin
