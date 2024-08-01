import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams, Link } from 'react-router-dom';
import { Button, Container, Row, Col, Spinner } from 'react-bootstrap';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.getEmployeeById(id);
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee:', error);
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <Spinner animation="border" />;

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h2>Employee Details</h2>
          <div>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Mobile:</strong> {employee.mobile}</p>
            <p><strong>Country:</strong> {employee.country}</p>
            <p><strong>State:</strong> {employee.state}</p>
            <p><strong>District:</strong> {employee.district}</p>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Link to={`/edit/${id}`}>
            <Button variant="primary">Edit</Button>
          </Link>
        </Col>
        <Col className="text-end">
          <Link to="/">
            <Button variant="secondary">Back to List</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeDetails;
