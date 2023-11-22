// DataTable.js

import React from 'react';
import { Container, Row, Col, Table, Image,  Dropdown, Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import first_ion from '../../assets/images/first_ion.png';
import prev_ion from '../../assets/images/prev_ion.png';
import next_ion from '../../assets/images/next_ion.png';
import last_ion from '../../assets/images/last_ion.png';
import EditIcon from "../../assets/images/edit_ion.png";
import DeleteIcon from "../../assets/images/delete_ion.png";

const DataTable = ({ headings, data, itemsPerPageOptions = [25, 50, 100], defaultItemsPerPage = 25 }) => {
  // const defaultHeadings = ['Si. No', 'ID', 'Sub Title', 'Main Category', 'Banner Title', 'Actions'];
  const defaultActions = { edit: 'Edit', delete: 'Delete' };

  // const mergedHeadings = [...headings.slice(0, 5), ...headings, headings[headings.length - 1]];

  const mergedData = data.map((row, index) => ({
    ...row,
    'Si. No': index + 1,
    Actions: defaultActions,
    ...row.Actions,
  }));

  return (
    <Container fluid  >
      <Row>
        <Col lg={12}>
          <Table striped responsive="sm" className="lmstbl">
            <thead>
              <tr>
                {headings.map((heading, index) => (
                  <th
                    key={index}
                    style={{
                      borderTopLeftRadius: index === 0 ? "10px" : "0",
                      borderTopRightRadius: index === headings.length - 1 ? "10px" : "0",
                      width: heading === 'Course Name' ? '300px' : 'auto',// Set width for Thumbnail
                      // width: heading === 'Actions' ? '30px' : 'auto',
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mergedData.map((row) => (
                <tr className="lh30" key={row['Si. No']}>
                  {headings.map((field, index) => (
                    <td key={index}>
                      {field === 'Thumbnail' ? (
                        <Image src={row[field]} alt="Thumbnail" style={{ width: '90px', height:"50px",objectFit:"cover" }} />
                      ) : field === 'Actions' ? (
                        <div className="dif">
                          <Link className="">
                            <Image src={EditIcon} className="img_action" alt="Edit" />
                          </Link>
                          <Link className="padl20 padr20">
                            <Image src={DeleteIcon} className="img_action" alt="Delete" />
                          </Link>
                        </div>
                      ) : (
                        row[field]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <div className="light_purple_bg">
        <Row>
          <Col lg={6}>
            <div className="pad20 dif">
              <p className="lh30">Items per page</p>
              <Dropdown>
                <Dropdown.Toggle
                  variant="default"
                  id="dropdown-basic"
                  className="marr10 marl10"
                >
                  {defaultItemsPerPage}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {itemsPerPageOptions.map((option) => (
                    <Dropdown.Item key={option} href={`#/action-${option}`}>
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <p className="lh35">1-{defaultItemsPerPage} of {data.length} items</p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="fr dif pad20">
              <Pagination style={{ marginBottom: "0" }}>
                <Pagination.Item>
                  <Image
                    src={first_ion}
                    className="marr5 posr"
                    style={{ bottom: "1px" }}
                  ></Image>
                </Pagination.Item>
                <Pagination.Item>
                  <Image
                    src={prev_ion}
                    className="marr10 posr"
                    style={{ bottom: "1px" }}
                  ></Image>
                  {"Back"}
                </Pagination.Item>
                <Pagination.Item>
                  {3}
                </Pagination.Item>
                <div className="black" style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', marginRight: '10px' }}>{"of"}</div>
                <Pagination.Item className="padination_active">{4}</Pagination.Item>
                <Pagination.Item>
                  {"Next"}
                  <Image
                    src={next_ion}
                    className="marl10 posr"
                    style={{ bottom: "1px" }}
                  ></Image>
                </Pagination.Item>
                <Pagination.Item>
                  <Image
                    src={last_ion}
                    className="marl5 posr"
                    style={{ bottom: "1px" }}
                  ></Image>
                </Pagination.Item>
              </Pagination>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

DataTable.propTypes = {
  headings: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  defaultItemsPerPage: PropTypes.number,
};

export default DataTable;
