import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App.jsx'
import Body from './Body.jsx'
import Items from './Items.jsx'
import Registration from './Registration.jsx'

function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path='/' element={<Body />} />
          <Route path='/items' element={<Items />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </App>
    </BrowserRouter>
  )
}

export default Main 
