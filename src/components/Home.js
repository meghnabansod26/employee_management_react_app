import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
  Table,
  Container,
  Spinner,
  Modal,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
      setLoading(false);
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.deleteEmployee(id);
      setEmployees(employees.filter((employee) => employee.id !== id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleShowDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedEmployee(null);
    setShowDeleteModal(false);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())||
      employee.mobile.toLowerCase().includes(searchTerm)
  );

  if (loading) return <Spinner animation="border" />;

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employee List</h2>
        <Link to="/add" className="btn btn-dark">
          Add New Employee
        </Link>
      </div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Country</th>
            <th>State</th>
            <th>District</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.country}</td>
              <td>{employee.state}</td>
              <td>{employee.district}</td>
              <td>
                <Link
                  to={`/edit/${employee.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  <FontAwesomeIcon icon={faPen} />
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleShowDeleteModal(employee)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </td>
            </tr>
          ))}
          {filteredEmployees.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the employee{" "}
          <strong>{selectedEmployee?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              selectedEmployee && handleDelete(selectedEmployee.id)
            }
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Home;
