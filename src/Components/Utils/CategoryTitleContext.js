import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const CourseTitleContext = createContext();

export const useCategoryTitle = () => {
  return useContext(CourseTitleContext);
};

export const CourseTitleProvider = ({ children }) => {
  const [courseTitle, setCourseTitle] = useState([]);

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
        setCourseTitle(response.data.category);
      } catch (error) {
        localStorage.clear();
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <CourseTitleContext.Provider value={courseTitle}>
      {children}
    </CourseTitleContext.Provider>
  );
};
