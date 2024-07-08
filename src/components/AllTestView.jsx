import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Calendar } from "primereact/calendar";
import {debounce} from 'lodash';

import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Tag } from "primereact/tag";
import Header from "../components/Header"
import { columnsDefinition } from "./ColumnsDef";
import './AllTestView.css'
import Login10 from "../../login-form-20";


export default function AllTestView(props) {
  const [products, setProducts] = useState([]);
  const [csvProducts, setCsvProducts] = useState([]);
  
  const [filters, setFilters] = useState({});
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [totalRecords, setTotalRecords] = useState(0);

  const columns = columnsDefinition

  const location = useLocation();
  const userInfo = location.state?.user

  const dt = useRef(null);
  const toast = useRef(null);

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
};


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
  
    initFilters();
    fetchData(page,size);
  }, [page,size]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFilter = (event) => {
    // Handle column filters
    setFilters(event.filters);
    setPage(0); // Reset page when filters change
  };



  const handleSearch = (event) => {
    setGlobalFilterValue(event.target.value);
  }
  

  const fetchCsvData = async () => {
    setLoading(true)
    try {
        // Fetch data from all endpoints concurrently
        const [sdResponse, qaResponse, mailResponse, edpResponse, accountsResponse, studyResponse] = await Promise.all([
            fetch(`http://localhost:3030/sd/csv`),
            fetch(`http://localhost:3030/qa/csv`),
            fetch(`http://localhost:3030/mailCommunication/csv`),
            fetch(`http://localhost:3030/edp/csv`),
            fetch(`http://localhost:3030/accounts/csv`),
            fetch(`http://localhost:3030/study/csv`)
        ]);
        // setTotalRecords(10);
        
         const [sdResult, qaResult, mailResult, edpResult, accountsResult, studyResult] = await Promise.all([
          sdResponse.json(),
          qaResponse.json(),
          mailResponse.json(),
          edpResponse.json(),
          accountsResponse.json(),
          studyResponse.json()
      ]);

      console.log(qaResult)

      // Create maps for faster lookup
      const qaMap = new Map(qaResult.map(item => [item.study_number, item]));
      const mailMap = new Map(mailResult.map(item => [item.study_number, item]));
      const edpMap = new Map(edpResult.map(item => [item.study_number, item]));
      const accountsMap = new Map(accountsResult.map(item => [item.study_number, item]));
      const sdMap = new Map(sdResult.map(item => [item.study_number, item]));
      
      console.log(qaMap)
      const consolidation = studyResult.map(studyItem => ({
        ...studyItem,
        ...qaMap.get(studyItem.study_number) || {}, // Merge with QA data if available
        ...mailMap.get(studyItem.study_number) || {}, // Merge with Mail data if available
        ...edpMap.get(studyItem.study_number) || {}, // Merge with EDP data if available
        ...accountsMap.get(studyItem.study_number) || {}, // Merge with Accounts data if available
        ...sdMap.get(studyItem.study_number) || {},
      }))
      console.log(consolidation)
        // Set consolidated data to state
        setLoading(false)
        return consolidation
    } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
    }
};

    const convertToCSV = (data) => {
      try {
      const csvHeader = Object.keys(data[0]).join(',');
      const csvContent = data.map(row => Object.values(row).join(',')).join('\n');
      return `${csvHeader}\n${csvContent}`;
      } catch (e) {
        console.log(e)
      }
    };

    const downloadCSV = async () => {
      const csvTests = await fetchCsvData()
      const csvData = convertToCSV(csvTests);
      console.log(csvTests)
      console.log(csvData)
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'combined_data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

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
      setPage(event.first / size); // Calculate page index
      console.log(page)
    };

    const onPageSizeChange = (event) => {
      setSize(event.value);
      setPage(0); // Reset to first page when size changes
    };


  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      study_number: { value: null, matchMode: FilterMatchMode.EQUALS },
      sponsor: { value: null, matchMode: FilterMatchMode.EQUALS },
      sd_name: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    setGlobalFilterValue("");
  };

  // Define the function to send the POST request
