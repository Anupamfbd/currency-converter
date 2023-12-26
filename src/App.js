import {BrowserRouter, Routes, Route} from "react-router-dom"
import CurrencyConverter from './Components/CurrencyConverter';
import './App.css';

function App() {
  return (
     <BrowserRouter>
       <CurrencyConverter/>
     </BrowserRouter>
  );
}

export default App;
