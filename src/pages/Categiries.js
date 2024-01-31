import React, { useEffect, useState } from "react";
import "../assets/css/global.css";
import "../assets/css/custom.css";
import Header from "../Components/header/header";
import Navbar from "../Components/header/navbar";
import SubCategiries from "./SubCategiries";
// import bgImage from '../assets/images/cate.png';
import LastView from "../Components/contentarea/LastView";
import Footer from "../Components/footer/footer";
import { RecentCourse } from "../Components/contentarea/RecentCourse";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useLoader } from "../Components/Utils/Loading/LoaderContext";

const Categiries = () => {
  const Headerdetails = {
    Description: [
      "Explore our courses to learn and understand financial concepts",
      "Explore our courses through legal learning solutions!",
      "Discover risk excellence with our courses to develop strong strategies",
      "Get your IT skills with our diverse courses covering all for career growth",
    ],
    TitleMain: [
      "Your Path to Profound ",
      "Understanding Legal Matters and ",
      "Resolve Your ",
      "Navigating Tomorrow's World with ",
    ],
    TitleSub: [
      "Financial Understanding",
      "Become Legal Mastery",
      "Risks with Expert Courses",
      "Tech Knowledge",
    ],
  };

  const { setLoading } = useLoader();
  const navigate = useNavigate();
  const [bgImg, setBgImg] = useState({
    categoryTitle: "",
    categoryTagName: "",
    categoryHeadImage: "",
    subcategory: [],
  });
  // const [subCat, setSubCat] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async (e) => {
      setLoading(true);
      const jwtToken = localStorage.getItem("jwtToken");
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/lmsSubCategoryList`,
          {
            categoryid: id,
          },
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        )
        .then(({ data }) => {
          setBgImg(data);
          // setSubCat(data.subcategory);
          // console.log(data.subcategory, "xxxxxxxxxxxxxxxxxxx");
          // console.log(data, "lllll");
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            navigate("/");
          } else if (response.status === 401) {
            localStorage.clear();
          }
        })
        .finally(() => {
          setLoading(false);
          // console.log("Data12356789", Headerdetails.TitleMain[parseInt(id)-1]);
        });
    };
    fetchData();
  }, [id, navigate, setLoading]);

  // console.log(id, "oooo");
  // console.log(subCat, "cattttttttttttttttttt");
  // console.log(bgImg, "bg Imggggggggggggggggggggggggg");

  return (
    <div>
      <Navbar />
      {/* {console.log(bgImg.categoryHeadImage, "mmmmmmmmmmmmmmmmmmmm")} */}
      <Header
        style={bgImg.categoryHeadImage}
        text={Headerdetails.Description[parseInt(id)-1]}
        title1={ Headerdetails.TitleMain[parseInt(id)-1]   }
        title2={Headerdetails.TitleSub[parseInt(id)-1]  }
      />
      <SubCategiries data={bgImg} />
      <RecentCourse />
      <LastView />
      <Footer />
    </div>
  );
};

export default Categiries;
