import Index from './pages/Index.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Items from './pages/Items.jsx'

function App() {
  const currentPath = window.location.pathname

  if (currentPath === '/') {
    return <Index />
  }

  if (currentPath === '/items') {
    return <Items />
  }

  if (currentPath === '/login') {
    return <Login />
  }

  if (currentPath === '/signup') {
    return <Signup />
  }

  return <Index />
}

export default App