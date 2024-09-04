import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";

import { parse } from 'date-fns';

import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import Header from "../components/Header"
import FunctionalHeader from "./FunctionalHeader";
import { columnsDefinition } from "./ColumnsDef";
import './AllTestView.css'
// import Login10 from "../../login-form-20";


export default function AllTestView(props) {
  const [products, setProducts] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filterText, setFilterText] = useState(""); 
  const [editingCell, setEditingCell] = useState(null);
  // const [tempDate, setTempDate] = useState(null);

  const handleCellClick = (rowData, column) => {
    setEditingCell({ rowData, column });
    // setTempDate(rowData[column.field]);
  };
  

  const columns = columnsDefinition

  const location = useLocation();
  const userInfo = location.state?.user

  const dt = useRef(null);
  const toast = useRef(null);


  useEffect(() => {
    const fetchData = async (page,size) => {
      setLoading(true)
      try {
          // Fetch data from all endpoints concurrently
          const [sdResponse, qaResponse, mailResponse, edpResponse, accountsResponse, studyResponse] = await Promise.all([
              fetch(`http://localhost:3030/sd?page=${page}&size=${size}`),
              fetch(`http://localhost:3030/qa?page=${page}&size=${size}`),
              fetch(`http://localhost:3030/mailCommunication?page=${page}&size=${size}`),
              fetch(`http://localhost:3030/edp?page=${page}&size=${size}`),
              fetch(`http://localhost:3030/accounts?page=${page}&size=${size}`),
              fetch(`http://localhost:3030/study?page=${page}&size=${size}`)
          ]);
          
          
           const [sdResult, qaResult, mailResult, edpResult, accountsResult, studyResult] = await Promise.all([
            sdResponse.json(),
            qaResponse.json(),
            mailResponse.json(),
            edpResponse.json(),
            accountsResponse.json(),
            studyResponse.json()
        ]);
        console.log(studyResult)
        setTotalRecords(studyResult.totalItems);
       

        // Create maps for faster lookup
        const qaMap = new Map(qaResult.data.map(item => [item.study_number, item]));
        const mailMap = new Map(mailResult.data.map(item => [item.study_number, item]));
        const edpMap = new Map(edpResult.data.map(item => [item.study_number, item]));
        const accountsMap = new Map(accountsResult.data.map(item => [item.study_number, item]));
        const sdMap = new Map(sdResult.data.map(item => [item.study_number, item]));
        
        console.log(qaMap)
        const consolidation = studyResult.data.map(studyItem => ({
          ...studyItem,
          ...qaMap.get(studyItem.study_number) || {}, // Merge with QA data if available
          ...mailMap.get(studyItem.study_number) || {}, // Merge with Mail data if available
          ...edpMap.get(studyItem.study_number) || {}, // Merge with EDP data if available
          ...accountsMap.get(studyItem.study_number) || {}, // Merge with Accounts data if available
          ...sdMap.get(studyItem.study_number) || {},
        }))

          // Set consolidated data to state
          setProducts(consolidation);
          setLoading(false)
      } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
      }
  };

    fetchData(page,size);
  }, [page,size]); // eslint-disable-line react-hooks/exhaustive-deps



  
  const textEditor = (options) => {
    const { field } = options;
    const dept = getDepartmentByField(field)
      console.log('Coming here ', dept.toLowerCase(), userInfo, dept.toLowerCase === userInfo.role)
      return (
        <InputText
          type="text"
          value={options.value}
          onChange={(e) => options.editorCallback(e.target.value)}
          onKeyDown={(e) => e.stopPropagation()}
          disabled={!(dept.toLowerCase() === userInfo.role)}
        />
      );
};

    const onPage = (event) => {
      setPage(parseInt(event.first / size)); // Calculate page index
      console.log(page)
    };

    const onPageSizeChange = (event) => {
      setSize(parseInt(event.value));
      setPage(0); // Reset to first page when size changes
    };

  // Define the function to send the POST request
