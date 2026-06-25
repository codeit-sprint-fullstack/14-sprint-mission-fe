import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css'
import './assets/font.css'
import App from './App.jsx'
import ItemListPage from '../pages/ItemListPage.jsx';
import ItemRegistrationPage from '../pages/ItemRegistrationPage.jsx';
import MainPage from '../pages/MainPage.jsx';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<MainPage />} />
          <Route path="items" element={<ItemListPage />}>
          </Route>
          <Route path="registration" element={<ItemRegistrationPage />}>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;