import React, { useEffect, useState } from "react";
import Header from "../Components/header/header";
import Navbar from "../Components/header/navbar";
// import { RecentCourse } from "../Components/contentarea/RecentCourse";
import LastView from "../Components/contentarea/LastView";
import Footer from "../Components/footer/footer";
import libraryBg from "../assets/images/library.jpg";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Whistlist from "../Components/Utils/Whistlist";
import { useCategoryTitle } from '../Components/Utils/CategoryTitleContext';
import { useLoader } from "../Components/Utils/Loading/LoaderContext";
import NoImg from '../assets/images/NoImg.svg'


const MyLibrary = () => {
  const {setLoading} = useLoader();
    const[libraryData, setLibraryData] = useState([]);
    const jwtToken = localStorage.getItem("jwtToken");


    const courseTitle = useCategoryTitle(); // from useContext
    // console.log("cccccc",libraryData)
    
    const fetchDataUpdate = async() =>{
      // setLoading(true);
      try{
const response = await axios.post (`${process.env.REACT_APP_BASE_URL}/mylibrary`,
null,
{
  headers:{
      Authorization:jwtToken,
  },
}
);
  setLibraryData(response?.data?.data);
  console.log("fetchDataUpdateeeee",response.data.data)
      } catch (error) {
          localStorage.clear();
          console.error("Error fetching categories:", error);
      } finally{
        // setLoading(false);
      }
  }

    useEffect(() =>{
      setLoading(true);
        const fetchData = async() =>{
            try{
const response = await axios.post (
    `${process.env.REACT_APP_BASE_URL}/mylibrary`,
    null,
    {
        headers:{
            Authorization:jwtToken,
        },
    }
);
        setLibraryData(response?.data?.data);
            } catch (error) {
                localStorage.clear();
                console.error("Error fetching categories:", error);
            }
            finally{
              setLoading(false);
            }
        }
        fetchData();
    },[jwtToken,setLoading]) //libraryData +

    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    };
    const truncateDesc = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    };
  return (
    <>
        <Navbar courseTitleProp={courseTitle}/>
        {/* {console.log("libraryData",libraryData)} */}
     
        <Header
            style={libraryBg}
        text="Explore Your Wisdom and Knowledge in Our Library"
        title1="Where Knowledge Unfolds, "
        title2="and Courses Take Flight"
        />
        <Container>
        <Row className="mart30">
          {libraryData?.map((course, index) => (
            <Col xxl={3} lg={4} md={6} sm={12}  className="marb20 scale-animation" key={index}>
            <div className="myanimation">
              <Link
                title={course.course_name}
                to={`/PreviewCourse/${course.id}`}
                style={{ textDecoration: "none" }}
                className="black fz16 fw400 "
              >
                <Image src={course.course_image || NoImg} style={{  height:"168px" , objectFit:"cover" }} className="w100 border " />
                <div className="border pad10 " style={{  height:"245px" , display:"flex",flexDirection:"column", justifyContent:"space-between"}}>
                <div className="course-desc-dummy">
                  <p
                    className="light_black"
                    style={{ padding: "0 0px 0 0px", fontSize: "12px" }}
                  >
                    Created by <b>{course.course_created_by}</b> on{" "}
                    {course?.formatted_created_date}
                  </p>
                  <p className="fw600 fz18 light_black marb5">
                    {truncateText(course?.course_name, 55)}
                  </p>
                  <p title={course.course_desc} className="fw400  fz15 light_black">{truncateDesc(course.course_desc, 145)}</p>
                  {/* for bottom button and whistlist */}
                  </div>
                  <Col lg={12} >
                <div
                 className="course-footer padt20"
                >
                  {/* <Link
                    to={`/PreviewCourse/${course.course_id}`}
                    className="tdn black"
                  ></Link> */} 
                  {/* // button is there between link tag */}
                    <Button  style={{borderRadius:"0"}} className="fz16 padl20  padr20 dark_purple_bg bor_dark_purple br0 fr r20  padl30 padr30 btn_color born ">
                      View
                    </Button>
                  
{libraryData && (
  <Whistlist 
                    course_id={course?.id}
                    active={course?.wishlist}
                    onClick2={fetchDataUpdate}    // note:if dont't need instanly remove course from whistlist  pls remove onclick2 event
                  
                  />
)}
                  
                </div>
              </Col>
                </div>
              </Link>
</div>
              
            </Col>
          ))}
        </Row>
        </Container>

        {!(libraryData?.length) ? (
          <Container style={{  padding: "133px 0px 159px 0", textAlign: "center" }}>
          <div
            style={{ fontSize: 25, fontWeight: 600, color: "rgb(94, 94, 94)" }}
          >
            Your library is Empty{" "}
          </div>
      </Container>
        ) : 
        (
          <></>
        )}
     
{/* <RecentCourse/> */}
<LastView/>
      <Footer />
    </>
  )
}

export default MyLibrary;