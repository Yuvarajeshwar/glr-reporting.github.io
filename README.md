# User Guide for the GLR Reporting Application

---

## What is the application about?

The **GLR Reporting Application** is designed to manage and update study data for different departments, including **Accounts** and **Mail Communication**. It provides an interactive grid to display data, allows users to make changes, and helps to maintain data consistency by ensuring users can update records based on their roles. It also provides functionality to export data as CSV and view logs of actions taken in the application.

---

## Who can edit the fields in the application?

Field editing is role-based. Only users with a role that matches the department to which a field belongs can edit those fields. For example:
- **Accounts role**: Can edit fields related to accounts.
- Other roles: Can edit fields based on their respective department.

In the grid, cells that are editable for a user's role are highlighted with a specific CSS class (`editable-cell`). If a user does not belong to the department of a particular field, they will not be able to edit that field.

---

## What are the toasts to look out for?

Toasts are notifications that inform users about the status of their actions within the application. These toasts appear on the screen briefly and indicate success or errors during operations. Some important toasts include:

### 1. **Error Toast**:
- **Message**: "Study number is missing for the requested update."
  - **When it appears**: When trying to update a record without providing a study number.
   
- **Message**: "Update Failed. Please try again."
  - **When it appears**: If the network request for updating data fails.

### 2. **Success Toast**:
- **Message**: "Update Successful."
  - **When it appears**: After successfully updating a record.

### 3. **Info Toast**:
- **Message**: "Successfully Logged out."
  - **When it appears**: After logging out of the application.
   
- **Message**: "Navigating to logs view."
  - **When it appears**: When a user navigates to the logs section.

---

## How to enter data and validate

### 1. **Entering Data**:
- **Editable cells**: If a cell is editable for the current user based on their role, they can click on the cell to edit it.
- **Date Fields**: If a field is a date, the application provides a date editor, which accepts dates in the format `dd MMM yyyy`. For example, `15 Sep 2023`.
- **Non-date Fields**: For other fields, a text editor is provided for input.

### 2. **Validation**:
- **Date Validation**: When a user enters a date, the app automatically parses and validates it.
- **Study Number**: When updating a record, the system checks if the `study_number` field is present before making an API call.
- If validation fails, an error toast will appear notifying the user of the issue.

### 3. **Saving Data**:
- Changes to a cell trigger an update to the server, sending the updated data with the current user’s name, department, and the timestamp of the update.
- The system checks if the field belongs to a department that the user has access to before sending data.

---

## Additional Features

### 1. **Add New Row**: 
- Users with roles defined in `VITE_ADD_ROW_ALLOWED_ROLES` can add a new row to the grid by clicking the **"Add New Row"** button.

### 2. **View Logs**:
- Users with roles defined in `VITE_VIEW_LOG_ALLOWED_ROLES` can view the application's logs by clicking the **"View Logs"** button.

### 3. **Export Data as CSV**:
- All users can export the current grid data to a CSV file using the **"Export as CSV"** button.

### 4. **Logout**:
- Click on the **"Logout"** button to exit the application. Upon successful logout, the user is returned to the login screen, and an info toast will confirm the action.
