import Header from './Header.jsx'
import Footer from './Footer.jsx'
import './App.css'

function App({ children }) {
  return (
    <>
    <Header />
    <div className='content-box'>
      {children}
    </div>
    <Footer />
    </>
  )
}

export default App
