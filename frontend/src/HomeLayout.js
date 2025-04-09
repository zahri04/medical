import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, Routes, Route,Outlet } from 'react-router-dom';
// import component
import Navbar from './Navbar/Navbar.js';
import Footer from './Footer/Footer.js';


// import AppContext
import  AppContextProvider  from './Context/AppContext.js';


function App() {
  return (
    <div className="App">
    
        <AppContextProvider>
          <Navbar />
          <Outlet/>
        </AppContextProvider>
        <Footer />
      
    </div>
  );
}

export default App;