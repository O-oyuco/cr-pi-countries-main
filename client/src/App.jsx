import {Routes, Route} from "react-router-dom";
import Landing from './components/landing/Landing';
import Home from './components/home/Home';
import Detail from './components/detail/Detail';  
import ActivityDetail from './components/activityDetail/ActivityDetail';

import './App.css'

function App() {


  
  return ( 
      <div> 
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/activity/:id" element={<ActivityDetail/>} />
        </Routes> 
      </div>
  )
}

export default App
