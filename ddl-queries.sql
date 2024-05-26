-- Create Study Table
-- Can reuse https://github.com/infantsurya/glr_backend/blob/main/src/models/study.js -- this model. 

CREATE TABLE Study (
    id INT AUTO_INCREMENT PRIMARY KEY,
    study_number VARCHAR(255),
    test_name VARCHAR(255),
    study_title VARCHAR(255),
    sponsor VARCHAR(255),
    tico_status VARCHAR(255),
    sd_name VARCHAR(255)
);

-- Create Tico Table
CREATE TABLE Tico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    study_id INT,
    sample_received_dttm VARCHAR(10),
    tids_received_dttm VARCHAR(10),
    scope_approval_dttm VARCHAR(10),
    FOREIGN KEY (study_id) REFERENCES Study(id)
);

-- Create SdData Table
CREATE TABLE SdData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    study_id INT,
    scope VARCHAR(255),
    draft_study_plan_to_qa VARCHAR(10),
    corrected_draft_study_plan_to_qa VARCHAR(10),
    study_initiation VARCHAR(10),
    experiment_start_date VARCHAR(10),
    experiment_complete_date VARCHAR(10),
    draft_report_commited_to_qa VARCHAR(10),
    draft_report_commited_to_sponsor VARCHAR(10),
    draft_report_completion VARCHAR(10),
    draft_report_to_qa VARCHAR(10),
    corrected_draft_report_to_qa VARCHAR(10),
    study_completion VARCHAR(10),
    FOREIGN KEY (study_id) REFERENCES Study(id)
);

-- Create MailCommData Table
CREATE TABLE MailCommData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    study_id INT,
    tids_issued_to_yaminy VARCHAR(10),
    sponsor_name VARCHAR(255),
    test_name VARCHAR(255),
    study_title VARCHAR(255),
    direct_reports VARCHAR(10),
    corrected_draft_study_plan_to_sponsor VARCHAR(10),
    approval_for_corrected_draft_study_plan_received VARCHAR(10),
    corrected_draft_study_plan_comments_to_sd VARCHAR(10),
    definitive_plan_to_sponsor VARCHAR(10),
    definitive_study_plan_sponsor_approval VARCHAR(10),
    definitive_study_plan_comments_to_sd VARCHAR(10),
    draft_report_to_sponsor VARCHAR(10),
    draft_report_sponsor_reply VARCHAR(10),
    draft_report_comments_to_sd VARCHAR(10),
    corrected_draft_report_to_sponsor VARCHAR(10),
    corrected_draft_report_sponsor_reply VARCHAR(10),
    corrected_draft_report_comments_to_sd VARCHAR(10),
    FOREIGN KEY (study_id) REFERENCES Study(id)
);

-- Create Accounts Table
CREATE TABLE Accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    study_id INT,
    invoice_number VARCHAR(255),
    invoice_date VARCHAR(10),
    payment_received_in_percent VARCHAR(10),
    final_invoice VARCHAR(10),
    FOREIGN KEY (study_id) REFERENCES Study(id)
);

-- Create EdpData Table
CREATE TABLE EdpData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    study_id INT,
    sd_allotment_yaminy_to_qa VARCHAR(10),
    study_alloted_to_qa VARCHAR(10),
    study_plan_prepared_by VARCHAR(255),
    study_plan_prepared_on VARCHAR(10),
    definitive_study_plan_taken VARCHAR(10),
    definitive_study_plan_sent_to_qa VARCHAR(10),
    final_report_taken VARCHAR(10),
    final_report_to_qa VARCHAR(10),
    hard_copies_sent VARCHAR(10),
    study_plan_to_sd VARCHAR(10),
    FOREIGN KEY (study_id) REFERENCES Study(id)
);

-- Create QaData Table
CREATE TABLE QaData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    study_id INT,
    draft_study_plan_to_yaminy_by_qa VARCHAR(10),
    corrected_draft_study_plan_to_yaminy_by_qa VARCHAR(10),
    definitive_study_plan_to_yaminy_by_qa VARCHAR(10),
    draft_report_to_yaminy_by_qa VARCHAR(10),
    corrected_draft_report_to_yaminy_by_qa VARCHAR(10),
    final_report_to_yaminy VARCHAR(10),
    FOREIGN KEY (study_id) REFERENCES Study(id)
);
