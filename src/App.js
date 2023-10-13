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
import LoginPass from './pages/loginPass';
import ScrollMemory from './Components/Utils/ScrollMemory'

const App = () => {
  return (
    <>
     <BrowserRouter>  
     <CourseTitleProvider>
        <ScrollMemory/>
        <Routes>
          <Route path='/' element={<><Home /></>} />      
          <Route path='/login' element={<Login />} />
          <Route path='/Categiries/:id' element={<><Categiries /></>} />    
          <Route path='/SubCategiriesCourse/:id' element={<><SubCategiriesCourse /></>} />    
          <Route path='/PreviewCourse/:id' element={<ProtectedRoute ><PreviewCourse /></ProtectedRoute>}  />    
          <Route path='/SubCategiriesAdd' element={<ProtectedRoute><SubCategiriesAdd /></ProtectedRoute>} />    
          <Route path='/AddCourse' element={<AddCourse />} />    
          <Route path='/loginPass/:jwtToken/:userName' element={<LoginPass />} />   
          <Route path='*' element={<>404 Page Page not Found</> }/>
        </Routes> 
        </CourseTitleProvider>
      </BrowserRouter>  
   
    </>
  )
}

export default App