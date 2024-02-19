// FilterComponent.js
import React from 'react';
import { Form } from "react-bootstrap";

const FilterComponent = ({ onFilter, onClear, filterText,placeholderTxt,onApprovalStatusChange,statusFilter, categoryOptions, onCategoryChange, selectedCategory}) => (
  <div className='main-div'>
 <div className='input-container'>
 <input
    className='filter-input-input'
      id="search"
      type="text"
      placeholder={placeholderTxt}
      value={filterText }
      onChange={onFilter}
      // style={{ fontSize: '5px' }}
  />
  {filterText && ( 
    <>
      <span className='clear-icon' onClick={onClear}> X </span>
        {/* <FaTimes className="clear-icon" onClick={onClear} /> */}
    </>
      )}
 </div>
    
  
    
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

{categoryOptions && (
  <Form.Select
      style={{border:"1px solid #6f3fba !important"}}
      className="marl20 category-dropdown"
      onChange={onCategoryChange}
      value={selectedCategory}
    >
      <option value="">All Categories</option>
      {categoryOptions.map((category, index) => (
        <option key={index} value={category.category_id}>
          {category.category_name}
        </option>
      ))}
    </Form.Select>
)}
   

  </div>
  
);

export default FilterComponent;
