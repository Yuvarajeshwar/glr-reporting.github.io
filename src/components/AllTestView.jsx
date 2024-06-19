import React, { useState, useEffect, useRef } from "react";
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

import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Tag } from "primereact/tag";
import './AllTestView.css'

export default function AllTestView() {
  const [products, setProducts] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  // const [filters, setFilters] = useState("");
  const [filters, setFilters] = useState({
    // global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    study_number: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    // 'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    // representative: { value: null, matchMode: FilterMatchMode.IN },
    sponsor: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    sd_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
});

  const dt = useRef(null);
  const toast = useRef(null);

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
};

  useEffect(() => {
    const fetchData = async () => {
      try {
          // Fetch data from all endpoints concurrently
          const [sdResponse, qaResponse, mailResponse, edpResponse, accountsResponse, studyResponse] = await Promise.all([
              fetch('http://localhost:3030/sd/'),
              fetch('http://localhost:3030/qa/'),
              fetch('http://localhost:3030/mailCommunication/'),
              fetch('http://localhost:3030/edp/'),
              fetch('http://localhost:3030/accounts/'),
              fetch('http://localhost:3030/study/')
          ]);
  
          // Extract JSON data from responses
          const [sdResult, qaResult, mailResult, edpResult, accountsResult, studyResult] = await Promise.all([
              sdResponse.json(),
              qaResponse.json(),
              mailResponse.json(),
              edpResponse.json(),
              accountsResponse.json(),
              studyResponse.json()
          ]);
  
          // Create maps for faster lookup
          const qaMap = new Map(qaResult.map(item => [item.study_id, item]));
          const mailMap = new Map(mailResult.map(item => [item.study_id, item]));
          const edpMap = new Map(edpResult.map(item => [item.study_id, item]));
          const accountsMap = new Map(accountsResult.map(item => [item.study_id, item]));
          const sdMap = new Map(sdResult.map(item => [item.study_id, item]));
          
          const consolidation = studyResult.map(studyItem => ({
            ...studyItem,
            ...qaMap.get(studyItem.id) || {},
            ...mailMap.get(studyItem.id) || {},
            ...edpMap.get(studyItem.id) || {},
            ...accountsMap.get(studyItem.id) || {},
            ...sdMap.get(studyItem.id) || {},
          }))
          // Set consolidated data to state
          setProducts(consolidation);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };
  
    initFilters();
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const columns = [
    {
      field: "study_number",
      header: "Study Number",
      type: "text",
      sortable: "true",
      department: "STUDY",
      freeze: "true"
    },
    { field: "sponsor", header: "Sponsor", type: "text", sortable: "true", department: "MAIL COMMUNICATION" },
    {
      field: "sd_name",
      header: "Study Director",
      type: "text",
      sortable: "true",
      department: "STUDY",
    },
    { field: "test_name", header: "Test Name", type: "text", sortable: false, department: "MAIL COMMUNICATION" },
    {
      field: "study_title",
      header: "Study Title",
      type: "text",
      sortable: false,
      department: "STUDY",
    },
    ,	
    {
      field: "sample_received_dttm",
      header: "Sample Received",
      type: "date",
      sortable: false,
      department: "TICO",
    },
    {
      field: "tids_received_dttm",
      header: "TIDS Received",
      type: "date",
      sortable: false,
      department: "TICO",
    },
    {
      field: "scope_approval_dttm",
      header: "Scope Approved",
      type: "date",
      sortable: false,
      department: "TICO",
    },
      {
        field: "tids_issued_to_yaminy",
        header: "TIDS Issued to Yaminy",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "invoice_number",
        header: "Invoice Number",
        type: "text",
        sortable: false,
        department: "accounts"
      },
      {
        field: "invoice_date",
        header: "Invoice Date",
        type: "date",
        sortable: false,
        department: "accounts"
      },
      {
        field: "payment_received_in_percent",
        header: "Payment Received In %",
        type: "text",
        sortable: false,
        department: "accounts"
      },
      {
        field: "scope",
        header: "Scope",
        type: "text",
        sortable: false,
        department: "SD"
      },
      {
        field: "direct_reports",
        header: "Direct Reports",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "sd_allotment_yaminy_to_qa",
        header: "SD Allotment Yaminy Issued to QA (Date & Time)",
        type: "date",
        sortable: false,
        department: "EDP"
      },
      {
        field: "study_alloted_to_qa",
        header: "Study Alloted by QA (Date & Time)",
        type: "date",
        sortable: false,
        department: "EDP"
      },
      {
        field: "study_plan_prepared_by",
        header: "Study Plan Prepared by",
        type: "text",
        sortable: false,
        department: "EDP"
      },
      {
        field: "study_plan_prepared_on",
        header: "Study Plan Prepared (Date)",
        type: "date",
        sortable: false,
        department: "EDP"
      },
      {
        field: "study_plan_to_sd",
        header: "Study plan Hand over to SD (Date)",
        type: "date",
        sortable: false,
        department: "EDP"
      },
      {
        field: "draft_study_plan_to_qa",
        header: "Draft Study Plan Sent to QA (Date & Time)",
        type: "date",
        sortable: false,
        department: "SD"
      },
      {
        field: "draft_study_plan_to_yaminy_by_qa",
        header: "Draft Study Plan Sent to Yaminy by QA (Date)",
        type: "date",
        sortable: false,
        department: "QA"
      },
      {
        field: "draft_study_plan_to_sponsor",
        header: "Draft Study Plan Sent to Sponsor (Date)",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "draft_study_plan_sponsor_approval_comments_received",
        header: "Study Plan - Sponsor approval / Comments received (Date)",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "draft_study_plan_sponsor_approval_comments_sent_to_sd",
        header: "Study Plan Sponsor approval Comments sent to SD (Date)",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "corrected_draft_study_plan_to_qa",
        header: "Corrected Draft Study Plan Sent to QA (Date & Time)",
        type: "date",
        sortable: false,
        department: "SD"
      },
      {
        field: "corrected_draft_study_plan_to_yaminy_by_qa",
        header: "Corrected Draft Study Plan Sent to Yaminy (Date)",
        type: "date",
        sortable: false,
        department: "QA"
      },
      {
        field: "corrected_draft_study_plan_to_sponsor",
        header: "Corrected Draft Study Plan Sent to Sponsor (Date)",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "approval_for_corrected_draft_study_plan_received",
        header: "Approval for Corrected Draft Study Plan Received (Date)",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "corrected_draft_study_plan_comments_to_sd",
        header: "Corrected Draft Study Plan Comments Sent to SD (Date)",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "definitive_study_plan_taken",
        header: "Definitive Study Plan Taken (Date)",
        type: "date",
        sortable: false,
        department: "EDP"
      },
      {
        field: "definitive_study_plan_sent_to_qa",
        header: "Definitive Study Plan Sent to QA (Date) (PDF)",
        type: "date",
        sortable: false,
        department: "EDP"
      },
      {
        field: "definitive_study_plan_to_yaminy_by_qa",
        header: "Definitive Study Plan Sent to Yaminy (Date)",
        type: "date",
        sortable: false,
        department: "QA"
      },
      {
        field: "definitive_plan_to_sponsor",
        header: "Definitive Study Plan Sent to Sponsor (Date)",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "definitive_study_plan_sponsor_approval",
        header: "Definitive Study Plan Sponsor Approval Received (Date)",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "definitive_study_plan_comments_to_sd",
        header: "Definitive Study Plan Comments Sent to SD (Date)",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "study_initiation",
        header: "Study Initiation (Date)",
        type: "date",
        sortable: false,
        department: "SD"
      },
      {
        field: "experiment_start_date",
        header: "Exp Start (Date)",
        type: "date",
        sortable: false,
        department: "SD"
      },
      {
        field: "experiment_complete_date",
        header: "Exp Completed (Date)",
        type: "date",
        sortable: false,
        department: "SD"
      },
      {
        field: "draft_report_commited_to_qa",
        header: "Draft Report Committed to QA (Date)",
        type: "date",
        sortable: false,
        department: "SD"
      },
      {
        field: "draft_report_commited_to_sponsor",
        header: "Draft Report Committed to Sponsor (Date)",
        type: "date",
        sortable: false,
        department: "SD"
      },
      {
        field: "draft_report_completion",
        header: "Draft Report Completion (Date)",
        type: "date",
        sortable: false,
        department: "SD"
      },
      {
        field: "draft_report_to_qa",
        header: "Draft Report to QA (Date)",
        type: "date",
        sortable: false,
        department: "SD"
      },
      {
        field: "draft_report_to_yaminy_by_qa",
        header: "Draft Report Sent to Yaminy (Date)",
        type: "date",
        sortable: false,
        department: "QA"
      },
      {
        field: "draft_report_to_sponsor",
        header: "Draft Report Sent to Sponsor (Date)",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "draft_report_sponsor_reply",
        header: "Draft Report Sponsor Approval / Comments Received (Date)",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "draft_report_comments_to_sd",
        header: "Draft Report Sponsor Approval Comments Sent to SD (Date)",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "corrected_draft_report_to_qa",
        header: "Corrected Draft Report Sent to QA (Date & Time)",
        type: "date",
        sortable: false,
        department: "SD"
      },
      {
        field: "corrected_draft_report_to_yaminy_by_qa",
        header: "Corrected Draft Report Sent to Yaminy (Date)",
        type: "date",
        sortable: false,
        department: "QA"
      },
      {
        field: "corrected_draft_report_to_sponsor",
        header: "Corrected Draft Report Sent to Sponsor (Date)",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "corrected_draft_report_sponsor_reply",
        header: "Corrected Draft Report Sponsor Approval Received (Date)",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "corrected_draft_report_comments_to_sd",
        header: "Corrected Draft Report Comments Sent to SD (Date)",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "study_completion",
        header: "Study Completion (Date)",
        type: "date",
        sortable: false,
        department: "SD"
      },
      {
        field: "final_report_taken",
        header: "Final Report taken",
        type: "date",
        sortable: false,
        department: "EDP"
      },
      {
        field: "final_report_to_qa",
        header: "Final Report to QA",
        type: "date",
        sortable: false,
        department: "EDP"
      },
      {
        field: "final_report_to_yaminy",
        header: "Final Report to Yaminy",
        type: "date",
        sortable: false,
        department: "QA"
      },
      {
        field: "final_invoice",
        header: "Final Invoice (Date)",
        type: "date",
        sortable: false,
        department: "accounts"
      },
      {
        field: "final_report_to_sponsor",
        header: "Final Report to Sponsor (Date)",
        type: "date",
        sortable: false,
        department: "MAIL COMMUNICATION"
      },
      {
        field: "hard_copies_sent",
        header: "Hard Copies sent (Date)",
        type: "date",
        sortable: false,
        department: "EDP"
      }
  ];

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
        onKeyDown={(e) => e.stopPropagation()}
      />
    );
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
  function getDepartmentByField(field) {
    console.log(field)
    console.log(columns)
    // Find the column that matches the given field
    // const column = columns.find(col => col[0].field === field);
    for (const column of columns) {
      if (column && column.field === field) {
          return column.department || 'Field does not have a department';
      }
  }
    // Return the department if found, otherwise return null or undefined
    // return column ? column.department : null;
    return 'Field not found';
  }

  const onCellEditComplete = async (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;
    const study_number = rowData.id;
    const department = getDepartmentByField(field)
    console.log(rowData)
    console.log(newValue)
    const data = {
      [field]: newValue
  };
    const res = await sendData(study_number, data, department);
    console.log(res)
  };

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
    console.log(id)
    console.log(field)
    console.log(newDate)
    const department = getDepartmentByField(field)
    const requestDate = formatDate(newDate)
    const data = {
      [field]: requestDate
    };

    const res = await sendData(id, data, department);
    console.log(res)
  };

  const parseDate = (dateStr) => {
    if(dateStr === undefined ) {
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
    const dateValue = parseDate(rowData[field]);
    return (
      <Calendar
        value={dateValue}
        onChange={(e) => updateDate(rowData.id, field, e.value)}
        dateFormat="MM dd,yy"
      />
    );
  };

  const onGlobalFilterChange = (e) => {
    console.log(e);
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} />;
  };

  const studyNumberFilterTemplate = (options) => {
    console.log(options);
    return (
      <Dropdown
        value={options.value}
        options={products.sponsor}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  const clearFilter = () => {
    initFilters();
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          clear
          onClick={clearFilter}
        />
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          {/* <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          /> */}
          <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="Export as CSV" style={{ marginLeft: '100px'}} />
        </IconField>
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

  return (
    <div>
      <Toast ref={toast} />
      <DataTable
      scrollable
        showGridlines
        value={products}
        header={renderHeader}
        editMode="cell"
        resizableColumns
        tableStyle={{ minWidth: "50rem" }}
        removableSort
        paginator
        rows={10}
        ref={dt}
        filters={filters}
        filterDisplay="row"
        globalFilterFields={["study_number", "sponsor", "sd_name"]}
        headerColumnGroup={headerGroup}
      >
        {columns.map(({ field, header, type, freeze }) => {
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
              filterField={field}
              // filterElement={studyNumberFilterTemplate}
              sortable={false}
              style={{ width: "25%", zIndex: 2 }}
              editor={(options) => textEditor(options)}
              onCellEditComplete={onCellEditComplete}
            />
          );
        })}
      </DataTable>
    </div>
  );
}