async function sendData(id, data, department) {
  console.log('This method is called', id)
  const raw = JSON.stringify(data);
  const dept = department !== 'MAIL COMMUNICATION' ? department.toLowerCase() : 'mailCommunication'
  // if(dept === userInfo.role) {
  try {
    const response = await fetch(`http://localhost:3030/${dept}/${id}`, {
        method: 'PUT', // Specify the request method
      headers: {
        'Content-Type': 'application/json' // Specify the content type as JSON
      },
      body: raw // Convert the id and data to a JSON string
    });

    if (!response.ok) {
      toast.current.show({ severity: 'error', summary: 'Info', detail: 'Update Failed. Please try again.' });
      throw new Error('Network response was not ok');
    }

    const result = await response.json(); // Parse the JSON response
    console.log('Success:', result);
    toast.current.show({ severity: 'success', summary: 'Info', detail: 'Update Successful' });
    return result;
  } catch (error) {
    console.error('Error:', error);
  }

// }
}

  function getDepartmentByField(field) {
    for (const column of columns) {
      if (column && column.field === field) {
          return column.department || 'Field does not have a department';
      }
  }
    return 'Field not found';
  }

  const onCellEditComplete = async (e) => {
    setLoading(true)
    let { rowData, newValue, field, originalEvent: event, column } = e;
    const study_number = rowData.study_number;
    const department = getDepartmentByField(field)
    
    const data = {
      [field]: newValue,
      updated_by: userInfo.name, 
      update_dttm: new Date()
  };
    try {
    const res = await sendData(study_number, data, department);
    setLoading(false)
    // fetchData(page,size)
    return res
    } catch (e) {
      setLoading(false)
      return e
    }
  } 


  function formatDate(dateString) {
    // Parse the input date string to a Date object
    const date = new Date(dateString);

    // Get the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
    const day = String(date.getDate()).padStart(2, '0');

    // Return the formatted date string
    return `${year}-${month}-${day}`;
}

  const updateDate = async (id, field, newDate) => {
    // setLoading(true)
    console.log('Here')
    const department = getDepartmentByField(field)
    const requestDate = formatDate(newDate)
    console.log(userInfo?.role)
    const data = {
      [field]: requestDate, 
      updated_by: userInfo?.name, 
      update_dttm: new Date()
    };
    try {
    const res = await sendData(id, data, department);
    // setLoading(false)
    return res
    } catch(e) {
      // setLoading(false)
      return e
    }
  };

  const parseDate = (dateStr) => {
    if(dateStr === undefined || null ) {
      return;
    }
    if (typeof dateStr === "object" && dateStr instanceof Date) {
      const day = dateStr.getDate().toString().padStart(2, "0");
      const month = (dateStr.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
      const year = dateStr.getFullYear();
      dateStr = `${day}/${month}/${year}`;
    }

    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  // Custom body template to render the Calendar component
  const dateTemplate = (rowData, field) => {
    try {
    const dept = getDepartmentByField(field)
    const dep = dept.toLowerCase()
    const dateValue1 = rowData[field] ? rowData[field] : null
    console.log(dateValue1)
    const dateValue = dateValue1 ? parse(dateValue1, 'MMMM d, yyyy', new Date()) : null;
    // const dateValue = rowData[field] ? parseDate(rowData[field]) : null
    // if (editingCell && editingCell.rowData.id === rowData.id && editingCell.column.field === column.field) {
    return (
      <Calendar
        value={dateValue}
        onChange={(e) => updateDate(rowData.study_number, field, e.value)}
        dateFormat="MM dd,yy"
        // disabled={!(dep === 'sd')}
      />
    );
    // }
    } catch (e) {
      console.log(e)
    }
  };



  // const renderHeader = () => {
  //   return (
  //     <div className="flex justify-content-between"> 
  //         <Button type="button" icon="pi pi-file" rounded onClick={() => downloadCSV()} data-pr-tooltip="Export as CSV" style={{ marginLeft: '100px'}} />
  //     </div>
  //   );
  // };

  const headerGroup = (
    <ColumnGroup>
       <Row>
        {columns.map(({ department }) => {
          return (
            <Column
              header={department}
            />
          );
        })}
      </Row>
      <Row>
        {columns.map(({ field, header, sortable, freeze }) => {
          return (
            <Column
              key={field}
              field={field}
              frozen={freeze}
              header={header}
              sortable={sortable}
              style={{ width: "25%" }}
              editor={(options) => textEditor(options)}
              onCellEditComplete={onCellEditComplete}
              filter
              filterField={field}
            />
          );
        })}
      </Row>
    </ColumnGroup>
  );

  const rowsOptions = [5, 10, 25, 50]
  return (
      <div>
      <Header {...userInfo} />
      <FunctionalHeader products={products} setProducts={setProducts} />
      <div style={{ marginTop: "10px" }}>
        <div className="flex justify-content-between"> 
        
        <select value={size} onChange={(e) => onPageSizeChange(e.target)}>
        <span>Rows per page: </span>
          {[10,25,50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
      </div>
      {/* <div style={{ marginTop: '20px' }}></div> */}
      {/* {userInfo ?  */}
      <>
      <Toast ref={toast} />
      <DataTable
      scrollable
        showGridlines
        value={products}
        // header={renderHeader}
        editMode="cell"
        resizableColumns
        tableStyle={{ minWidth: "50rem" }}
        removableSort
        paginator
        rows={size}
        first={page * size}
        rowsPerPageOptions={rowsOptions}
        onPageSizeChange={onPageSizeChange}
        ref={dt}
        headerColumnGroup={headerGroup}
        loading={loading}
        // scrollHeight="1000px"
        // paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        lazy
        onPage={onPage}
        totalRecords={totalRecords}
      >

        {columns.map(({ field, header, type, freeze, department }) => {
          return type == "date" && department === 'MAIL COMMUNICATION' ? (
            <Column
              key={field}
              header={header}
              field={field}
              body={(rowData) => dateTemplate(rowData, field)}
              onCellClick={(e) => handleCellClick(e.data, e.column)}
              onCellEditComplete={onCellEditComplete}
            />
          ) : (
            <Column
              key={field}
              field={field}
              header={header}
              frozen={freeze}
              alignFrozen="left"
              sortable={true}
              style={{ width: "25%", zIndex: 2 }}
              // editor={(options) => textEditor(options)}
              // onCellEditComplete={onCellEditComplete}
            />
          );
        })}
      </DataTable>
      </> 
       {/* : <Login10 /> */}
{/* } */}
    </div>
  );
}
