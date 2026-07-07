import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';


import './reset.css'
import './common.css'
import './Header.css'
import './Footer.css'
import './App.css'


function Layout () {
  const location = useLocation();
  const isPageName = location.pathname;

  function mainStyleSetting () {
    switch (isPageName) {
    case '/' :
      return {padding:'6.8rem 0 0 0'};
      break;
    case '/items':
      return {backgroundColor: '#FCFCFC'};
      break;
    default:
      return;
  }}

  return (
  <>
    <Header isPageName={isPageName} />
    <main style={mainStyleSetting()}>
      <Outlet/>
    </main>
    <Footer />
  </>);
}

export default Layout;