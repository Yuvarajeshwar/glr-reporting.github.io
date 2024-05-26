import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../service/ProductService";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { TabView, TabPanel } from "primereact/tabview";

export default function MasterView() {
  const [products, setProducts] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    ProductService.getProductsWithOrdersSmall().then((data) =>
      setProducts(data)
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onRowExpand = (event) => {
    toast.current.show({
      severity: "info",
      summary: "Product Expanded",
      detail: event.data.name,
      life: 3000,
    });
  };

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Product Collapsed",
      detail: event.data.name,
      life: 3000,
    });
  };

  const expandAll = () => {
    let _expandedRows = {};

    products.forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };



  const allowExpansion = (rowData) => {
    return rowData.tico.length > 0;
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3">
        <TabView>
          <TabPanel header="TICO">
            <DataTable value={data.tico}>
              <Column
                field="sample_received_dttm"
                header="Sample received"
                sortable
              ></Column>
              <Column
                field="tids_received_dttm"
                header="TIDS received"
                sortable
              ></Column>
              <Column
                field="scope_approval_dttm"
                header="Scope Approved"
                sortable
              ></Column>
            </DataTable>
          </TabPanel>
          <TabPanel header="EDP">
            <DataTable value={data.edp_data}>
              <Column
                field="sd_allotment_yaminy_to_qa"
                header="SD Allotment Yaminy to QA"
                sortable
              ></Column>
              <Column
                field="study_alloted_to_qa"
                header="Study Alloted to QA"
                sortable
              ></Column>
              <Column
                field="study_plan_prepared_by"
                header="Study plan prepared by"
                sortable
              ></Column>
              <Column
                field="study_plan_prepared_on"
                header="Study Plan prepared on"
                sortable
              ></Column>
              <Column
                field="study_plan_to_sd"
                header="Study Plan to SD"
                sortable
              ></Column>
              <Column
                field="definitive_study_plan_taken"
                header="Definitive Study Plan taken"
                sortable
              ></Column>
              <Column
                field="definitive_study_plan_sent_to_qa"
                header="Definitive study Plan taken to QA(PDF)"
                sortable
              ></Column>
              <Column
                field="final_report_taken"
                header="Final Report taken"
                sortable
              ></Column>
              <Column
                field="final_report_to_qa"
                header="Final Report to QA"
                sortable
              ></Column>
              <Column
                field="hard_copies_sent"
                header="Hard Copies sent"
                sortable
              ></Column>
            </DataTable>
          </TabPanel>
          <TabPanel header="Study Director">
            <DataTable value={data.sd_data}>
              <Column field="scope" header="Scope" sortable></Column>
              <Column
                field="draft_study_plan_to_qa"
                header="Draft study Plan Sent to QA"
              ></Column>
              <Column
                field="corrected_draft_study_plan_to_qa"
                header="Corrected draft study plan sent to QA"
              ></Column>
              <Column
                field="study_initiation"
                header="Study initiation "
              ></Column>
              <Column field="experiment_start_date" header="Exp start"></Column>
              <Column
                field="experiment_complete_date"
                header="Exp Completed Date"
              ></Column>
              <Column
                field="draft_report_commited_to_qa"
                header="Draft report committed to QA"
              ></Column>
              <Column
                field="draft_report_commited_to_sponsor"
                header="Draft report committed to Sponsor"
              ></Column>
              <Column
                field="draft_report_completion"
                header="Draft report Completion "
              ></Column>
              <Column
                field="draft_report_to_qa"
                header="Draft report to QA date"
              ></Column>
              <Column
                field="corrected_draft_report_to_qa"
                header="Corrected draft report sent to QA"
              ></Column>
              <Column
                field="study_completion"
                header="Study Completion"
              ></Column>
            </DataTable>
          </TabPanel>
          <TabPanel header="Mail Communication">
            <DataTable value={data.mail_comm_data}>
              <Column
                field="tids_issued_to_yaminy"
                header="TIDS issued to Yaminy"
                sortable
              ></Column>
              <Column field="sponsor_name" header="Sponsor Name"></Column>
              <Column field="test_name" header="Test Name"></Column>
              <Column field="study_title" header="Study Title"></Column>
              <Column field="direct_reports" header="Direct Reports"></Column>
              <Column
                field="corrected_draft_study_plan_to_sponsor"
                header="Corrected Draft Study Plan To Sponsor"
              ></Column>
              <Column
                field="approval_for_corrected_draft_study_plan_received"
                header="Approval for Corrected Draft SP"
              ></Column>
              <Column
                field="corrected_draft_study_plan_comments_to_sd"
                header="Corrected Draft SP to SD"
              ></Column>
              <Column
                field="definitive_plan_to_sponsor"
                header="Definitive plan to Sponsor "
              ></Column>
              <Column
                field="definitive_study_plan_sponsor_approval"
                header="Definitive Study plan sponsor approval"
              ></Column>
              <Column
                field="definitive_study_plan_comments_to_sd"
                header="Definitive study plan comments to SD"
              ></Column>
              <Column
                field="draft_report_to_sponsor"
                header="Draft report to Sponsor"
              ></Column>
              <Column
                field="draft_report_sponsor_reply"
                header="Draft report Sponsor Approval / Comments"
              ></Column>
              <Column
                field="draft_report_comments_to_sd"
                header="Draft report comments to SD"
              ></Column>
              <Column
                field="corrected_draft_report_to_sponsor"
                header="Corrected Draft report to Sponsor"
              ></Column>
              <Column
                field="corrected_draft_report_sponsor_reply"
                header="Corrected draft report sponsor reply"
              ></Column>
              <Column
                field="corrected_draft_report_comments_to_sd"
                header="Corrected Draft report comments to SD"
              ></Column>
              </DataTable>
              </TabPanel>
              <TabPanel header="Accounts">
              <DataTable value={data.accounts}>
              <Column 
                field="invoice_number"
                header="Invoice Number"
                />
                <Column 
                field="invoice_date"
                header="Invoice Date"
                />
                <Column 
                field="payment_received_in_percent"
                header="Payment Received (%)"
                />
                <Column 
                field="final_invoice"
                header="Final Invoice"
                />
            </DataTable>
          </TabPanel>
        </TabView>
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
      <Button
        icon="pi pi-minus"
        label="Collapse All"
        onClick={collapseAll}
        text
      />
    </div>
  );

  return (
    <div className="card">
      <Toast ref={toast} />
      <DataTable
        showGridlines
        value={products}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        onRowExpand={onRowExpand}
        onRowCollapse={onRowCollapse}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="id"
        header={header}
        tableStyle={{ minWidth: "60rem" }}
        resizableColumns
      >
        <Column expander={allowExpansion} style={{ width: "5rem" }} />
        <Column field="study_number" header="Study Number" sortable />
        <Column field="tico_status" header="Tico Status" />
        <Column field="sponsor" header="Sponsor" sortable />
        <Column field="test_name" header="Test Name" sortable />
        <Column field="study_title" header="Study Title" />
        <Column field="sd_name" header="SD name" sortable filter />
      </DataTable>
    </div>
  );
}
