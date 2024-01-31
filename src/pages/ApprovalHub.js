import React,{ useEffect, useState,useMemo} from "react";
import Navbar from "../Components/header/navbar.js";
import { ButtonGroup, Col, Container, ToggleButton } from "react-bootstrap";
import DataTable from "react-data-table-component";
import FilterComponent from "../Components/Utils/CourseFilter.js";
// import img2 from "../assets/images/sub_9.png";
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
            width: "33%",      
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
          width:"10%",
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
          name:"View",
          // selector
          cell: row => (
          <>
          {/* <div>{console.log(row, 'check superadmin linkClick')}</div> // hide console from Below link========> onClick={()=> setGetPreviewCourseID(row?.id)} */}
          <Link to={`/PreviewCourse/${row?.id}`}  style={{textDecoration:"none"}} className="view-btn">View</Link>  
          </>
          )
        },
        {
          name:"Action",
          width:"17%",
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
        if (filterText || selectedAction !== null) {
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

  return (
    <>
      <Navbar className="dark_purple_bg" />
      <div className="clearfix"></div>
      <Container fluid className="mart50 marb10">
        <Col lg={6} className="filter-containern">
          <FilterComponent statusFilter={true} onFilter={(e) =>setFilterText(e.target.value)} onClear={() => setFilterText('')} filterText={filterText} placeholderTxt={"Filter by course title / employee name / category and subcategory"} onApprovalStatusChange={handleApprovalStatusChange}/>
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
