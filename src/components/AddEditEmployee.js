import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import "./AddEditEmployee.css";

const AddEditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    district: "",
  });
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.getCountries();
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError("Failed to load countries");
      }
    };

    const fetchEmployee = async () => {
      if (id) {
        try {
          const response = await api.getEmployeeById(id);
          setEmployee(response.data);
        } catch (error) {
          console.error("Error fetching employee:", error);
          setError("Failed to load employee");
        }
      }
      setLoading(false);
    };

    fetchCountries();
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (id) {
        await api.updateEmployee(id, employee);
      } else {
        await api.createEmployee(employee);
      }
      navigate("/");
    } catch (error) {
      setError("An error occurred while saving the employee.");
      console.error("Error saving employee:", error);
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" />
      </div>
    );

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-container">
            <h2 className="text-center mb-4">
              {id ? "Edit Employee" : "Add Employee"}
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formMobile" className="mb-3">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={employee.mobile}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCountry" className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  as="select"
                  name="country"
                  value={employee.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Country</option>
                  {countries.length > 0 ? (
                    countries.map((country) => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No countries available</option>
                  )}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formState" className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={employee.state}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDistrict" className="mb-3">
                <Form.Label>District</Form.Label>
                <Form.Control
                  type="text"
                  name="district"
                  value={employee.district}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100 btn btn-dark"

              >
                {id ? "Update" : "Create"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEditEmployee;
