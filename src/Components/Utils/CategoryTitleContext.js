import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const CourseTitleContext = createContext();

export const useCategoryTitle = () => {
  return useContext(CourseTitleContext);
};

export const CourseTitleProvider = ({ children }) => {
  
  const [courseTitle, setCourseTitle] = useState([]);
  // const [libraryAndLearningCount, setLibraryAndLearningCount] = useState('');

  
  
  useEffect(() => {   
    const fetchCategories = async () => {
      
      const jwtToken=localStorage.getItem("jwtToken");
      
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/lmsCategoryList`, null,
        {
          headers:{
            Authorization:jwtToken,
          },
        }
        );
      
        
        setCourseTitle(response.data);        

        // setLibraryAndLearningCount(response.data.count)
      } catch (error) {
        localStorage.clear();
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []); //courseTitle



  // console.log("addcheckkkNavvvvvvjwt",jwtToken)
  
  return (
    <CourseTitleContext.Provider value={ courseTitle } >
    {console.log('addcheckkkkcontect', courseTitle)}
      {children}
    </CourseTitleContext.Provider>
  );
};
