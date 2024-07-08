export const columnsDefinition = [
    {
      field: "study_number",
      header: "Study Number",
      type: "text",
      sortable: "true",
      department: "STUDY",
      freeze: "true"
    },
    { field: "sponsor", header: "Sponsor", type: "text", sortable: "true", department: "MAIL COMMUNICATION", freeze: "true" },
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