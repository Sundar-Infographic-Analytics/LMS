import React,{ useEffect, useState,useMemo} from "react";
import Navbar from "../Components/header/navbar.js";
import { ButtonGroup, Col, Container, ToggleButton,Image, Modal, Row,Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import FilterComponent from "../Components/Utils/CourseFilter.js";
import ViewIcon from "../assets/images/newRead-icon.svg";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import NoImg from '../assets/images/9f3ae86c-80f5-42f0-9940-740d8ff96f35.svg';
import { useLoader } from "../Components/Utils/Loading/LoaderContext.js";

const ApprovalHub = () => {
const {setLoading}   = useLoader();

  const [radioValue, setRadioValue] = useState({});
  const [adminList, setAdminList] = useState([]);

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const [Readby, setReadby] = useState([]);
  const [modalshow, setModalShow] = useState(false);
  const [filterReadbyText, setFilterReadbyText] = useState('');
  const [resetPaginationReadbyToggle, setResetPaginationReadbyToggle] = useState(false);
  const [modalloading, setModalLoading] = useState(false);
 

  const radios = [
    { name: 'Approve', value: 1 },
    { name: 'Reject', value: 2 },
    { name: 'Pending', value: 0 },
  ];

  const handleRadioChange = async (courseId, value) => {
    setRadioValue((prevValues) => ({
      ...prevValues,
      [courseId]: value,
    }));

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/lmscoursestatuschange`,
        {
          approved_status: value,
          course_id: courseId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );
    } catch (error) {
      console.error("Error updating course status:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/lmsCourseListAdmin`,
          null,
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
            },
          }
        );
        setAdminList(res.data.adminCoursependinglist);

        const initialRadioValue = {};
        res.data.adminCoursependinglist.forEach((course) => {
          initialRadioValue[course.id] = course.approved_status;
        });
        setRadioValue(initialRadioValue);
      } catch (error) {
        localStorage.clear();
        console.error("Error fetching courses:", error);
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading]);
  
  
 
  
  // const data = [
  //   {
  //     id:1,
  //     course_title:'use state04 is a hook that can be used as a hook.custom reference is a reference.custom reference is a reference. displays the courses which an enrolled user has most recently accessed displays the courses which an enrolled user has most recently accessed se state04 is a hook that can be used as a hook.custom refer',
  //     category_name:'Technology',
  //     sub_category:'Web development',
  //     emp_name:'dhivagar stanly',
  //     thumbnail:img2,
  //     status:'Pending',
  //     initial_Action:0,
  //     action:'appove / reject',
  //     indexs:1,

  //   }
  // ]


// const updateVal = ( index,initial_Actionchk ) =>{
//  const newData = [...data];
//  newData[index].initial_Action = initial_Actionchk;
//  setData(newData)
// }
  // const onChange = (index, status) =>{
  //   let newArr = [...data];  
  //   if (status === '1') newArr[index].status='Approved'
  //   else if (status === '2') newArr[index].status='Rejected'
  //   else if (status === '3') newArr[index].status='Pending'
  //   newArr[index].status_id = status; 
  //   setData(newArr);
  // }

//  const [getPreviewCourseID, setGetPreviewCourseID]= useState('');
//  console.log(getPreviewCourseID, "check superadmin link")

//for Ready by enhancement Start
const readbycolumns = [
  {
      name:"SI.No",
      selector:(row , index) => index + 1,
      width:"20%",
  },
  {
    name:"name",
    selector:row =>row?.name,
    cell: row => <div className="wrap-content">{row?.name}</div>, 
    width:"40%",
  },
  {
    name:"Read on",
    selector:row =>row?.Readdate,
    cell: row => <div className="wrap-content">{row?.Readdate}</div>, 
    width:"40%",
  }
]
const fetchReadbyHandleClick = async (course_id) =>{
  // console.log(course_id, "id")
  setModalShow(true);
  setModalLoading(true);
     await axios.post( `${process.env.REACT_APP_BASE_URL}/lmsCourseReadbyEmployees`,
     {
      courseId:course_id
     },
     {
      headers:{
        Authorization: localStorage?.getItem("jwtToken"),
      }
     }
     ).then((response) =>{
       setReadby(response?.data)
      //  console.log("readby", response?.data)
      // setModalShow(true);
     }).catch((error) =>{
      console.log("error from fetching read by employes", error)
     }).finally(() =>{
      setModalLoading(false);
     })
}

