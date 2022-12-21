import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
const box = "border p-2 m-2"

export function AuthVerifier() {
  const { user, logOut, logIn } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  console.log(`${new Date().toLocaleTimeString()}`, "- Path Name:", pathname)

  useEffect(() => {
    if (!user && pathname !== "/login") {
      navigate("/login")
    }
    if (user && pathname === "/login") {
      navigate("/")
    }
  }, [pathname, user, navigate])

  return (
    <div>
      <h1>{user?.token ? "USER HERE" : "null"}</h1>
      <h1>{localStorage.getItem("user")}</h1>
      <h1>AuthProvider::::::::{user ? "Logged" : "Need to auth"}</h1>
      <button className="p-1 border rounded-xl" onClick={() => logIn({ email: "joao@email.com", password: "123456" })}>
        Login
      </button>
      <button className="p-1 border rounded-xl" onClick={() => logOut()}>
        Logout
      </button>
      <div className={box}>{<Outlet />}</div>
    </div>
  )
}
