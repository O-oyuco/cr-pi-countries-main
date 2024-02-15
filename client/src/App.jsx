import {Routes, Route} from "react-router-dom";
import Landing from './components/landing/landing';
import Home from './components/home/Home';
import Detail from './components/detail/Detail';

import './App.css'

function App() {

  return ( 
      <div> 
        <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/detail/:id" element={<Detail />} />
        </Routes> 
      </div>
  )
}

export default App
