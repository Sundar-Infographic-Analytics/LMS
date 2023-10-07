import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Categiries from './pages/Categiries';
import SubCategiriesCourse from './Components/contentarea/SubCategiriesCourse';
import PreviewCourse from './pages/PreviewCourse';
import SubCategiriesAdd from './pages/SubCategiriesAdd';
import ProtectedRoute from './Components/Utils/ProtectedRoute';
import { CourseTitleProvider } from './Components/Utils/CategoryTitleContext';


const App = () => {
  return (
    <>
     <BrowserRouter>  
     <CourseTitleProvider>
        <Routes>
          <Route path='/' element={<><Home /></>} />        
          <Route path='/login' element={<Login />} />
          <Route path='/Categiries/:id' element={<><Categiries /></>} />    
          <Route path='/SubCategiriesCourse' element={<><SubCategiriesCourse /></>} />    
          <Route path='/PreviewCourse' element={<ProtectedRoute ><PreviewCourse /></ProtectedRoute>}  />    
          <Route path='/SubCategiriesAdd' element={<ProtectedRoute><SubCategiriesAdd /></ProtectedRoute>} />    
        </Routes> 
        </CourseTitleProvider>
      </BrowserRouter>  
   
    </>
  )
}

export default App