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
import AddCourse from './pages/AddCourse';


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
          <Route path='/PreviewCourse/:id' element={<ProtectedRoute ><PreviewCourse /></ProtectedRoute>}  />    
          <Route path='/SubCategiriesAdd' element={<ProtectedRoute><SubCategiriesAdd /></ProtectedRoute>} />    
          <Route path='/AddCourse' element={<AddCourse />} />    
        </Routes> 
        </CourseTitleProvider>
      </BrowserRouter>  
   
    </>
  )
}

export default App