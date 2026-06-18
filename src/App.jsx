import IndexPage from './pages/IndexPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'

function App() {
  const currentPath = window.location.pathname

  if (currentPath === '/') {
    return <IndexPage />
  }

  if (currentPath === '/login') {
    return <LoginPage />
  }

  if (currentPath === '/signup') {
    return <SignupPage />
  }

  return <IndexPage />
}

export default App

// ==============================================================================================================

// import FleaMarket from './pages/FleaMarket.jsx'
// import LoginPage from './pages/LoginPage.jsx'
// import SignupPage from './pages/SignupPage.jsx'

// function App() {
//   const currentPath = window.location.pathname

//   if (currentPath === '/') {
//     return <FleaMarket />
//   }

//   if (currentPath === '/login') {
//     return <LoginPage />
//   }

//   if (currentPath === '/signup') {
//     return <SignupPage />
//   }

//   return <FleaMarket />
// }

// export default App