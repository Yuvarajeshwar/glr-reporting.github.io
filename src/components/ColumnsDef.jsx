export const columnsDefinition = [
  {
    field: 'study_number',
    headerName: 'Study Number',
    type: 'text',
    sortable: 'true',
    department: 'STUDY',
    freeze: 'true',
    editable: true,
    cellEditor: 'agTextCellEditor',
  },
  {
    field: 'sponsor',
    headerName: 'Sponsor',
    type: 'text',
    sortable: 'true',
    department: 'tico',
    freeze: 'true',
  },
  {
    field: 'sd_name',
    headerName: 'Study Director',
    type: 'text',
    sortable: 'true',
    department: 'tico',
    freeze: 'true',
  },
  {
    field: 'test_name',
    headerName: 'Test Item Name',
    type: 'text',
    sortable: 'true',
    department: 'tico',
  },
  {
    field: 'study_title',
    headerName: 'Study Title',
    type: 'text',
    sortable: 'true',
    department: 'tico',
  },
  {
    field: 'sample_received_dttm',
    headerName: 'Sample received on',
    type: 'dateString',
    sortable: 'true',
    department: 'TICO',
    editable: true,
  },
  {
    field: 'tids_received_dttm',
    headerName: 'TIDS received on',
    type: 'dateString',
    sortable: 'true',
    department: 'TICO',
    editable: true,
  },
  {
    field: 'scope_approval_dttm',
    headerName: 'Scope approved on',
    type: 'dateString',
    sortable: 'true',
    department: 'TICO',
    editable: true,
  },
  {
    field: 'tids_issued_to_tfm',
    headerName: 'TIDS issued to TFM Office',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,

    cellEditorParams: {
      format: 'dd-mmm-yyyy',
    },
  },
  {
    field: 'invoice_number',
    headerName: 'Invoice number',
    type: 'text',
    sortable: 'true',
    department: 'accounts',
  },
  {
    field: 'invoice_date',
    headerName: 'Invoice date',
    type: 'dateString',
    sortable: 'true',
    department: 'accounts',
    editable: true,
  },
  {
    field: 'payment_received_in_percent',
    headerName: 'Payment received In %',
    type: 'text',
    sortable: 'true',
    department: 'accounts',
  },
  {
    field: 'scope',
    headerName: 'Scope',
    type: 'text',
    sortable: 'true',
    department: 'SD',
  },
  {
    field: 'direct_reports',
    headerName: 'Direct Reports',
    type: 'text',
    sortable: 'true',
    department: 'PM',
  },
  {
    field: 'sd_allotment_tfm_to_qa',
    headerName: 'Study Number & SD allotment issued TFM Office to QA',
    type: 'dateString',
    sortable: 'true',
    department: 'EDP',
    editable: true,
  },
  {
    field: 'qa_reviewer_alloted_by_qa',
    headerName: 'QA Reviewer alloted by QA',
    type: 'dateString',
    sortable: 'true',
    department: 'EDP',
    editable: true,
  },
  {
    field: 'study_plan_tic_to_edp',
    headerName: 'Study plan Received From TIC to EDP',
    type: 'dateString',
    sortable: 'true',
    department: 'EDP',
    editable: true,
  },
  {
    field: 'study_plan_prepared_by',
    headerName: 'Study plan prepared by',
    type: 'text',
    sortable: 'true',
    department: 'EDP',
  },
  {
    field: 'study_plan_to_sd',
    headerName: 'Study plan hand over to SD',
    type: 'dateString',
    sortable: 'true',
    department: 'EDP',
    editable: true,
  },
  {
    field: 'draft_study_plan_to_qa',
    headerName: 'Draft study plan sent to QA',
    type: 'dateString',
    sortable: 'true',
    department: 'SD',
    editable: true,
  },
  {
    field: 'draft_study_plan_to_tfm_by_qa',
    headerName: 'Draft study plan sent to TFM by QA',
    type: 'dateString',
    sortable: 'true',
    department: 'QA',
    editable: true,
  },
  {
    field: 'draft_study_plan_to_sponsor',
    headerName: 'Draft study plan sent to Sponsor',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'draft_study_plan_sponsor_approval_comments_received',
    headerName: 'Study plan - Sponsor approval / comments received',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'draft_study_plan_sponsor_approval_comments_sent_to_sd',
    headerName: 'Study plan Sponsor approval Comments sent to SD',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'corrected_draft_study_plan_to_qa',
    headerName: 'Corrected draft study plan Sent to QA',
    type: 'dateString',
    sortable: 'true',
    department: 'SD',
    editable: true,
  },
  {
    field: 'corrected_draft_study_plan_to_tfm_by_qa',
    headerName: 'Corrected draft study plan sent to TFM',
    type: 'dateString',
    sortable: 'true',
    department: 'QA',
    editable: true,
  },
  {
    field: 'corrected_draft_study_plan_to_sponsor',
    headerName: 'Corrected draft study plan Sent to Sponsor',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'approval_for_corrected_draft_study_plan_received',
    headerName: 'Approval for Corrected draft study plan Received',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'corrected_draft_study_plan_comments_to_sd',
    headerName: 'Corrected draft study plan Comments Sent to SD',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'definitive_study_plan_taken',
    headerName: 'Definitive study plan taken',
    type: 'dateString',
    sortable: 'true',
    department: 'EDP',
    editable: true,
  },
  {
    field: 'definitive_study_plan_sent_to_qa',
    headerName: 'Definitive study plan sent to QA',
    type: 'dateString',
    sortable: 'true',
    department: 'EDP',
    editable: true,
  },
  {
    field: 'definitive_study_plan_to_tfm_by_qa',
    headerName: 'Definitive study plan Sent to TFM',
    type: 'dateString',
    sortable: 'true',
    department: 'QA',
    editable: true,
  },
  {
    field: 'definitive_plan_to_sponsor',
    headerName: 'Definitive study plan sent to Sponsor',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'definitive_study_plan_sponsor_approval',
    headerName: 'Definitive study plan sponsor approval received',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'definitive_study_plan_comments_to_sd',
    headerName: 'Definitive study plan comments sent to SD',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'study_initiation',
    headerName: 'Study Initiation',
    type: 'dateString',
    sortable: 'true',
    department: 'SD',
    editable: true,
  },
  {
    field: 'experiment_start_date',
    headerName: 'Exp Start',
    type: 'dateString',
    sortable: 'true',
    department: 'SD',
    editable: true,
  },
  {
    field: 'experiment_complete_date',
    headerName: 'Exp Completed',
    type: 'dateString',
    sortable: 'true',
    department: 'SD',
    editable: true,
  },
  {
    field: 'draft_report_commited_to_qa',
    headerName: 'Draft report committed to QA',
    type: 'dateString',
    sortable: 'true',
    department: 'SD',
    editable: true,
  },
  {
    field: 'draft_report_commited_to_sponsor',
    headerName: 'Draft report committed to Sponsor',
    type: 'dateString',
    sortable: 'true',
    department: 'SD',
    editable: true,
  },
  {
    field: 'draft_report_completion',
    headerName: 'Draft report completion',
    type: 'dateString',
    sortable: 'true',
    department: 'SD',
    editable: true,
  },
  {
    field: 'draft_report_to_qa',
    headerName: 'Draft report to QA',
    type: 'dateString',
    sortable: 'true',
    department: 'SD',
    editable: true,
  },
  {
    field: 'draft_report_to_tfm_by_qa',
    headerName: 'Draft report sent to TFM',
    type: 'dateString',
    sortable: 'true',
    department: 'QA',
    editable: true,
  },
  {
    field: 'draft_report_to_sponsor',
    headerName: 'Draft report sent to Sponsor',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'draft_report_sponsor_reply',
    headerName: 'Draft report Sponsor Approval / Comments received',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'draft_report_comments_to_sd',
    headerName: 'Draft Report Sponsor Approval Comments sent to SD',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'corrected_draft_report_to_qa',
    headerName: 'Corrected draft report sent to QA',
    type: 'dateString',
    sortable: 'true',
    department: 'SD',
    editable: true,
  },
  {
    field: 'corrected_draft_report_to_tfm_by_qa',
    headerName: 'Corrected draft report sent to TFM',
    type: 'dateString',
    sortable: 'true',
    department: 'QA',
    editable: true,
  },
  {
    field: 'corrected_draft_report_to_sponsor',
    headerName: 'Corrected draft report sent to Sponsor',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'corrected_draft_report_sponsor_reply',
    headerName: 'Corrected draft report sponsor approval received',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'corrected_draft_report_comments_to_sd',
    headerName: 'Corrected draft report comments sent to SD',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'final_report_signing_date',
    headerName: 'Final Report Signing Date',
    type: 'dateString',
    sortable: 'true',
    department: 'SD',
    editable: true,
  },
  {
    field: 'final_report_taken',
    headerName: 'Final Report taken',
    type: 'dateString',
    sortable: 'true',
    department: 'EDP',
    editable: true,
  },
  {
    field: 'final_report_to_qa',
    headerName: 'Final report to QA',
    type: 'dateString',
    sortable: 'true',
    department: 'EDP',
    editable: true,
  },
  {
    field: 'final_report_to_tfm',
    headerName: 'Final report to TFM',
    type: 'dateString',
    sortable: 'true',
    department: 'QA',
    editable: true,
  },
  {
    field: 'final_invoice',
    headerName: 'Final Invoice (Date)',
    type: 'dateString',
    sortable: 'true',
    department: 'accounts',
    editable: true,
  },
  {
    field: 'final_invoice_number',
    headerName: 'Final Invoice Number',
    type: 'dateString',
    sortable: 'true',
    department: 'accounts',
    editable: true,
  },
  {
    field: 'final_report_to_sponsor',
    headerName: 'Final Report to Sponsor',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'amended_report_from_sponsor',
    headerName: 'Amended Report Mail Received from Sponsor',
    type: 'dateString',
    sortable: 'true',
    department: 'EDP',
    editable: true,
  },
  {
    field: 'amended_report_sd_to_edp',
    headerName: 'Amended Report SD to EDP',
    type: 'dateString',
    sortable: 'true',
    department: 'SD',
    editable: true,
  },
  {
    field: 'amended_report_edp_to_qa',
    headerName: 'Amended Report EDP to QA',
    type: 'dateString',
    sortable: 'true',
    department: 'EDP',
    editable: true,
  },
  {
    field: 'amended_final_report_qa_to_tfm',
    headerName: 'Amended Final report QA to TFM',
    type: 'dateString',
    sortable: 'true',
    department: 'QA',
    editable: true,
  },
  {
    field: 'amended_final_report_tfm_to_sponsor',
    headerName: 'Amended Final Report to Sponsor',
    type: 'dateString',
    sortable: 'true',
    department: 'PM',
    editable: true,
  },
  {
    field: 'hard_copies_sent',
    headerName: 'Hard Copies sent',
    type: 'dateString',
    sortable: 'true',
    department: 'EDP',
    editable: true,
  },
  {
    field: 'archival_date',
    headerName: 'Archival Date (Archivist',
    type: 'dateString',
    sortable: 'true',
    department: 'SD',
    editable: true,
  },
]
