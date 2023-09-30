import React from 'react';
import '../assets/css/global.css';
import '../assets/css/custom.css';
import { Button, Col, Container, Row, Table, Pagination, Dropdown } from 'react-bootstrap';
import Navbar from '../Components/header/navbar';
import data from '../api/SubCategiriesAdd.js';
import {Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import next_ion from '../assets/images/next_ion.png';
import prev_ion from '../assets/images/prev_ion.png';
import first_ion from '../assets/images/first_ion.png';
import last_ion from '../assets/images/last_ion.png';
const SubCategiriesAdd = () => {
  return (
    <div>
      <Navbar className='dark_purple_bg'/>
      <Container fluid>
        <Row>
          <Col lg={12}>
              <Button className='dark_purple_bg padl50 padr50 fz18 br0 mart30 marb30 fr marr30 bor_dark_purple' style={{borderRadius:'5px'}}>+ Add</Button>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
          <Table  striped responsive="sm" className='lmstbl'>
            <thead>
              <tr> 
                <th style={{borderTopLeftRadius:'10px'}}>{data.idNumber}</th> 
                <th>{data.subTitle}</th>
                <th>{data.maincategory}</th>
                <th>{data.bannertitle}</th>
                <th width="100px" style={{borderTopRightRadius:'10px'}}>{data.action}</th>
              </tr>
            </thead>
            <tbody>
              {
                data.content.map(course =>
                <tr>
                  <td key={course.id}>{course.id}</td>
                  <td className='fw400 fz16 light_black'><Image src={course.image} className='marr10' style={{width:'35px'}}/>{course.sub}</td>
                  <td>{course.main}</td>
                  <td><Link className='border dif padt5 padr20 padb5 padl20 black tdn white_bg btn_color br5'>{course.bannerbtn}</Link></td>
                  <td>
                    <div className='dif'>
                      <Link className='padl20 padr20'><Image src={course.edit_img} className='img_action'/></Link>
                      <Link className='padl20 padr20'><Image src={course.delete_img} className='img_action'/></Link>
                    </div>
                  </td>
                </tr>    
                  )
              }
            </tbody>
          </Table>
          </Col>
          </Row>
          <div className='light_purple_bg'>
          <Row>
            <Col lg={6}>
              <div className='pad20 dif'>
                <p className='lh30'>Items per page</p>
              <Dropdown>
                <Dropdown.Toggle variant="default" id="dropdown-basic" style={{borderRadius:'0',background:'#fff',border:'1px solid #000'}} className='marr10 marl10'>
                 25
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">50</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">100</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">200</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <p className='lh35'>1-25 of 100 items</p>
              </div>
            </Col>
            <Col lg={6}>
            <div className='fr dif pad20'>
              <Pagination style={{marginBottom:'0'}}>
              <Pagination.Item><Image src={first_ion} className='marr5 posr' style={{bottom:'1px'}}></Image></Pagination.Item>
              <Pagination.Item><Image src={prev_ion} className='marr10 posr' style={{bottom:'1px'}}></Image>{"Back"}</Pagination.Item>
                <Pagination.Item className='padination_active'>{3}</Pagination.Item>
                <Pagination.Item className='black'>{"of"}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>
                <Pagination.Item>{"Next"}<Image src={next_ion} className='marl10 posr' style={{bottom:'1px'}}></Image></Pagination.Item>
                <Pagination.Item><Image src={last_ion} className='marl5 posr' style={{bottom:'1px'}}></Image></Pagination.Item>
              </Pagination>
            </div>
            </Col>
          </Row>
          </div>
      </Container>
    </div>
  )
}

export default SubCategiriesAdd