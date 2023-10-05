import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Categiries from './pages/Categiries';
import SubCategiriesCourse from './Components/contentarea/SubCategiriesCourse';
import PreviewCourse from './pages/PreviewCourse';
import SubCategiriesAdd from './pages/SubCategiriesAdd';
import ProtectedRoute from './Components/Utils/ProtectedRoute';
import AddCourse from './pages/AddCourse';


const App = () => {
  return (
    <>
     <BrowserRouter>  
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />        
          <Route path='/login' element={<Login />} />
          <Route path='/Categiries' element={<ProtectedRoute><Categiries /></ProtectedRoute>} />    
          <Route path='/SubCategiriesCourse' element={<ProtectedRoute><SubCategiriesCourse /></ProtectedRoute>} />    
          <Route path='/PreviewCourse' element={<ProtectedRoute><PreviewCourse /></ProtectedRoute>} />    
          <Route path='/SubCategiriesAdd' element={<ProtectedRoute><SubCategiriesAdd /></ProtectedRoute>} />    
          <Route path='/AddCourse' element={<AddCourse />} />    
        </Routes> 
      </BrowserRouter>  
   
    </>
  )
}

export default App