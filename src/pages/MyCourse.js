import React,{useState,useMemo, useEffect} from 'react';
import Navbar from '../Components/header/navbar.js';
import { Container,Image,Col,Row,Button,Modal,Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import EditIcon from "../assets/images/edit_ion.png";
import DeleteIcon from "../assets/images/delete_ion.png";
// import Img from '../assets/images/sub_cate_banner.png';
// import img2 from "../assets/images/sub_9.png";
import { useNavigate } from 'react-router-dom';
import FilterComponent from '../Components/Utils/CourseFilter.js';
import axios from 'axios';
import { useLoader } from '../Components/Utils/Loading/LoaderContext.js';
import {Link} from 'react-router-dom'
const MyCourse = () => {

  


  const {setLoading} = useLoader();

  const navigate = useNavigate();

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [showdelete, setShowDelete] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [deleteId, setDeleteId] = useState('')

  const [datas,setData] = useState([]);
  // console.log(deleteId,"daaaaaaaaaaaaaaaaaaaaaaaa")

  const handledeleteClose = () => {
    setShowDelete(false);
   
  };

  useEffect(() =>{
    const fetchCourseListData = async() =>{
      setLoading(true);
      try{
        const res = await axios.post( `${process.env.REACT_APP_BASE_URL}/lmsMyAddedCourseList`, 
        null ,
        {
          headers:{
            Authorization:localStorage.getItem("jwtToken"),
          },
        }
        );
        setData(res.data.myaddedcourselist);

      } catch(error) {
        localStorage.clear();
        console.error("Error fetching categories:", error)

      } finally {
        setLoading(false);
      }
      
    }
    fetchCourseListData();
  },[setLoading])

  const handleAddnewcourseClick = async() =>{
localStorage.removeItem("getcourseID");
  navigate("/addnewcourse")

}

const handleCourseEditSumbit = async  (row) =>{
  const  courseId = row.id;
  // console.log("Course ID:", courseId);
  localStorage.setItem("getcourseID", courseId) ;
  navigate("/addnewcourse");
  // console.log(" daaaaaaaaaaaaaaaaaaaaaaaadaasss", courseId)
}


// const handleCourseDeleteClick = async  (row) =>{
//   setShowDelete(true);
//   const  courseId = row.id;
//   // console.log("Course ID:", courseId);
//   localStorage.setItem("getcourseID", courseId) ;

// }
const undoSubmitHandlechange = async (courseID) =>{
  setLoading(true)
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/coursesubmit`,
    { 
      id:courseID,
      statusCode : 3
    },
    {
      headers: {
        Authorization:localStorage.getItem("jwtToken"),
      },
    }
  ).finally(()=>{
      navigate(0);
      // console.log("course submit msg:", response?.data);
  })
  console.log("course submit msg:", response?.data);
}
   const StatusColor={
    draft_bg :"#8c8f93",
    pending_bg:"#ffc107",
    success_bg:"#20c997",
    reject_bg:"#dc3545"
   }
  const columns = [
    {
      name: 'SI.No',
      selector: (row, index) => index + 1, 
      width: "6%",
      sortable: false,
    },
    {
        name: 'Course title',
        selector: row => row.course_title,
        sortable: true,
        style: {
          whiteSpace: 'normal !important', // Set whiteSpace to 'normal' for wrapping
        },
        width: "35%",      
        cell: row => <div className="wrap-content">{row.course_title}</div>, 
    },
    {
      name:'Category',
      selector:row => row.category_name,
      sortable:true,
      width:'10%'
    },
    {
      name:'Subcategory',
      selector:row => row.sub_category,
      sortable:true,
      width:'20%'
    },
    {
        name: 'Thumbnail',
        cell: row => <img src={row.thumbnail} alt="Thumbnail" style={{ maxWidth: '100%', maxHeight: '100%', width: '100px', height: '50px', margin:"5px 5px 5px 0" }} />,
        selector: row => row.thumbnail,
        sortable: true,
        width: "10%",
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      width: "10%",
      cell: (row) => (
        <div style={{width:"90px", display:"flex",justifyContent:"center",alignContent:"center", borderRadius:"4px", padding:"8px 10px",color:"white", fontWeight:"600", backgroundColor: row.status === 'Pending' ? StatusColor.pending_bg : row.status === 'Approved' ? StatusColor.success_bg : row.status ==='Rejected' ? StatusColor.reject_bg : row.status === 'Draft'? StatusColor.draft_bg : '' }}>
          {row.status}
        </div>
      ),
  },
  {
    name: 'Action',
    sortable: true,
    width: "",
   cell:(row) =>(
     <>
     {/* {console.log(row, "rowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww" )} */}
      <div className="dif">
      {row?.status.toLowerCase() === "pending" ? (
        <Link style={{textDecoration:"none", padding:"8px 15px"}} className="view-btn" onClick={() => undoSubmitHandlechange(row?.id)} >Undo Submit</Link> 
      ) :
      (
        <>
   {/* <Link className="/addnewcourse"> */}
   <Image title={row?.status === "Approved" ? "Disabled if Approved" :"Edit"} src={EditIcon} className="img_action" style={{cursor:row?.status === "Approved" ? "not-allowed" :"pointer",opacity:row?.status === "Approved" ? "0.5" :"1",}} alt="Edit" onClick={() => {if (row && row.status !== "Approved") {handleCourseEditSumbit(row)}}}/>
                          {/* </Link> */}
                          {/* <Link className="padl20 padr20"> */}
                            <Image title={row?.status === "Approved" ? "Disabled if Approved" :"Delete"} src={DeleteIcon} className="img_action" style={{cursor:row?.status === "Approved" ? "not-allowed" :"pointer",opacity:row?.status === "Approved" ? "0.5" :"1", marginLeft:"10px"}} alt="Delete" onClick={() =>{ if (row && row.status !== "Approved") { setShowDelete(true); setDeleteId(row.id); }
}} />
                          {/* </Link> */}
</>
       
      ) }
                         
                          
                        </div>
    </>
   ),
   
  },
];

const conditionalRowStyles = [
  
  {
    when: (row) => row.indexs % 2 !== 0, // Check if the row is odd fromapi response
    style: {
      backgroundColor: '#FCFAFF',
    },
  },
  
];


// filter Data Start
const filteredItems = datas.filter(
  (item) =>
  (item.course_title && item.course_title.toLowerCase().includes(filterText.toLowerCase())) ||
  (item.status && item.status.toLowerCase().includes(filterText.toLowerCase())) || (item.category_name && item.category_name.toLowerCase().includes(filterText.toLowerCase())) || (item.sub_category && item.sub_category.toLowerCase().includes(filterText.toLowerCase()))
);

const subHeaderComponentMemo = useMemo(() => {
  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText('');
    }
  };

  return (
    <FilterComponent onFilter={(e) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
  );
}, [filterText, resetPaginationToggle]);

// filter Data End

// pagination select all 
const paginationComponentOptions = {
  // rowsPerPageText: 'Filas por página',
  // rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'All',
};



//deletecourse 
const handleCourseDeleteSubmit = async () => {
  setButtonLoading(true);
  // { console.log(deletelesson?.lesson_id, "ggggggggggggggggg")}
  await axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/deletecourse`,
      {
        id:deleteId,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      }
    )
    .then((response) => {
      console.log(response.data,"courseDelete");
      navigate(0);
      // setButtonLoading(false);
    })
    .catch((error) => {
      console.log(error, "courseDelete errors");
    })
    .finally(() => {
      setButtonLoading(false);
    });
};

// console.log(datas,"dddddddddddddddddddddddd")
  return (
    <>
     <div className="delete modal">
        <Modal
          show={showdelete}
          onHide={handledeleteClose}
          style={{ margin: "0px" }}
        >
          <Modal.Header closeButton className="logout-modal">
            <Modal.Title className="fw500">Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          Proceed with deleting the course?{" "}
            {/* <span className="fw600">
             
            </span>
            <span> with Chapters and lessons</span> */}
            
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary padl50 padr50 white_bg black h50 br5 fw600 fz18"
              onClick={handledeleteClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary padl50 padr50 dark_purple_bg h50 br5 fw600 fz18 btn_color born"
            onClick={handleCourseDeleteSubmit}
              disabled={buttonLoading}
            >
              {buttonLoading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginRight: "5px" }}
                />
              )}
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Navbar className="dark_purple_bg"/>
      <div className='clearfix'></div>
      <Container fluid>
        <Row className='mart70 marb10'>
                <Col lg={6} className='filter-containern'>
                  <div style={{display:'flex',alignItems:'center',height:'100%'}}>
                    {/* <div> */}
                    {/* <span className='fw600 fz18 mart40 padb10'>Add Chapter</span>   */}
                    {/* </div> */}
                  <div className="filter-container">
                    <FilterComponent  onFilter={(e) => setFilterText(e.target.value)} onClear={() => setFilterText('')} filterText={filterText}  placeholderTxt={"Filter by course name / Subcategory /   Status"}/>
                  </div>
                </div>
                </Col>
                <Col lg={6}>
                  <div style={{display:'flex',justifyContent:'end'}}>
                  <Button onClick={handleAddnewcourseClick} className='add-btn mart0 marb10 marr10 dark_purple_bg born fw600 fz16 pad10 br5 btn_color ' ><b>+</b> Add Course</Button>  
                  {/* {localStorage.getItem("role") === "superadmin" && (
                    <Button href='/subCategiriesAdd' className='w30 mart0 marb10   dark_purple_bg born fw600 fz16 pad10 br5 btn_color ' ><b>+</b> Add Subcategory</Button>
                     
                  )} */}
                  </div>
                </Col>
              </Row>
        </Container>
      <Container fluid>
      <div className='rdt_Table'>

<DataTable pagination columns={columns} data={filteredItems} subHeaderComponent={subHeaderComponentMemo} conditionalRowStyles={conditionalRowStyles} paginationComponentOptions={paginationComponentOptions}/>
      </div>
      </Container>
    </>
  )
}

export default MyCourse;