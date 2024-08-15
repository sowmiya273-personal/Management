import { useEffect, useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const EmployeeList = ({ setCurrentEmployee, refreshList }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, [refreshList]);  // The employee list will refresh whenever `refreshList` changes

  const fetchEmployees = async () => {
    try {
      const API_URL = 'http://localhost:5000/employees';
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      console.log('Failed to fetch employees', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const API_URL = 'http://localhost:5000/employees';
        await axios.delete(`${API_URL}/${id}`);
        fetchEmployees();
      } catch (error) {
        console.log('Failed to delete employee', error);
      }
    }
  };

  return (
    <table className="table table-hover">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Employee ID</th>
          <th>Mobile</th>
          <th>Job Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.employeeId}</td>
            <td>{employee.mobile}</td>
            <td>{employee.jobRole}</td>
            <td>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => setCurrentEmployee(employee)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(employee.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
