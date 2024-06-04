import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../service/AllTestService";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Calendar } from "primereact/calendar";

import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Tag } from "primereact/tag";

export default function AllTestView() {
  const [products, setProducts] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState("");
  const dt = useRef(null);

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
};

  useEffect(() => {
    ProductService.getProductsWithOrders().then((data) => setProducts(data));
    initFilters();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const columns = [
    {
      field: "study_number",
      header: "Study Number",
      type: "text",
      sortable: "true",
    },
    { field: "sponsor", header: "Sponsor", type: "text", sortable: "true" },
    {
      field: "sd_name",
      header: "Study Director",
      type: "text",
      sortable: "true",
    },
    { field: "test_name", header: "Test Name", type: "text", sortable: false },
    {
      field: "study_title",
      header: "Study Title",
      type: "text",
      sortable: false,
    },
    ,	
    {
      field: "sample_received_dttm",
      header: "Sample Received",
      type: "date",
      sortable: false,
    },
    {
      field: "tids_received_dttm",
      header: "TIDS Received",
      type: "date",
      sortable: false,
    },
    {
      field: "scope_approval_dttm",
      header: "Scope Approved",
      type: "date",
      sortable: false,
    },
    {
      field: "sd_allotment_yaminy_to_qa",
      header: "SD Allotment Yaminy to QA",
      type: "date",
      sortable: false,
    },
    {
      field: "study_alloted_to_qa",
      header: "Study Alloted to QA",
      type: "date",
      sortable: false,
    },
    {
      field: "study_plan_prepared_by",
      header: "Study plan prepared by",
      type: "text",
      sortable: false,
    },
    { field: "study_plan_prepared_on", header: "Study Plan prepared on", type: "date" },
    {
      field: "study_plan_to_sd",
      header: "Study Plan to SD",
      type: "date",
      sortable: false,
    },
    {
      field: "definitive_study_plan_taken",
      header: "Definitive Study Plan taken",
      type: "date",
      sortable: false,
    },
    {
      field: "definitive_study_plan_sent_to_qa",
      header: "Definitive study Plan taken to QA(PDF)",
      type: "date",
      sortable: false,
    },	
    {
      field: "final_report_taken",
      header: "Final Report taken",
      type: "date",
      sortable: false,
    },
    {
      field: "final_report_to_qa",
      header: "Final Report to QA",
      type: "date",
      sortable: false,
    },
    {
      field: "hard_copies_sent",
      header: "Hard Copies sent",
      type: "date",
      sortable: false,
    },
    { field: "scope", header: "Scope", type: "text" },
    {
      field: "draft_study_plan_to_qa",
      header: "Draft Study Plan to QA",
      type: "date",
      sortable: false,
    },
    {
      field: "corrected_draft_study_plan_qa",
      header: "Corrected Draft Study Plan to QA",
      type: "date",
      sortable: false,
    },
    {
      field: "study_initiation",
      header: "Study initiaton",
      type: "date",
      sortable: false,
    },
    {
      field: "experiment_start_date",
      header: "Experiment Start",
      type: "date",
      sortable: false,
    },
    {
      field: "experiment_complete_date",
      header: "Experiment End",
      type: "date",
      sortable: false,
    },
    {
      field: "draft_report_commited_to_qa",
      header: "Draft report committed to QA",
      type: "date",
      sortable: false,
    },
    {
      field: "draft_report_commited_to_sponsor",
      header: "Draft report to Sponsor",
      type: "date",
      sortable: false,
    },
    {
      field: "draft_report_completion",
      header: "Draft report completion",
      type: "date",
      sortable: false,
    },
    {
      field: "draft_report_to_qa",
      header: "Draft report to QA",
      type: "date",
      sortable: false,
    },
    {
      field: "corrected_draft_report_to_qa",
      header: "Corrected Draft Report to QA",
      type: "date",
      sortable: false,
    },
    {
      field: "study_completion",
      header: "Study completion",
      type: "date",
      sortable: false,
    },
    {
      field: "tids_issued_to_yaminy",
      header: "TIDS issues to Yaminy",
      type: "date",
      sortable: false,
    },

    {
      field: "direct_reports",
      header: "Direct Reports",
      type: "date",
      sortable: false,
    },
    {
      field: "corrected_draft_study_plan_to_sponsor",
      header: "Corrected Draft Study Plan To Sponsor",
      type: "date",
      sortable: false,
    },
    {
      field: "approval_for_corrected_draft_study_plan_received",
      header: "Approval for Corrected Draft Study plan received",
      type: "date",
      sortable: false,
    },
    {
      field: "corrected_draft_study_plan_comments_to_sd",
      header: "Corrected Draft Study Plan Comments to SD",
      type: "date",
      sortable: false,
    },
    {
      field: "definitive_plan_to_sponsor",
      header: "Definitive plan to Sponsor",
      type: "date",
      sortable: false,
    },
    {
      field: "definitive_study_plan_sponsor_approval",
      header: "Definitive plan sponsor approval",
      type: "date",
      sortable: false,
    },
    {
      field: "definitive_study_plan_comments_to_sd",
      header: "Definitive plan comments to SD",
      type: "date",
      sortable: false,
    },
    {
      field: "draft_report_to_sponsor",
      header: "Draft report to Sponsor",
      type: "date",
      sortable: false,
    },
    {
      field: "draft_report_sponsor_reply",
      header: "Draft report Sponsor Reply",
      type: "date",
      sortable: false,
    },
    {
      field: "draft_report_comments_to_sd",
      header: "Draft report comments to SD",
      type: "date",
      sortable: false,
    },
    {
      field: "corrected_draft_report_to_sponsor",
      header: "Corrected Draft report to Sponsor",
      type: "date",
      sortable: false,
    },
    {
      field: "corrected_draft_report_sponsor_reply",
      header: "Corrected Draft report Sponsor reply",
      type: "date",
      sortable: false,
    },
    {
      field: "corrected_draft_report_comments_to_sd",
      header: "Corrected Draft Report to SD",
      type: "date",
      sortable: false,
    },
    {
      field: "draft_study_plan_to_yaminy_by_qa",
      header: "Draft SP to Yaminy by QA",
      type: "date",
      sortable: false,
    },
    {
      field: "corrected_draft_study_plan_to_yaminy_by_qa",
      header: "Corrected Draft SP to Yaminy by QA",
      type: "date",
      sortable: false,
    },
    {
      field: "definitive_study_plan_to_yaminy_by_qa",
      header: "Definitive SP to Yaminy by QA",
      type: "date",
      sortable: false,
    },
    {
      field: "draft_report_to_yaminy_by_qa",
      header: "Draft Report to Yaminy by QA",
      type: "date",
      sortable: false,
    },
    {
      field: "corrected_draft_report_to_yaminy_by_qa",
      header: "Corrected Draft Report to Yaminy by QA",
      type: "date",
      sortable: false,
    },
    {
      field: "final_report_to_yaminy",
      header: "Final Report to Yaminy",
      type: "date",
      sortable: false,
    },
    {
      field: "invoice_number",
      header: "Invoice Number",
      type: "text",
      sortable: false,
    },
    {
      field: "invoice_date",
      header: "Invoice Date (Date)",
      type: "date",
      sortable: false,
    },
    {
      field: "payment_received_in_percent",
      header: "Payment Receipt(%)",
      type: "text",
      sortable: false,
    },
    {
      field: "final_invoice",
      header: "Final Invoice (Date)",
      type: "date",
      sortable: false,
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

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;
    const study_number = rowData.study_number;
    console.log(
      "update table_name set " +
        field +
        " = " +
        newValue +
        " where study_number = " +
        study_number
    );
    switch (field) {
      case "quantity":
      case "price":
        if (isPositiveInteger(newValue)) rowData[field] = newValue;
        else event.preventDefault();
        break;

      default:
        if (newValue.trim().length > 0) rowData[field] = newValue;
        else event.preventDefault();
        break;
    }
  };

  const updateDate = (id, field, newDate) => {
    setProducts((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: newDate } : item
      )
    );
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

    const [day, month, year] = dateStr.split("/").map(Number);
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
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
          <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="Export as CSV" style={{ marginLeft: '100px'}} />
        </IconField>
      </div>
    );
  };

  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Study Details" rowSpan={1} colSpan={5} />
        <Column header="TICO Data" rowSpan={1} colSpan={3} />
        <Column header="EDP" rowSpan={1} colSpan={10} />
        <Column header="Study Director Data" rowSpan={1} colSpan={12} />
        <Column header="Mail Communication" rowSpan={1} colSpan={14} />
        <Column header="QA" rowSpan={1} colSpan={6} />
        <Column header="Accounts" rowSpan={1} colSpan={4} />
      </Row>
      <Row>
        {columns.map(({ field, header, sortable }) => {
          return (
            <Column
              key={field}
              field={field}
              header={header}
              sortable={sortable}
              style={{ width: "25%" }}
              editor={(options) => textEditor(options)}
              onCellEditComplete={onCellEditComplete}
            />
          );
        })}
      </Row>
    </ColumnGroup>
  );

  return (
    <div>
      <DataTable
        showGridlines
        value={products}
        header={renderHeader}
        editMode="cell"
        resizableColumns
        tableStyle={{ minWidth: "50rem" }}
        removableSort
        paginator
        rows={5}
        ref={dt}
        filters={filters}
        filterDisplay="row"
        globalFilterFields={["study_number", "sponsor", "sd_name"]}
        headerColumnGroup={headerGroup}
      >
        {columns.map(({ field, header, type }) => {
          return type == "date" ? (
            <Column
              key={field}
              header={header}
              field={field}
              body={(rowData) => dateTemplate(rowData, field)}
            />
          ) : (
            <Column
              key={field}
              field={field}
              header={header}
              filter
              filterElement={studyNumberFilterTemplate}
              sortable={false}
              style={{ width: "25%" }}
              editor={(options) => textEditor(options)}
              onCellEditComplete={onCellEditComplete}
            />
          );
        })}

        {/* <Column field="sample_received_dttm" header="Sample received" sortable></Column>
                    <Column field="tids_received_dttm" header="TIDS received" sortable></Column>
                    <Column field="scope_approval_dttm" header="Scope Approved" sortable></Column>
        <Column field="scope" header="Scope" sortable></Column>

                    <Calendar field="draft_study_plan_to_qa" header="Draft study Plan Sent to QA"></Calendar>
                    <Column field="corrected_draft_study_plan_qa" header="Corrected draft study plan sent to QA" ></Column>
                    <Column field="study_initiation" header="Study initiation " ></Column>
                    <Column field="experiment_start_date" header="Exp start" ></Column>
                    <Column field="experiment_complete_date" header="Exp Completed Date" ></Column>
                    <Column field="draft_report_commited_to_qa" header="Draft report committed to QA" ></Column>
                    <Column field="draft_report_commited_to_sponsor" header="Draft report committed to Sponsor" ></Column>
                    <Column field="draft_report_completion" header="Draft report Completion " ></Column>
                    <Column field="draft_report_to_qa" header="Draft report to QA date" ></Column>
                    <Column field="corrected_draft_report_to_qa" header="Corrected draft report sent to QA" ></Column>
                    <Column field="study_completion" header="Study Completion" ></Column>
        <Column field="tids_issued_to_yaminy" header="TIDS issued to Yaminy" sortable></Column>
                    <Column field="sponsor_name" header="Sponsor Name" ></Column>
                    <Column field="test_name" header="Test Name" ></Column>
                    <Column field="study_title" header="Study Title" ></Column>
                    <Column field="direct_reports" header="Direct Reports" ></Column>
                    <Column field="corrected_draft_study_plan_to_sponsor" header="Corrected Draft Study Plan To Sponsor" ></Column>
                    <Column field="approval_for_corrected_draft_study_plan_received" header="Approval for Corrected Draft SP" ></Column>
                    <Column field="corrected_draft_study_plan_comments_to_sd" header="Corrected Draft SP to SD" ></Column>
                    <Column field="definitive_plan_to_sponsor" header="Definitive plan to Sponsor " ></Column>
                    <Column field="definitive_study_plan_sponsor_approval" header="Definitive Study plan sponsor approval" ></Column>
                    <Column field="definitive_study_plan_comments_to_sd" header="Definitive study plan comments to SD" ></Column>
                    <Column field="draft_report_to_sponsor" header="Draft report to Sponsor" ></Column>
                    <Column field="draft_report_sponsor_reply" header="Draft report Sponsor Approval / Comments" ></Column>
                    <Column field="draft_report_comments_to_sd" header="Draft report comments to SD" ></Column>
                    <Column field="corrected_draft_report_to_sponsor" header="Corrected Draft report to Sponsor" ></Column>
                    <Column field="corrected_draft_report_sponsor_reply" header="Corrected draft report sponsor reply" ></Column>
                    <Column field="corrected_draft_report_comments_to_sd" header="Corrected Draft report comments to SD" ></Column> */}
      </DataTable>
    </div>
  );
}
