import React from 'react';
import { Button, Col, Container, Row, Table, Pagination } from 'react-bootstrap';
import Navbar from '../Components/header/navbar';
import '../assets/css/custom.css';
import data from '../api/SubCategiriesAdd.js';
import {Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
const SubCategiriesAdd = () => {
  let active = 2;
let items = [];
for (let number = 1; number <= 3; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}
  return (
    <div>
      <Navbar className='dark_purple_bg'/>
      <Container fluid>
        <Row>
          <Col lg={12}>
              <Button className='dark_purple_bg padl50 padr50 fz18 br0 mart30 marb30 fr marr30 bor_dark_purple'>+ Add</Button>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
          <Table bordered  striped responsive="sm">
            <thead style={{background:'#000 !important'}}>
              <tr>
                <th>{data.idNumber}</th> 
                <th>{data.subTitle}</th>
                <th>{data.maincategory}</th>
                <th>{data.bannertitle}</th>
                <th>{data.action}</th>
              </tr>
            </thead>
            <tbody>
              {
                data.content.map(course =>
                <tr>
                  <td key={course.id}>{course.id}</td>
                  <td className='fw400 fz16 light_black'><Image src={course.image} className='marr10' style={{width:'35px'}}/>{course.sub}</td>
                  <td>{course.main}</td>
                  <td><Link className='border dif padt5 padr20 padb5 padl20 black tdn white_bg'>{course.bannerbtn}</Link></td>
                  <td>
                    <div className='dif'>
                      <Link className='padl20 padr20'><Image src={course.edit_img}/></Link>
                      <Link className='padl20 padr20'><Image src={course.delete_img}/></Link>
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
            
            </Col>
            <Col lg={6}>
            <div className='fr dif'>
              <Pagination>
                <Pagination.Prev />
                <Pagination.Ellipsis />
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item className='black'>{'of'}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Next />
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