async function sendData(id, data, department) {
  console.log('This method is called', department)
  const raw = JSON.stringify(data);
  const dept = department !== 'MAIL COMMUNICATION' ? department.toLowerCase() : 'mailCommunication'
  if(dept === userInfo.role) {
  try {
    const response = await fetch(`http://localhost:3030/${department}/${id}`, {
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

}
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
    let { rowData, newValue, field, originalEvent: event } = e;
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
    console.log()
    const department = getDepartmentByField(field)
    const requestDate = formatDate(newDate)
    console.log(userInfo.role)
    const data = {
      [field]: requestDate, 
      updated_by: userInfo.name, 
      update_dttm: new Date()
    };
    try {
    const res = await sendData(id, data, department);
    // setLoading(false)
    return res
    } catch {
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
    const dateValue = rowData[field] ? parseDate(rowData[field]) : null
    return (
      <Calendar
        value={dateValue}
        onChange={(e) => updateDate(rowData.study_number, field, e.value)}
        dateFormat="MM dd,yy"
        disabled={!(dep === userInfo.role)}
      />
    );
    } catch (e) {
      console.log(e)
    }
  };



  const clearFilter = () => {
    initFilters();
  };


  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between"> 
          <Button type="button" icon="pi pi-file" rounded onClick={() => downloadCSV()} data-pr-tooltip="Export as CSV" style={{ marginLeft: '100px'}} />
      </div>
    );
  };

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

  const rowsPerPage = [5, 10, 25, 50];
  const [statuses] = useState(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);

  const statusRowFilterTemplate = (options) => {
    return (
        <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
    );
};

  return (
      <div>
      <Header {...userInfo} />
      {/* <div style={{ marginTop: '20px' }}></div> */}
      {userInfo ? 
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
        rowsPerPageOptions={[5, 10, 25, 50]}
        onPageSizeChange={onPageSizeChange}
        ref={dt}
        // filters={filters}
        filterDisplay="row"
        globalFilterFields={["study_number", "sponsor", "sd_name"]}
        headerColumnGroup={headerGroup}
        loading={loading}
        // scrollHeight="1000px"
        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        // currentPageReportTemplate={page} 
        // paginatorLeft={paginatorLeft} 
        // paginatorRight={paginatorRight}
        lazy
        onPage={onPage}
        totalRecords={totalRecords}
        // onFilter={onFilter}
        // filters={filters}
        // globalFilter={globalFilterValue}
      >

        {columns.map(({ field, header, type, freeze, department }) => {
          return type == "date" ? (
            <Column
              key={field}
              header={header}
              field={field}
              body={(rowData) => dateTemplate(rowData, field)}
              onCellEditComplete={onCellEditComplete}
            />
          ) : (
            <Column
              key={field}
              field={field}
              header={header}
              frozen={freeze}
              alignFrozen="left"
              filter 
              // filterElement={statusRowFilterTemplate}
              // showFilterMenu={false} filterMenuStyle={{ width: '14rem' }}
              // filter
              // filter 
              // filterElement={renderFilterElement}
              // filterField={field}
              // filterElement={studyNumberFilterTemplate}
              sortable={true}
              style={{ width: "25%", zIndex: 2 }}
              // editor={(options) => textEditor(options)}
              // onCellEditComplete={onCellEditComplete}
            />
          );
        })}
      </DataTable>
      <div style={{ marginTop: "10px" }}>
        
        <div className="flex justify-content-between"> 
          <Button type="button" icon="pi pi-file" rounded onClick={() => downloadCSV()} data-pr-tooltip="Export as CSV" style={{ marginLeft: '100px'}} />
      {/* </div> */}
      <span>Rows per page: </span>
        <select value={size} onChange={(e) => onPageSizeChange(e.target)}>
          {[10,25,50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
      </div>
      </> : <Login10 />
}
    </div>
  );
}
