import { useEffect, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css' // Core grid styles
import 'ag-grid-community/styles/ag-theme-quartz.css' // Theme styles
import { columnsDefinition } from './ColumnsDef'
import { Toast } from 'primereact/toast'
import './Datagrid.css'
import { Button } from 'primereact/button'
import { useLocation } from 'react-router-dom'
import GLR from '../assets/GLR-1.png'
import Login10 from '../../login-form-20'
import { useNavigate } from 'react-router-dom'

const dateFormatter = (params) => {
  if (!params.value) return ''
  const date = new Date(params.value)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const dateParser = (params) => {
  if (!params.newValue) return null
  const [day, month, year] = params.newValue.split(' ')
  const monthIndex = new Date(Date.parse(month + ' 1, 2012')).getMonth() // Convert month to index
  return new Date(year, monthIndex, day)
}

const Datagrid = () => {
  const [products, setProducts] = useState([])
  const [gridApi, setGridApi] = useState(null)

  const toast = useRef(null)
  const navigate = useNavigate()

  const location = useLocation()
  const userInfo = location.state?.user

  const editAllRoles = import.meta.env.VITE_EDIT_ALL_FIELDS_ROLES.split(',')

  const transformColumns = (columns) => {
    const pinnedTopRowData = [{}] // Initialize pinned row data

    const columnDefs = columns
      .filter(
        (col) => userInfo?.role === 'accounts' || col.department !== 'accounts'
      ) // Filter out accounts columns if user is not in accounts
      .map((col) => {
        // Set department for pinned row based on field
        pinnedTopRowData[0][col.field] = col.department || '' // Add department to pinned row data

        return {
          headerName: `${col.headerName || col.name}`, // Pass department and headerName separated by '|'
          field:
            col.department.toLowerCase() === 'study'
              ? col.field
              : `${col.department.toLowerCase()}.${col.field}`,
          sortable: col.sortable === 'true',
          pinned: col.freeze === 'true' ? 'left' : null,
          editable:
            col.department.toLowerCase() === userInfo?.role ||
            editAllRoles.includes(userInfo?.role),
          filter:
            col.type === 'date' ? 'agDateColumnFilter' : 'agTextColumnFilter',
          cellEditor:
            col.type === 'date' ? 'agDateCellEditor' : 'agTextCellEditor',
          valueFormatter: col.type === 'date' ? dateFormatter : null,
          valueParser: col.type === 'date' ? dateParser : null,
          cellClass:
            col.department.toLowerCase() === userInfo?.role ||
            editAllRoles.includes(userInfo?.role)
              ? 'editable-cell'
              : null, // Apply class for editable columns
          headerTooltip: col.department.toUpperCase() || '', // Add department as tooltip
        }
      })

    return { columnDefs, pinnedTopRowData }
  }

  const { columnDefs, pinnedTopRowData } = transformColumns(columnsDefinition)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the user role is 'accounts'
        const headers =
          userInfo?.role === 'accounts'
            ? { 'Content-Type': 'application/json', role: 'accounts' } // Add the custom 'Role' header
            : { 'Content-Type': 'application/json' } // Default header

        const response = await fetch(
          `${import.meta.env.VITE_GLR_REPORTING_URL}/study`,
          {
            method: 'GET', // Specify the method (default is GET)
            headers: headers, // Include the headers object
          }
        )

        const result = await response.json()

        // Extract the relevant data
        const { data } = result
        setProducts(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [userInfo?.role])

  const sendData = async (id, data, department) => {
    const raw = JSON.stringify(data)

    try {
      if (!id) {
        toast.current.show({
          severity: 'error',
          summary: 'Info',
          detail: 'Study number is missing for the requested update.',
        })
        return
      }
      console
      const dept =
        department !== 'MAIL COMMUNICATION'
          ? department.toLowerCase()
          : 'mailCommunication'
      const response = await fetch(
        `${import.meta.env.VITE_GLR_REPORTING_URL}/${dept}/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: raw,
        }
      )

      if (!response.ok) {
        toast.current.show({
          severity: 'error',
          summary: 'Info',
          detail: 'Update Failed. Please try again.',
        })
        throw new Error('Network response was not ok')
      }

      const result = await response.json()
      toast.current.show({
        severity: 'success',
        summary: 'Info',
        detail: 'Update Successful',
      })
      return result
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleCellValueChanged = (event) => {
    const { data, colDef, newValue } = event
    const fieldParts = colDef.field.split('.') // Split at the dot '.'
    colDef.field = fieldParts.length > 1 ? fieldParts[1] : colDef.field
    const datasent = {
      [colDef.field]: newValue,
      updated_by: userInfo.name,
      update_dttm: new Date(),
    }

    function getDepartmentByField(field) {
      for (const column of columnsDefinition) {
        if (column && column.field === field) {
          return column.department || 'Field does not have a department'
        }
      }
      return 'Field not found'
    }

    const department = getDepartmentByField(colDef.field)
    if (userInfo?.role) {
      sendData(data.study_number, datasent, department)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.error('Error sending data:', error)
        })
    }
  }

  const onGridReady = (params) => {
    setGridApi(params.api)
  }

  const exportToCSV = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv()
    } else {
      console.error('Grid API is not available.')
    }
  }

  const handleLogout = () => {
    navigate('/')
    toast.current.show({
      severity: 'info',
      summary: 'Info',
      detail: 'Successfully Logged out.',
    })
  }

  const viewLogs = () => {
    window.open('/logs', '_blank')
    toast.current.show({
      severity: 'info',
      summary: 'Info',
      detail: 'Navigating to logs view',
    })
  }

  const addNewRow = () => {
    // Create a new row object with default values based on column definitions
    const newRow = columnDefs.reduce((row, col) => {
      row[col.field] = '' // Initialize each field with an empty string or default value
      return row
    }, {})

    // Add the new row to the beginning of the products array
    setProducts([newRow, ...products])
  }

  const addRowAllowedRoles = import.meta.env.VITE_ADD_ROW_ALLOWED_ROLES.split(
    ','
  )
  const viewLogRoles = import.meta.env.VITE_VIEW_LOG_ALLOWED_ROLES.split(',')

  return (
    <>
      <Toast ref={toast} />

      <span className="button-container">
        <img src={GLR} alt="Logo" className="logo" />

        {addRowAllowedRoles.includes(userInfo?.role) && (
          <Button
            className="center-button"
            label="Add New Row"
            type="button"
            rounded
            onClick={addNewRow}
            data-pr-tooltip="Add New Row"
            style={{ marginRight: '10px' }} // Adjust the value as needed
          />
        )}
        {viewLogRoles.includes(userInfo?.role) && (
          <Button
            className="center-button"
            label="View Logs"
            type="button"
            rounded
            onClick={viewLogs}
            data-pr-tooltip="Add New Row"
          />
        )}

        <Button
          className="right-button"
          label="Export as CSV"
          type="button"
          rounded
          onClick={exportToCSV}
          data-pr-tooltip="Export CSV"
        />

        {/* Display welcome message in a box */}
        {userInfo && (
          <div className="welcome-box">
            Welcome {userInfo.name}. Logged in as {userInfo.role.toUpperCase()}.
          </div>
        )}

        <Button
          className="right-button"
          label="Logout"
          type="button"
          rounded
          onClick={handleLogout}
          data-pr-tooltip="Logout"
        />
      </span>

      <div
        className="ag-theme-quartz"
        style={{
          height: 'calc(100vh - 100px)',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {userInfo ? (
          <AgGridReact
            columnDefs={columnDefs}
            rowData={products}
            pagination={true}
            paginationPageSize={10}
            singleClickEdit={true}
            suppressMovableColumns={true}
            onCellValueChanged={handleCellValueChanged}
            onGridReady={onGridReady}
            // pinnedTopRowData={pinnedTopRowData}
            domLayout="normal"
            autoWidth={true}
            // headerHeight={50} // Optional: adjust header height if needed
            // rowClassRules={{
            //   'fixed-row': (params) => params.node.rowPinned, // Apply class for pinned row
            // }}
          />
        ) : (
          <Login10 />
        )}
      </div>
    </>
  )
}

export default Datagrid
