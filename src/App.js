import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Categiries from './pages/Categiries';
import SubCategiriesCourse from './Components/contentarea/SubCategiriesCourse';
import PreviewCourse from './pages/PreviewCourse';


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