import {Routes, Route} from "react-router-dom";
import Landing from './components/landing/Landing';
import Home from './components/home/Home';
import Detail from './components/detail/Detail';  
import ActivityDetail from './components/activityDetail/ActivityDetail';
import './App.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate();
  const [access, setAccess] = useState(false)


  useEffect(()=>{
    !access && navigate('/');
  }, [access, navigate]);


  const handleAccess = () =>{
    setAccess(true)
  }

  return ( 
      <div> 
        <Routes>
          <Route path="/" element={<Landing  handleAccess = {handleAccess}/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/activity/:id" element={<ActivityDetail/>} />
        </Routes> 
      </div>
  )
}

export default App
