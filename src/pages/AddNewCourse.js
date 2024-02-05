import React from "react";
import "../assets/css/global.css";
import "../assets/css/custom.css";
import Navbar from "../Components/header/navbar.js";
import {  Container } from "react-bootstrap";
import "../../node_modules/video-react/dist/video-react.css";
import CourseAdd from '../Components/Utils/Course_Utils/AddCourseCard.js';
// import CourseSubmit from '../Components/Utils/Course_Utils/CourseSubmitCard.js'
// import CourseChapterAdd from '../Components/Utils/Course_Utils/AddChapterLesson.js';

const AddCourse = () => {
  return (
    <div>
      <Navbar className="dark_purple_bg" />
      <Container className="mart60">
        <CourseAdd/>
      </Container>
    </div>
  );
};

export default AddCourse;
