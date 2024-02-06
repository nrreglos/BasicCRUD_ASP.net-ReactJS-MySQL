import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

function EmployeeCrud() {
  const empInfoHeader = [
    "Employee Id",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Option",
  ];
  const [EmpId, setId] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [employees, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const employees = await axios.get(
      "http://localhost:5086/api/Employee/GetEmployee"
    );
    setUsers(employees.data);
    console.log(employees);

    return employees;
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5086/api/Employee/AddEmployee", {
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Phone: Phone,
      });
      alert("Student Registration Successfully");
      setId("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");

      Load();
    } catch (err) {
      alert(err);
    }
  }
  async function editEmployee(empId) {
    const employeeToEdit = employees.find(
      (employee) => employee["empId"] === empId
    );

    if (employeeToEdit) {
      setId(employeeToEdit["empId"]);
      setFirstName(employeeToEdit["firstName"]);
      setLastName(employeeToEdit["lastName"]);
      setEmail(employeeToEdit["email"]);
      setPhone(employeeToEdit["phone"]);
    }
  }

  async function DeleteEmployee(empId) {
    const employeeToDelete = employees.find(
      (employee) => employee["empId"] === empId
    );
    if (employeeToDelete) {
      setId(employeeToDelete["empId"]);
      await axios.delete(
        "http://localhost:5086/api/Employee/DeleteEmployee/" +
          employeeToDelete["empId"]
      );
      alert("Employee Deleted Successfully");
    }
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "http://localhost:5086/api/Employee/UpdateEmployee/${EmpId}",
        {
          EmpId: EmpId,
          FirstName: FirstName,
          LastName: LastName,
          Email: Email,
          Phone: Phone,
        }
      );
      alert("Registration Updated");
      setId("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");

      Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Fragment>
      <Form className="container mt-4">
        <Form.Group className="mb-3" controlId="inputEmpId">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Employee Id"
            hidden
            value={EmpId}
            onChange={(event) => {
              setId(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="inputFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            value={FirstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="inputLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={LastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="inputEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="E-mail"
            value={Email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="inputPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone"
            value={Phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </Form.Group>
      </Form>

      <br></br>
      <Table responsive="sm" className="table table-dark">
        <thead>
          <tr align-items="center">
            {empInfoHeader.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee["empId"]} align-items="center">
              <td>{employee["empId"]}</td>
              <td>{employee["firstName"]}</td>
              <td>{employee["lastName"]}</td>
              <td>{employee["email"]}</td>
              <td>{employee["phone"]}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editEmployee(employee["empId"])}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => DeleteEmployee(employee["empId"])}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
}

export default EmployeeCrud;
