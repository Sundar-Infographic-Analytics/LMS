import React,{useState,useMemo, useEffect} from 'react';
import Navbar from '../Components/header/navbar.js';
import { Link } from "react-router-dom";
import { Container,Image,Col,Row,Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import EditIcon from "../assets/images/edit_ion.png";
import DeleteIcon from "../assets/images/delete_ion.png";
// import Img from '../assets/images/sub_cate_banner.png';
// import img2 from "../assets/images/sub_9.png";
import { useNavigate } from 'react-router-dom';
import FilterComponent from '../Components/Utils/CourseFilter.js';
import axios from 'axios';

const MyCourse = () => {
  const navigate = useNavigate();

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const [datas,setData] = useState([]);

  useEffect(() =>{
    const fetchCourseListData = async() =>{
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

      }
    }
    fetchCourseListData();
  },[])

  const handleAddnewcourseClick = async() =>{
localStorage.removeItem("getcourseID");
 await navigate("/addnewcourse")

}

   const StatusColor={
    draft_bg :"#8c8f93",
    pending_bg:"#ffc107",
    success_bg:"#20c997",
    reject_bg:"#dc3545"
   }
  const columns = [
    {
      name: 'SI. No',
      selector: (row, index) => index + 1,
      width: "6%",
    },
    {
        name: 'Course Name',
        selector: row => row.course_title,
        sortable: true,
        style: {
          whiteSpace: 'normal !important', // Set whiteSpace to 'normal' for wrapping
        },
        width: "47%",      
        cell: row => <div className="wrap-content">{row.course_title}</div>, 
    },
    {
      name:'Catogory',
      selector:row => row.category_name,
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
    width: "7%",
   cell:(row) =>(
    <>
      <div className="dif">
                          <Link className="">
                            <Image src={EditIcon} className="img_action" alt="Edit" />
                          </Link>
                          <Link className="padl20 padr20">
                            <Image src={DeleteIcon} className="img_action" alt="Delete" />
                          </Link>
                        </div>
    </>
   ),
   
  },
];
// const data = [ 
//   {
//       id: 1,
//       course_title: 'use state04 is a hook that can be used as a hook.custom reference is a reference.custom reference is a reference. displays the courses which an enrolled user has most recently accessed displays the courses which an enrolled user has most recently accessed',
//       sub_catogory:'Technology',
//       thumbnail:Img,
//       status:"Pending",
//       index:0 //need for striped color
//   },
//   {
//     id: 2,
//     course_title: 'Course Enrollments by Student Academic Level IDE',
//     sub_catogory:'Legal',
//     thumbnail:img2,
//     status:"Approved",
//     index:1
// },
// {
//   id: 3,
//   course_title: 'displays the courses which an enrolled user has most recently accessed',
//   sub_catogory:'Technology',
//   thumbnail:Img,
//   status:"Approved",
//   index:2
// },
// {
//   id: 4,
//   course_title: 'The Supreme Court Practice and Procedure',
//   sub_catogory:'Finance',
//   thumbnail:img2,
//   status:"Rejected",
//   index:3
// },
// {
//   id: 5,
//   course_title: 'The Supreme Court Practice and Procedure',
//   sub_catogory:'Finance',
//   thumbnail:img2,
//   status:"Draft",
//   index:4
// },
  
// ];

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
  (item.status && item.status.toLowerCase().includes(filterText.toLowerCase())) || (item.category_name && item.category_name.toLowerCase().includes(filterText.toLowerCase()))
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


  return (
    <>
      <Navbar className="dark_purple_bg"/>
      <div className='clearfix'></div>
      <Container fluid>
        <Row className='mart50 marb10'>
                <Col lg={6} className='filter-containern'>
                  <div style={{display:'flex',alignItems:'center',height:'100%'}}>
                    {/* <div> */}
                    {/* <span className='fw600 fz18 mart40 padb10'>Add Chapter</span>   */}
                    {/* </div> */}
                  <div className="filter-container">
                    <FilterComponent  onFilter={(e) => setFilterText(e.target.value)} onClear={() => setFilterText('')} filterText={filterText}  placeholderTxt={"Filter by course name (or) Status"}/>
                  </div>
                </div>
                </Col>
                <Col lg={6}>
                  <div style={{display:'flex',justifyContent:'end'}}>
                  <Button onClick={handleAddnewcourseClick} className='w30 mart0 marb10 dark_purple_bg born fw600 fz16 pad10 br5 btn_color ' ><b>+</b> Add Course</Button>       
                  </div>
                </Col>
              </Row>
        </Container>
      <Container fluid>
<DataTable pagination columns={columns} data={filteredItems} subHeaderComponent={subHeaderComponentMemo} conditionalRowStyles={conditionalRowStyles} paginationComponentOptions={paginationComponentOptions}/>
      </Container>
    </>
  )
}

export default MyCourse;