import { useState } from 'react'

import './assets/font/font.css'
import './Reset.css'
import './Common.css'

import Header from './components/Header.jsx'
import Main from './components/Main.jsx'
import Footer from './components/Footer.jsx'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="wrap">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  )
}

export default App
