// FilterComponent.js
import React from 'react';
import { Form } from "react-bootstrap";

const FilterComponent = ({ onFilter, onClear, filterText,placeholderTxt,onApprovalStatusChange,statusFilter }) => (
  <div className='main-div'>
 <div className='input-container'>
 <input
    className='filter-input-input'
      id="search"
      type="text"
      placeholder={placeholderTxt}
      value={filterText}
      onChange={onFilter}
  />
  {filterText && ( 
    <>
      <span className='clear-icon' onClick={onClear}> X </span>
        {/* <FaTimes className="clear-icon" onClick={onClear} /> */}
    </>
      )}
 </div>
    
  
    {/* <button className='filter-button-clr' onClick={onClear}>Clear</button> */}
    {/* <Dropdown className='filter-status'>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Filter by Status
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onApprovalStatusChange("All")}>
          All
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onApprovalStatusChange(1)}>
          Approve
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onApprovalStatusChange(2)}>
          Reject
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onApprovalStatusChange(0)}>
          Pending
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> */}
    {statusFilter && (
    <div>
      {/* <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label> */}
      <Form.Select id="statusFilter" defaultValue="-1" className="marl20 h40 light_black bor1 filter-status" style={{border:"1px solid #6f3fba !important"}} onChange={(e) => onApprovalStatusChange(e.target.value)}>
      <option disabled value="-1"> Filter by status</option>
        <option value="All">All</option>
        <option value="1">Approve</option>
        <option value="2">Reject</option>
        <option value="0">Pending</option>
      </Form.Select>
    </div>
    )}
  </div>
  /* <>
    <Form className=" main-div mb-3">
      <FormControl
      className='filter-input-input'
        type="text"
        placeholder={placeholderTxt}
        onChange={onFilter}
        value={filterText}
      />
      <Button variant="filter-button-clr" onClick={onClear}>
        Clear
      </Button>
    </Form>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Filter by Status
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onApprovalStatusChange("ll")}>
          All
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onApprovalStatusChange(1)}>
          Approve
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onApprovalStatusChange(2)}>
          Reject
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onApprovalStatusChange(0)}>
          Pending
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </> */
);

export default FilterComponent;
