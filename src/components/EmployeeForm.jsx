import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const EmployeeForm = ({ addOrUpdateEmployee, currentEmployee }) => {
  const [errors, setErrors] = useState({});
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    employeeId: '',
    mobile: '',
    jobRole: ''
  });

  useEffect(() => {
    if (currentEmployee) {
      setEmployee(currentEmployee);
    }
  }, [currentEmployee]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const { name, email, employeeId, mobile, jobRole } = employee;
    const errors = {};
  
    if (name.length < 3 || name.length > 15) {
      errors.name = 'Name must be between 3 and 15 characters long';
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errors.email = 'Invalid email format';
    }
  
    if (employeeId.length < 4) {
      errors.employeeId = 'Employee ID must be at least 4 characters long';
    }
  
    const mobilePattern = /^\d{10}$/;
    if (!mobilePattern.test(mobile)) {
      errors.mobile = 'Mobile number must be a valid 10-digit number';
    }
  
    if (!jobRole) {
      errors.jobRole = 'Job Role is required';
    }
  
    setErrors(errors);
    
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addOrUpdateEmployee(employee);
      setEmployee({
        name: '',
        email: '',
        employeeId: '',
        mobile: '',
        jobRole: ''
      });
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-success text-white">
        <h2 className="h5">{currentEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={employee.name}
              onChange={handleChange}
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={employee.email}
              onChange={handleChange}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          <div className="form-group">
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              className="form-control"
              value={employee.employeeId}
              onChange={handleChange}
            />
            {errors.employeeId && (
              <small className="text-danger">{errors.employeeId}</small>
            )}
          </div>

          <div className="form-group">
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              className="form-control"
              value={employee.mobile}
              onChange={handleChange}
            />
            {errors.mobile && (
              <small className="text-danger">{errors.mobile}</small>
            )}
          </div>

          <div className="form-group">
            <label>Job Role</label>
            <select
              name="jobRole"
              className="form-control"
              value={employee.jobRole}
              onChange={handleChange}
            >
              <option value="">Select Job Role</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
            {errors.jobRole && (
              <small className="text-danger">{errors.jobRole}</small>
            )}
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            {employee.id ? 'Update Employee' : 'Add Employee'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
