import React, { useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid styles
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme styles
import { columnsDefinition } from './ColumnsDef';
import { Toast } from "primereact/toast";
import './Datagrid.css';
import { Button } from "primereact/button";
import { useLocation } from 'react-router-dom';
import GLR from '../assets/GLR-1.png';

const dateFormatter = (params) => {
  if (!params.value) return '';
  const date = new Date(params.value);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const dateParser = (params) => {
  if (!params.newValue) return null;
  const [day, month, year] = params.newValue.split(' ');
  const monthIndex = new Date(Date.parse(month + " 1, 2012")).getMonth(); // Convert month to index
  return new Date(year, monthIndex, day);
};



const Datagrid = () => {
  const [products, setProducts] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [userDepartment, setUserDepartment] = useState(null); // State for user department
  const columnsDefinitiony = columnsDefinition;
  
  const toast = useRef(null);

  const location = useLocation();
  const userInfo = location.state?.user;
  console.log(userInfo?.role)

  const transformColumns = (columns) => {
    return columns
      .filter(col => {
        // Optionally filter columns based on user department
        return true;
      })
      .map(col => ({
        headerName: col.headerName || col.name,
        field: col.field,
        sortable: col.sortable === "true",
        pinned: col.freeze === "true" ? "left" : null,
        editable: col.department.toLowerCase() === userInfo?.role ? true : false,
        filter: true, // Enable filtering
        cellEditor: col.type === "date" ? 'agDateCellEditor' : 'agTextCellEditor', 
        valueFormatter: col.type === "date" ? dateFormatter : null,
        valueParser: col.type === "date" ? dateParser : null,
        cellClass: col.department.toLowerCase() === userInfo?.role ? 'editable-cell' : null // Apply class for editable columns
      }));
  };

  const columnDefs = transformColumns(columnsDefinitiony, userDepartment);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3030/study`);
        const result = await response.json();
        
        // Extract the relevant data
        const { data } = result;
        setProducts(data);

        // Optionally set user department based on your application logic
        // Example:
        // const departmentResponse = await fetch(`http://localhost:3030/user/department`);
        // const departmentResult = await departmentResponse.json();
        // setUserDepartment(departmentResult.department);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const sendData = async (id, data, department) => {
    const raw = JSON.stringify(data);
    const dept = department !== 'MAIL COMMUNICATION' ? department.toLowerCase() : 'mailCommunication';

    try {
      const response = await fetch(`http://localhost:3030/${dept}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: raw
      });

      if (!response.ok) {
        toast.current.show({ severity: 'error', summary: 'Info', detail: 'Update Failed. Please try again.' });
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      toast.current.show({ severity: 'success', summary: 'Info', detail: 'Update Successful' });
      return result;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleCellValueChanged = (event) => {
    const { data, colDef, newValue, oldValue } = event;

    console.log(`Changed cell from ${oldValue} to ${newValue} in column ${colDef.field}`);

    if (colDef.field === 'someField' && newValue < 0) {
      alert('Value cannot be negative');
      event.node.setDataValue(colDef.field, oldValue);
    }

    const datasent = {
      [colDef.field]: newValue,
      updated_by: 'SD',
      update_dttm: new Date()
    };

    function getDepartmentByField(field) {
      for (const column of columnsDefinition) {
        if (column && column.field === field) {
          return column.department || 'Field does not have a department';
        }
      }
      return 'Field not found';
    }

    const department = getDepartmentByField(colDef.field);
    sendData(data.study_number, datasent, department)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const exportToCSV = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv();
    } else {
      console.error('Grid API is not available.');
    }
  };

  const addNewRow = () => {
    // Create a new row object with default values based on column definitions
    const newRow = columnDefs.reduce((row, col) => {
      row[col.field] = ''; // Initialize each field with an empty string or default value
      return row;
    }, {});

    // Add the new row to the beginning of the products array
    setProducts([newRow, ...products]);
  };
  return (
    <>
      <Toast ref={toast} />
      <span className="button-container">
  <img src={GLR} alt="Logo" className="logo" />
  <Button
    className="center-button"
    label="Add New Row"
    type="button"
    rounded
    onClick={addNewRow}
    data-pr-tooltip="Add New Row"
  />
  <Button
    className="right-button"
    label="Export as CSV"
    type="button"
    rounded
    onClick={exportToCSV}
    data-pr-tooltip="Export CSV"
  />
  {/* - */}
</span>
      <div className="ag-theme-quartz" style={{ height: 1500, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={products}
          pagination={true}
          paginationPageSize={10}
          singleClickEdit={true}
          onCellValueChanged={handleCellValueChanged}
          onGridReady={onGridReady}
          domLayout='autoHeight'
          rowClassRules={{
            'fixed-row': params => params.rowIndex === 0
          }}
        />
      </div>
    </>
  );
};

export default Datagrid;
