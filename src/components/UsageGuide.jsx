import ReactMarkdown from 'react-markdown'
import './UsageGuide.css'

const userGuideMarkdown = `
# User Guide for the GLR Reporting Application

---

## What is the application about?

The **GLR Reporting Application** is designed to manage and update study data for different departments, including **Accounts** and **Mail Communication**. It provides an interactive grid to display data, allows users to make changes, and helps to maintain data consistency by ensuring users can update records based on their roles. It also provides functionality to export data as CSV and view logs of actions taken in the application.

---

## Who can edit the fields in the application?

Field editing is role-based. Only users with a role that matches the department to which a field belongs can edit those fields. For example:
- **Accounts role**: Can edit fields related to accounts.

In the grid, cells that are editable for a user's role are highlighted with a specific color. If a user does not belong to the department of a particular field, they will not be able to edit that field.

---

## How to enter data and validate

### 1. **Entering Data**:
- **Editable cells**: If a cell is editable for the current user based on their role, they can click on the cell to edit it.
- **Date Fields**: If a field is a date, the application provides a date editor, which accepts dates in the format dd MMM yyyy.
- **Non-date Fields**: For other fields, a text editor is provided for input.

### 2. **Saving Data**:
- Changes to a cell trigger an update to the server, sending the updated data with the current user’s name, department, and the timestamp of the update. All changes will be logged in the server for auditing purposes.
- The system checks if the field belongs to a department that the user has access to before sending data.

- Here is a demonstration of how data should be entered and how the application confirms that the data has been saved.
- In this example, an SD user has logged in. So fields that are assigned to SD user will be highlighted with blue color and only those fields will be editable. All other fields will not allow edit.
- Once the data is edited, it saves it to database. Update successful notification will be displayed as in the video if data is saved.

![data](/assets/data_addition_1.gif)
---

## Additional Features

### 1. **Export Data as CSV**:
- All users can export the current grid data to a CSV file using the **"Export as CSV"** button.

### 2. **Sorting**:
- Sorting the data is possible by clicking on column headers. Multiple columns can be sorted by holding the **Shift** key and clicking on additional columns.
- Here is a GIF demonstrating the feature:

![Sorting](/assets/sorting.gif)

### 3. **Filtering**:
- Users can apply filters to columns, such as text or date filters, by clicking on the filter icon in each column header.
- Here is a GIF demonstrating the feature:

![Filtering](/assets/filtering.gif)
`

const UserGuide = () => {
  return (
    <div className="user-guide">
      <ReactMarkdown>{userGuideMarkdown}</ReactMarkdown>
    </div>
  )
}

export default UserGuide