const conditionalReadbyRowStyles = [
  {
    when: (row) => row.index % 2 === 0, // Check if the row is odd fromapi response
    style: {
      backgroundColor: '#000',
    },
  },
  
];
// console.log("readbyyy",Readby)
//for Ready by enhancement End

    const columns = [
        {
            name:"SI.No",
            selector:(row , index) => index + 1,
            width:"5%",
        },
        {
            name:"Course title",
            selector: row => row.course_title,
            sortable:true,
            style: {
                whiteSpace: 'normal !important', // Set whiteSpace to 'normal' for wrapping
            },
            width: "18%",      
         cell: row => <div className="wrap-content">{row.course_title}</div>, 
        },
        {
          name:"Category",
          selector: row =>row.category_name,
          sortable:true,
          width:"7%"
        },
        {
          name:"Subcategory",
          selector:row =>row.sub_category,
          sortable:true,
          width:"12%",
          cell: row => <div className="wrap-content">{row.sub_category}</div>,
        },
        {
          name:"Uploaded by",
          selector:row => row.first_name,
          sortable:true,
          width:"10%",
          cell: row => <div className="wrap-content">{row.first_name}</div>,
        },
        {
          name:"Thumbnail",
          width:"10%",
          cell: row => <img src={row.thumbnail || NoImg} alt="Thumbnail" style={{ maxWidth: '100%', maxHeight: '100%', width: '100px', height: '50px', margin:"5px 5px 5px 0" }} />,
          selector:row => row.thumbnail,
          sortable:true,
        },
        // {
        //   name:"status",
        //   selector:row => row.status,
        //   sortable:true,
        // },
        {
          name:"Course view",
          // selector
          width:"10%",
          cell: row => (
          <>
          {/* <div>{console.log(row, 'check superadmin linkClick')}</div> // hide console from Below link========> onClick={()=> setGetPreviewCourseID(row?.id)} */}
          <Link to={`/PreviewCourse/${row?.id}`}  style={{textDecoration:"none"}} className="view-btn">View</Link>  
          </>
          )
        },
        {
          name:"Read by",
          width:"5%",
          cell: row => (
            <>
            {/* {console.log(row, 'full roww')}  */}
           <Image width={30} src={ViewIcon} style={{cursor:row?.status !== "Approved" ? "not-allowed" :"pointer",opacity:row?.status !== "Approved" ? "0.5" :"1",}} onClick={() => {if (row && row.status === "Approved") {fetchReadbyHandleClick(row?.id)}}}></Image>
            </>
            )
        },
        {
          name:"Action",
          width:"auto",
          selector:(row) => row.action,
          sortable:true,
          cell:(row, index) =>(
            <>
            <ButtonGroup className="dev">
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${uuidv4()}`}
                type="radio"
                variant={
                  radio.value === 0
                    ? "outline-warning"
                    : radio.value === 1
                      ? "outline-success"
                      : radio.value === 2
                        ? "outline-danger"
                        : ""
                }
                name={`radio-${row.id}`}
                value={radio.value}
                checked={radioValue[row.id] === radio.value}
                onChange={() => handleRadioChange(row.id, radio.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          </>
          )
        }
    ]

    
  //for readby start
  const filteredReadbyItems = Readby?.coursereadbyName?.filter(
    (item) =>
    (item.name && item.name.toLowerCase().includes(filterReadbyText.toLowerCase())) 
  );
  
  const subHeaderReadComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterReadbyText) {
        setResetPaginationReadbyToggle(!resetPaginationReadbyToggle);
        setFilterReadbyText('');
      }
    };
  
    return (
      <FilterComponent onFilter={(e) => setFilterReadbyText(e.target.value)} onClear={handleClear} filterText={filterReadbyText} />
    );
  }, [filterReadbyText, resetPaginationReadbyToggle]);
  //for readby end
    
    const filteredItems = adminList.filter(
      (item) =>
      (item.course_title && item.course_title.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.first_name && item.first_name.toLowerCase().includes(filterText.toLowerCase())) || (item.category_name && item.category_name.toLowerCase().includes(filterText.toLowerCase())) || (item.sub_category && item.sub_category.toLowerCase().includes(filterText.toLowerCase()))
    );
    
    
    //for dropdown
    const handleApprovalStatusChange = (status) => {
      const numericStatus = status === "All" ? null : parseInt(status, 10);
      setSelectedAction(numericStatus);
    };
    const filteredItemsByAction = selectedAction === null
  ? filteredItems
  : selectedAction === 0
    ? filteredItems.filter((item) => radioValue[item.id] === selectedAction)
    : filteredItems.filter((item) => radioValue[item.id] === selectedAction);


    const subHeaderComponentMemo = useMemo(() => {
      const handleClear = () => {
        if (filterText || selectedAction!== null) {
          setResetPaginationToggle(!resetPaginationToggle);
          setFilterText('');
          setSelectedAction(null);
        }
      };
    
      return (
        <FilterComponent onFilter={(e) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} onApprovalStatusChange={handleApprovalStatusChange}/>
      );
    }, [filterText, resetPaginationToggle,selectedAction]);



    const conditionalRowStyles = [
      {
        when: (row) => row.indexs % 2 !== 0, // Check if the row is odd fromapi response
        style: {
          backgroundColor: '#FCFAFF',
        },
      },
      
    ];

  //  console.log(adminList, "llllllllllllllllllllllllll")
  //  console.log(Readby, "llllllllllllllllllllllllll")

  return (
    <>
    <div className="readby-modal">
<Modal className='readby-modal' show={modalshow} onHide={() => {setModalShow(false); setReadby([]); setFilterReadbyText('')}} animation={true} >
{modalloading && (
                  <div className="my-loading-overlay">
                    <Spinner
                      as="span"
                      animation="border"
                      role="status"
                      aria-hidden="true"
                      className="my-cardLoading"
                    />
                  </div>
                )}
<Modal.Header  closeButton className='readby-modal'>
        <Modal.Title className='fw500' >Course read list </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{padding:"10px 0 0 0"}}>
      
      <Modal.Title className='fw500 fz20' style={{marginTop:"-5px"}}>{Readby?.courseName}  </Modal.Title>
      <p style={{color:"#4c4c4c"}} className="fz14">{Readby?.categoryName} / {Readby?.subcategoryName}</p> 
   {Readby?.coursereadbyName?.length > 0 && <span className="fz14" style={{backgroundColor:"rgb(232, 232, 232)", padding:"2px 8px"}}>  Total read : <b> {Readby?.coursereadbyName?.length} </b> </span>}   
        <div className='readby-table'>
        
        {Readby?.coursereadbyName && <>
          <Row>
          <Col lg={12}>
          {Readby?.coursereadbyName.length >0 && 
            <>
          <div className="filter-container  custom-filter mart10">
          <FilterComponent  onFilter={(e) => setFilterReadbyText(e.target.value)} onClear={() => setFilterReadbyText('')} filterText={filterReadbyText}  placeholderTxt={"Filter by Name"}/>
          </div>
          </>
        }
          </Col>
        </Row>
          <DataTable  pagination columns={readbycolumns} data={filteredReadbyItems}  subHeaderComponent={subHeaderReadComponentMemo} conditionalRowStyles={conditionalReadbyRowStyles}/>
        </>
        }
        </div>
      </Modal.Body>
</Modal>
    </div>
      <Navbar className="dark_purple_bg" />
      <div className="clearfix"></div>
      <Container fluid className="mart50 marb10">
        <Col lg={8} className="filter-containern mart100 marb30" >
          <FilterComponent statusFilter={true} onFilter={(e) =>setFilterText(e.target.value)} onClear={() => setFilterText('')} filterText={filterText} placeholderTxt={"Filter by course / employee name / category and subcategory"} onApprovalStatusChange={handleApprovalStatusChange}/>
        </Col>
      </Container>
      <Container fluid>
      <div className='rdt_Table'>
        <DataTable pagination columns={columns}  data={filteredItemsByAction} conditionalRowStyles={conditionalRowStyles} subHeaderComponent={subHeaderComponentMemo}/>
        </div>
        {/* {console.log("checkVal",radioValue, "inddd")}
        {console.log("checkValadmin",adminList, "admin")} */}
      </Container>
    </>
  );
};

export default ApprovalHub;
