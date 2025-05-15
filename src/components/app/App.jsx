import { BrowserRouter } from 'react-router';
import { ToastContainer } from "react-toastify";
import HomePage from '../../pages/HomePage/HomePage';
import './App.css'

function App() {


  return (
    <>
      <BrowserRouter>
        <HomePage />
        <ToastContainer/>
      </BrowserRouter>
    </>
  )
}

export default App
