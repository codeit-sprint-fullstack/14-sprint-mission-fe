import Index from './pages/Index.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Items from './pages/Items.jsx'
import Registration from './pages/Registration.jsx'
import ItemDetail from './pages/ItemDetail.jsx'

function App() {
  const currentPath = window.location.pathname

  if (currentPath === '/') {
    return <Index />
  }

  if (currentPath === '/items') {
    return <Items />
  }

  if (currentPath.startsWith('/items/')) {
  return <ItemDetail />
}

    if (currentPath === '/registration') {
    return <Registration />
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