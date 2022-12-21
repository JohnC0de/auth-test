import axios from "axios"
import { createContext, useContext, useState } from "react"
import { useMutation } from "@tanstack/react-query"

type UserToken = {
  token: string
  createdAt: string
}
type UserInfo = { email: string; password: string }

interface ContextValue {
  logIn: ({ email, password }: UserInfo) => void
  logOut: () => void
  user: UserToken | null
}

const fetchToken = async (email: string, password: string) => {
  const { data } = await axios.post<{ token: string; createdAt: string }>("http://127.0.0.1:3000/token", {
    email,
    password
  })
  return data
}

const AuthContext = createContext<ContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(getLocalStorageUser())

  function getLocalStorageUser() {
    const user = localStorage.getItem("user") as string | null
    if (user === null) return null
    return JSON.parse(user) as UserToken
  }

  const userMutation = useMutation({
    mutationKey: ["userMutation"],
    mutationFn: ({ email, password }: UserInfo) => fetchToken(email, password),
    onSuccess: data => {
      console.log("Login success")
      localStorage.setItem("user", JSON.stringify(data))
      setUser(data as UserToken)
    }
  })

  function logIn({ email, password }: UserInfo) {
    userMutation.mutate({ email, password })
  }

  function logOut() {
    localStorage.clear()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, logIn, logOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider")
  }
  return context
}
