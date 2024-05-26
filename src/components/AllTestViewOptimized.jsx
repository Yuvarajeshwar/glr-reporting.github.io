import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../service/AllTestService";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Tag } from "primereact/tag";

const parseDate = (dateInput) => {
  if (dateInput instanceof Date) {
    const day = dateInput.getDate().toString().padStart(2, "0");
    const month = (dateInput.getMonth() + 1).toString().padStart(2, "0");
    const year = dateInput.getFullYear();
    return `${day}/${month}/${year}`;
  } else if (typeof dateInput === "string") {
    return dateInput;
  }
  return "";
};

const dateTemplate = (rowData, field, updateDate) => {
  const dateValue = new Date(parseDate(rowData[field]));
  return (
    <Calendar
      value={dateValue}
      onChange={(e) => updateDate(rowData.id, field, e.value)}
      dateFormat="MM dd,yy"
    />
  );
};

const textEditor = (options) => (
  <InputText
    type="text"
    value={options.value}
    onChange={(e) => options.editorCallback(e.target.value)}
    onKeyDown={(e) => e.stopPropagation()}
  />
);

export default function AllTestViewOptimized() {
  const [products, setProducts] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    ProductService.getProductsWithOrders().then((data) => setProducts(data));
    initFilters();
  }, []);

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
    if (field === "quantity" || field === "price") {
      if (isPositiveInteger(newValue)) rowData[field] = newValue;
      else event.preventDefault();
    } else {
      if (newValue.trim().length > 0) rowData[field] = newValue;
      else event.preventDefault();
    }
  };

  const updateDate = (id, field, newDate) => {
    setProducts((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: newDate } : item
      )
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => (
    <div className="flex justify-content-between">
      <Button
        type="button"
        icon="pi pi-filter-slash"
        label="Clear"
        outlined
        onClick={initFilters}
      />
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-search"></i>
        </span>
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
        />
      </div>
    </div>
  );

  const columns = [
    { field: "study_number", header: "Study Number", type: "text" },
    { field: "sponsor", header: "Sponsor", type: "text" },
    { field: "sd_name", header: "Study Director", type: "text" },
    { field: "test_name", header: "Test Name", type: "text" },
    { field: "study_title", header: "Study Title", type: "text" },
    { field: "sample_received_dttm", header: "Sample Received", type: "date" },
    { field: "tids_received_dttm", header: "TIDS Received", type: "date" },
    { field: "scope_approval_dttm", header: "Scope Approved", type: "date" },
    { field: "scope", header: "Scope", type: "text" },
    {
      field: "draft_study_plan_to_qa",
      header: "Draft Study Plan to QA",
      type: "date",
    },
    {
      field: "corrected_draft_study_plan_qa",
      header: "Corrected Draft Study Plan to QA",
      type: "date",
    },
    { field: "study_initiation", header: "Study initiation", type: "date" },
    {
      field: "experiment_start_date",
      header: "Experiment Start",
      type: "date",
    },
    {
      field: "experiment_complete_date",
      header: "Experiment End",
      type: "date",
    },
    {
      field: "draft_report_commited_to_qa",
      header: "Draft report committed to QA",
      type: "date",
    },
    {
      field: "draft_report_commited_to_sponsor",
      header: "Draft report to Sponsor",
      type: "date",
    },
    {
      field: "draft_report_completion",
      header: "Draft report completion",
      type: "date",
    },
    { field: "draft_report_to_qa", header: "Draft report to QA", type: "date" },
    {
      field: "corrected_draft_report_to_qa",
      header: "Corrected Draft Report to QA",
      type: "date",
    },
    { field: "study_completion", header: "Study completion", type: "date" },
    {
      field: "tids_issued_to_yaminy",
      header: "TIDS issues to Yaminy",
      type: "date",
    },
    { field: "direct_reports", header: "Direct Reports", type: "date" },
    {
      field: "corrected_draft_study_plan_to_sponsor",
      header: "Corrected Draft Study Plan To Sponsor",
      type: "date",
    },
    {
      field: "approval_for_corrected_draft_study_plan_received",
      header: "Approval for Corrected Draft Study plan received",
      type: "date",
    },
    {
      field: "corrected_draft_study_plan_comments_to_sd",
      header: "Corrected Draft Study Plan Comments to SD",
      type: "date",
    },
    {
      field: "definitive_plan_to_sponsor",
      header: "Definitive plan to Sponsor",
      type: "date",
    },
    {
      field: "definitive_study_plan_sponsor_approval",
      header: "Definitive plan sponsor approval",
      type: "date",
    },
    {
      field: "definitive_study_plan_comments_to_sd",
      header: "Definitive plan comments to SD",
      type: "date",
    },
    {
      field: "draft_report_to_sponsor",
      header: "Draft report to Sponsor",
      type: "date",
    },
    {
      field: "draft_report_sponsor_reply",
      header: "Draft report Sponsor Reply",
      type: "date",
    },
    {
      field: "draft_report_comments_to_sd",
      header: "Draft report comments to SD",
      type: "date",
    },
    {
      field: "corrected_draft_report_to_sponsor",
      header: "Corrected Draft report to Sponsor",
      type: "date",
    },
    {
      field: "corrected_draft_report_sponsor_reply",
      header: "Corrected Draft report Sponsor reply",
      type: "date",
    },
    {
      field: "corrected_draft_report_comments_to_sd",
      header: "Corrected Draft Report to SD",
      type: "date",
    },
  ];

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

  const statusItemTemplate = (option) => {
    return <Tag value={option} />;
  };

  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Study Details" rowSpan={1} colSpan={3} />
        <Column header="TICO Data" rowSpan={1} colSpan={3} />
        <Column header="Study Director Data" rowSpan={1} colSpan={12} />
        <Column header="Mail Communication" rowSpan={1} colSpan={20} />
      </Row>
      <Row>
        {columns.map(({ field, header, type }) => (
          <Column
            key={field}
            field={field}
            header={header}
            sortable={type === "text"}
            style={{ width: "25%" }}
            editor={(options) => {
              return type === "date"
                ? dateTemplate(options.rowData, field, updateDate)
                : textEditor(options);
            }}
            onCellEditComplete={onCellEditComplete}
          />
        ))}
      </Row>
    </ColumnGroup>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <DataTable
            value={products}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            dataKey="id"
            filters={filters}
            filterDisplay="menu"
            globalFilterFields={columns.map((col) => col.field)}
            header={renderHeader()}
            emptyMessage="No customers found."
            scrollable
            scrollHeight="600px"
            editMode="cell"
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
          </DataTable>
        </div>
      </div>
    </div>
  );
}
