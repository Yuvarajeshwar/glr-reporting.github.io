export const ProductService = {
  getProductsData() {
    return [
      {
        id: "1000",
        study_number: "f230fh0g3",
        test_name: "Injection",
        study_title: "Product study_title",
        sponsor: "Lab Limited",
        tico_status: "INSTOCK",
        sd_name: "Doctor",
      },
      {
        id: "1001",
        study_number: "nvklal433",
        test_name: "Chemical",
        study_title: "Product study_title",
        sponsor: "Lab 2 Limited",
        tico_status: "INSTOCK",
        sd_name: "Doctor",
      },
    ];
  },

  getProductsWithOrdersData() {
    return [
      {
        id: "1000",
        study_number: "f230fh0g3",
        test_name: "Bamboo Watch",
        study_title: "Product study_title",
        sponsor: "Lab 1 Limited",
        tico_status: "INSTOCK",
        sd_name: "Doctor",
        tico: [
          {
            sample_received_dttm: "21/04/2024",
            tids_received_dttm: "22/04/2024",
            scope_approval_dttm: "23/04/2024",
          },
        ],
        sd_data: [
          {
            scope: "Limited",
            draft_study_plan_to_qa: "01/05/2024",
            corrected_draft_study_plan_to_qa: "01/05/2024",
            study_initiation: "01/05/2024",
            experiment_start_date: "01/05/2024",
            experiment_complete_date: "01/05/2024",
            draft_report_commited_to_qa: "01/05/2024",
            draft_report_commited_to_sponsor: "01/05/2024",
            draft_report_completion: "01/05/2024",
            draft_report_to_qa: "01/05/2024",
            corrected_draft_report_to_qa: "01/05/2024",
            study_completion: "01/05/2024",
          },
        ],
        mail_comm_data: [
          {
            tids_issued_to_yaminy: "01/05/2024",
            sponsor_name: "Lab 1 Limited",
            test_name: "Black Watch",
            study_title: "Product study_title",
            direct_reports: "01/05/2024",
            corrected_draft_study_plan_to_sponsor: "01/05/2024",
            approval_for_corrected_draft_study_plan_received: "01/05/2024",
            corrected_draft_study_plan_comments_to_sd: "01/05/2024",
            definitive_plan_to_sponsor: "01/05/2024",
            definitive_study_plan_sponsor_approval: "01/05/2024",
            definitive_study_plan_comments_to_sd: "01/05/2024",
            draft_report_to_sponsor: "01/05/2024",
            draft_report_sponsor_reply: "01/05/2024",
            draft_report_comments_to_sd: "01/05/2024",
            corrected_draft_report_to_sponsor: "01/05/2024",
            corrected_draft_report_sponsor_reply: "01/05/2024",
            corrected_draft_report_comments_to_sd: "01/05/2024",
          },
        ],
        accounts: [
          {
            invoice_number: "IND-010",
            invoice_date: "01/06/2024",
            payment_received_in_percent: "70",
            final_invoice: "15/06/2024",
          },
        ],
        edp_data: [
            {
                sd_allotment_yaminy_to_qa : "12/12/2024",
        study_alloted_to_qa : "12/12/2024",
        study_plan_prepared_by : "Doctor",
        study_plan_prepared_on : "12/12/2024",
        definitive_study_plan_taken : "12/12/2024",
        definitive_study_plan_sent_to_qa : "12/12/2024",
        final_report_taken : "12/12/2024",
        final_report_to_qa : "12/12/2024",
        hard_copies_sent : "12/12/2024",
        study_plan_to_sd: "12/12/2024"
            }
        ],
        qa_data: [
            {
                draft_study_plan_to_yaminy_by_qa: "01/08/2024",
        corrected_draft_study_plan_to_yaminy_by_qa: "01/08/2024",
        definitive_study_plan_to_yaminy_by_qa: "01/08/2024",
        draft_report_to_yaminy_by_qa: "01/08/2024",
        corrected_draft_report_to_yaminy_by_qa: "01/08/2024",
        final_report_to_yaminy: "01/08/2024",
            }
        ]
      },
      {
        id: "1001",
        study_number: "nvklal433",
        test_name: "Black Watch",
        study_title: "Product study_title",
        sponsor: "Lab 2 Limited",
        tico_status: "INSTOCK",
        sd_name: "Doctor",
        tico: [
          {
            sample_received_dttm: "01/05/2024",
            tids_received_dttm: "02/05/2024",
            scope_approval_dttm: "03/05/2024",
          },
        ],
        sd_data: [
          {
            scope: "Limited",
            draft_study_plan_to_qa: "01/05/2024",
            corrected_draft_study_plan_to_qa: "01/05/2024",
            study_initiation: "01/05/2024",
            experiment_start_date: "01/05/2024",
            experiment_complete_date: "01/05/2024",
            draft_report_commited_to_qa: "01/05/2024",
            draft_report_commited_to_sponsor: "01/05/2024",
            draft_report_completion: "01/05/2024",
            draft_report_to_qa: "01/05/2024",
            corrected_draft_report_to_qa: "01/05/2024",
            study_completion: "01/05/2024",
          },
        ],
        mail_comm_data: [
          {
            tids_issued_to_yaminy: "01/05/2024",
            sponsor_name: "Lab 2 Limited",
            test_name: "Black Watch",
            study_title: "Product study_title",
            direct_reports: "01/05/2024",
            corrected_draft_study_plan_to_sponsor: "01/05/2024",
            approval_for_corrected_draft_study_plan_received: "01/05/2024",
            corrected_draft_study_plan_comments_to_sd: "01/05/2024",
            definitive_plan_to_sponsor: "01/05/2024",
            definitive_study_plan_sponsor_approval: "01/05/2024",
            definitive_study_plan_comments_to_sd: "01/05/2024",
            draft_report_to_sponsor: "01/05/2024",
            draft_report_sponsor_reply: "01/05/2024",
            draft_report_comments_to_sd: "01/05/2024",
            corrected_draft_report_to_sponsor: "01/05/2024",
            corrected_draft_report_sponsor_reply: "01/05/2024",
            corrected_draft_report_comments_to_sd: "01/05/2024",
          },
        ],
        accounts: [
          {
            invoice_number: "IND-010",
            invoice_date: "01/06/2024",
            payment_received_in_percent: "70",
            final_invoice: "15/06/2024",
          },
        ],
        edp_data: [
            {
                sd_allotment_yaminy_to_qa : "12/12/2024",
        study_alloted_to_qa : "12/12/2024",
        study_plan_prepared_by : "Doctor",
        study_plan_prepared_on : "12/12/2024",
        definitive_study_plan_taken : "12/12/2024",
        definitive_study_plan_sent_to_qa : "12/12/2024",
        final_report_taken : "12/12/2024",
        final_report_to_qa : "12/12/2024",
        hard_copies_sent : "12/12/2024",
        study_plan_to_sd: "12/12/2024"
            }
        ],
        qa_data: [
            {
                draft_study_plan_to_yaminy_by_qa: "01/08/2024",
        corrected_draft_study_plan_to_yaminy_by_qa: "01/08/2024",
        definitive_study_plan_to_yaminy_by_qa: "01/08/2024",
        draft_report_to_yaminy_by_qa: "01/08/2024",
        corrected_draft_report_to_yaminy_by_qa: "01/08/2024",
        final_report_to_yaminy: "01/08/2024",
            }
        ]
      },
    ];
  },

  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  },

  getProductsSmall() {
    return Promise.resolve(this.getProductsData().slice(0, 10));
  },

  getProducts() {
    return Promise.resolve(this.getProductsData());
  },

  getProductsWithOrdersSmall() {
    return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
  },

  getProductsWithOrders() {
    return Promise.resolve(this.getProductsWithOrdersData());
  },
};
