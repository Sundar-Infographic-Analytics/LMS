import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Globale401Modal from './Components/Utils/401GlobalyApiInterceptor';
import MyLearnings from './pages/MyLearnings';
import MyLibrary from './pages/MyLibrary';

const App = () => {
const token = localStorage.getItem("jwtToken");

  return (
    <>
     <BrowserRouter>  
     <CourseTitleProvider>
        <Globale401Modal/>
        <Routes>
          <Route path='/' element={<><Home /></>} />             
          <Route path='/login' element={ token? (<Navigate to="/"/>):(<Login />) } />     
          <Route path='/Categiries/:id' element={<><Categiries /></>} />    
          <Route path='/SubCategiriesCourse/:id' element={<><SubCategiriesCourse /></>} />    
          <Route path='/PreviewCourse/:id' element={<ProtectedRoute ><PreviewCourse /></ProtectedRoute>}  />    
          <Route path='/SubCategiriesAdd' element={<ProtectedRoute><SubCategiriesAdd /></ProtectedRoute>} />    
          <Route path='/AddCourse' element={<AddCourse />} />    
          <Route path='/mylearnings' element={<ProtectedRoute><MyLearnings /></ProtectedRoute>} />   
          <Route path='/mylibrary' element={<ProtectedRoute><MyLibrary /></ProtectedRoute>} />   
          <Route path='/loginPass/:jwtToken/:userName' element={<LoginPass />} />   
          <Route path='*' element={<>404 Page Page not Found</> }/>
        </Routes> 
        </CourseTitleProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>  
   
    </>
  )
}

export default App