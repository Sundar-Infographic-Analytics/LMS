import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Login from './Components/login/login';
import Categiries from './Components/contentarea/Categiries';
import SubCategiriesCourse from './Components/contentarea/SubCategiriesCourse';
import PreviewCourse from './Components/contentarea/PreviewCourse';


const App = () => {
  return (
    <>
     <BrowserRouter>  
        <Routes>
          <Route path='/' element={<Login />} />        
          <Route path='/home' element={<Home />} />
          <Route path='/Categiries' element={<Categiries />} />    
          <Route path='/SubCategiriesCourse' element={<SubCategiriesCourse />} />    
          <Route path='/PreviewCourse' element={<PreviewCourse />} />    
          
        </Routes> 
      </BrowserRouter>  
   
    </>
  )
}

export default App