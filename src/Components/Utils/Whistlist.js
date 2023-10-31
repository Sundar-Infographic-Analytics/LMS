import React, { useState } from "react";
import HeartBlank from "../../assets/images/heartblank.png";
import HeartRed from "../../assets/images/heartRed.png";
import axios from "axios";
import { toast } from 'react-toastify';

const Whistlist = ({ course_id, active }) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const [wishlist, setWishlist] = useState(active);
  const [msg, setmsg] = useState("");

  const handleclick = async (e) => {
    e.preventDefault();
    setWishlist(!wishlist);
    await handleSubmit();
    toast.info( <div>
      <p>{msg}</p>
    </div>,
    { position: 'top-right' });
  };

  const handleSubmit = async () => {
    console.log(!wishlist, "wishlist");
    console.log(msg, "msgggggggggggggggg");
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/lmsMywishList`,
        { course_id: course_id, wishlist: !wishlist },
        { headers: { Authorization: jwtToken } }
      )
      .then((response) => {
        console.log("msg", response);
        setmsg(response.data.msg)
      })
      .catch((error) => {
        console.log("msg", error);
      });
  };

  return (
    <>
      <div className="whishlist" onClick={handleclick}>
        <img src={!wishlist ? HeartBlank : HeartRed} alt="favicon" />
      </div>
    </>
  );
};

export default Whistlist;
