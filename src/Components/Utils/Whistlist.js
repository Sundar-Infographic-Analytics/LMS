import React, { useEffect, useState } from "react";
import HeartBlank from "../../assets/images/heartblank.png";
import HeartRed from "../../assets/images/heartRed.png";
import axios from "axios";
import { toast } from 'react-toastify';
import { useCategoryTitle } from "./CategoryTitleContext";
import Tick from '../../assets/images/books.png';
import Delete from '../../assets/images/toast-delete.png';
import { useNavigate } from "react-router-dom";
const Whistlist = ({ course_id, active, onClick2}) => {
  
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");
  const [wishlist, setWishlist] = useState(active);
  const [msg, setmsg] = useState("");
  const [check, setCheck]  = useState('');
  const courseTitle = useCategoryTitle();  


  const handleclick = async (e) => {
    e.preventDefault();
    setWishlist(!wishlist);
    await handleSubmit();
    if (onClick2) {
        onClick2();
        navigate(0);
      }  
  }  ;

  const CustomToast = () => (
    <div className="vmiddle" style={{gap:"10px" }}>
      <img style={{width:"30px"}} src={msg ==='Successfully added in wish list!!!'? Tick : Delete} alt="Custom" />
      <p>
      {msg === 'Successfully added in wish list!!!' ? (
        <span>
          Successfully <strong className="black">added</strong> in Library!
        </span>
      ) : (
        <span>
          Successfully <strong className="black">deleted</strong> in Library!
        </span>
      )}
    </p>

    </div>
  );
  useEffect(() =>{
    if (msg ) {
        toast( <CustomToast/>, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
            });
    } 
  }, [msg]) //msg,wishlist,active,course_id +

  const handleSubmit = async () => {
    
    console.log(!wishlist, "wishlist");
    console.log(courseTitle, "addcheckkkNavvvvvv courseTitle");
   
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/lmsMywishList`,
        { course_id: course_id, wishlist: !wishlist },
        { headers: { Authorization: jwtToken } }
      )
      .then((response) => {
        console.log("msg", response);
        console.log(response.data, 'Console')
        // window.location.reload();
        setmsg(response.data.msg)
        setCheck(response)
        console.log(response,'msssssssssssssssssssssss..........')
      })
      .catch((error) => {
        console.log("msg", error);
      });

      
  };
  console.log(msg,"msssssssssssssssssssssss")
  console.log(check,"mssssssssssssssssssssssscheck")
  return (
    <>
  
      <div title="Library" className="whishlist" onClick={handleclick}  >
        <img src={!wishlist ? HeartBlank : HeartRed} alt="favicon" />
      </div>
    </>
  );
};

export default Whistlist;
