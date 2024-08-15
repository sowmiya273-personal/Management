import { useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [refreshList, setRefreshList] = useState(false);

  const handleAddOrUpdateEmployee = async (employee) => {
    try {
      const API_URL = 'http://localhost:5000/employees';
      if (employee.id) {
        await axios.put(`${API_URL}/${employee.id}`, employee);
      } else {
        await axios.post(API_URL, employee);
      }
      setCurrentEmployee(null);
      setRefreshList(!refreshList);
    } catch (error) {
      console.log('Operation failed', error);
    }
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <EmployeeForm
            addOrUpdateEmployee={handleAddOrUpdateEmployee}
            currentEmployee={currentEmployee}
          />
        </div>
      </div>
      <EmployeeList setCurrentEmployee={setCurrentEmployee} refreshList={refreshList} />
    </div>
  );
};

export default App;
