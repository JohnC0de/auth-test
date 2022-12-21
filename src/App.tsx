import { createBrowserRouter, Link, Outlet, RouterProvider, useNavigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./AuthContext"
import { AuthVerifier } from "./AuthVerifier"

const box = "border p-2 m-2"

function AppLayout() {
  const pages = [
    {
      path: "/",
      title: "Home"
    },
    {
      path: "/about",
      title: "About"
    },
    {
      path: "/login",
      title: "Login"
    }
  ]
  return (
    <div className={box}>
      <h1>Nav::::::::</h1>
      <nav>
        <ul>
          {pages.map((page, index) => (
            <li key={index}>
              <Link className="border" to={page.path}>
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className={box}>
        <h1>Page::::::::</h1>
        <Outlet />
      </main>
    </div>
  )
}

function Home() {
  return <h1 className="underline">Home PAGE</h1>
}

function About() {
  return <h1 className="underline">About PAGE</h1>
}

export function Login() {
  const navigate = useNavigate()
  const { logIn } = useAuth()

  return (
    <div>
      <h1 className="underline">Login PAGE</h1>
      <button className="p-1 border rounded-xl" onClick={() => logIn({ email: "joao@email.com", password: "123456" })}>
        Login
      </button>
      <Link to="/about">about</Link>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <AuthVerifier />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Home />
          },
          {
            path: "/about",
            element: <About />
          }
        ]
      }
    ]
  }
])

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
