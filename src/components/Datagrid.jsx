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
import { Messages } from 'primereact/messages'

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

const CustomSwitch = ({ checked, onChange }) => {
  return (
    <div className="switch-container">
      <label htmlFor="toggle">Show All Columns</label>
      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          id="toggle"
        />
        <span className="slider"></span>
      </label>
    </div>
  )
}

const Datagrid = () => {
  const [products, setProducts] = useState([])
  const [gridApi, setGridApi] = useState(null)

  const toast = useRef(null)
  const navigate = useNavigate()

  const location = useLocation()
  const userInfo = location.state?.user

  const [showAllColumns, setShowAllColumns] = useState(true)

  const toggleColumnVisibility = () => {
    setShowAllColumns((prevState) => !prevState)
  }

  const editAllRoles = import.meta.env.VITE_EDIT_ALL_FIELDS_ROLES.split(',')

  const transformColumns = (columns) => {
    const pinnedTopRowData = [{}]

    function getField(col) {
      if (!col || !col.department || !col.field) {
        return null
      }

      const department = col.department.toLowerCase()

      if (department === 'study') {
        return col.field
      }

      if (department === 'pm') {
        return `mailCommunication.${col.field}`
      }

      return `${department}.${col.field}`
    }

    const columnDefs = columns
      .filter(
        (col) => userInfo?.role === 'accounts' || col.department !== 'accounts'
      )
      .map((col) => {
        const isEditable =
          (col.field === 'archival_date' && userInfo?.role === 'archivist') ||
          col.department.toLowerCase() === userInfo?.role ||
          editAllRoles.includes(userInfo?.role)

        let isVisible =
          showAllColumns ||
          userInfo?.role === 'tfm' ||
          col.department.toLowerCase() === userInfo?.role ||
          col.freeze === 'true'

        return {
          headerName:
            col.field !== 'archival_date'
              ? `${col.headerName} (${col.department.toUpperCase()})`
              : `${col.headerName})`,
          field: getField(col),
          sortable: col.sortable === 'true',
          pinned: col.freeze === 'true' ? 'left' : null,
          editable: isEditable,
          filter: 'agTextColumnFilter',
          cellEditor:
            col.type === 'dropdown' ? 'agSelectCellEditor' : 'agTextCellEditor',
          cellEditorParams:
            col.type === 'dropdown'
              ? { values: col.dropdownValues || [] }
              : null,
          valueFormatter: col.type === 'date' ? dateFormatter : null,
          valueParser: col.type === 'date' ? dateParser : null,
          cellClass:
            col.department.toLowerCase() === userInfo?.role ||
            editAllRoles.includes(userInfo?.role)
              ? 'editable-cell'
              : null,
          headerTooltip: col.department.toUpperCase() || '',
          width: 200,
          hide: !isVisible,
        }
      })

    return { columnDefs, pinnedTopRowData }
  }

  const { columnDefs, pinnedTopRowData } = transformColumns(columnsDefinition)

  const msgs = useRef(null)

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
            method: 'POST', // Specify the method (default is GET)
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
    if (!id) {
      toast.current.show({
        severity: 'error',
        summary: 'Info',
        detail: 'Study number is missing for the requested update.',
      })
      return
    }

    const dept =
      department !== 'PM' ? department.toLowerCase() : 'mailCommunication'

    try {
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

      const result = await response.json()

      if (result.success) {
        toast.current.show({
          severity: 'success',
          summary: 'Info',
          detail: result.message,
        })
        return result
      } else {
        const dateFormatError =
          result.message &&
          result.message.toLowerCase().includes('invalid date format')
        if (dateFormatError) {
          if (msgs.current) {
            msgs.current.clear() // Clear any previous messages
            msgs.current.show([
              {
                life: 8000,
                severity: 'error',
                summary: 'Info',
                detail: '- Accepted date format: dd MMM yyyy',
              },
              {
                life: 8000,
                severity: 'error',
                summary: 'Info',
                detail:
                  '- Accepted date format for multiple dates : dd MMM yyyy & dd MMM yyyy',
              },
              {
                life: 8000,
                severity: 'error',
                summary: 'Info',
                detail: '- Timestamps are not allowed.',
              },
            ])
          }
        }

        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: result.message || 'Update failed, please try again.',
        })
        return null
      }
    } catch (error) {
      console.error('Network error:', error)
      toast.current.show({
        severity: 'error',
        summary: 'Network Error',
        detail: 'Failed to connect to the server. Please try again later.',
      })
      return null
    }
  }

  const handleCellValueChanged = (event) => {
    const { data, colDef, newValue } = event
    data[colDef.field] = newValue
    const fieldParts = colDef.field.split('.') // Split at the dot '.'
    colDef.field = fieldParts.length > 1 ? fieldParts[1] : colDef.field

    function getTypeByField(field) {
      for (const column of columnsDefinition) {
        console.log(column)
        if (column && column.field === field) {
          return column.type
        }
      }
      return 'Field not found'
    }

    const type = getTypeByField(colDef.field)
    const datasent = {
      [colDef.field]: newValue,
      updated_by: userInfo?.name,
      update_dttm: new Date(),
      field_type: type,
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
      sendData(data.study_number, datasent, department, type)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.error('Error sending data:', error)
        })
    } else {
      toast.current.show({
        severity: 'info',
        summary: 'Info',
        detail: 'Please login to make changes to the application',
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

  const handleCellEditingStopped = async (event) => {
    const { data, colDef, newValue } = event
    data[colDef.field] = newValue // Update the product's field with the new value

    gridApi.applyTransaction({ update: [data] })
  }

  const addRowAllowedRoles = import.meta.env.VITE_ADD_ROW_ALLOWED_ROLES.split(
    ','
  )
  const viewLogRoles = import.meta.env.VITE_VIEW_LOG_ALLOWED_ROLES.split(',')
  const viewExportCsvOption =
    import.meta.env?.VITE_VIEW_EXPORT_CSV_ROLES.split(',') ?? null

    const copyToClipboard = () => {
      const selectedNodes = gridApi.getSelectedNodes(); // Get selected rows
      const selectedData = selectedNodes.map((node) => node.data); // Extract row data
    
    function flattenObject(obj, prefix = '') {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            const prefixedKey = prefix ? `${prefix}.${key}` : key;
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                Object.assign(acc, flattenObject(value, prefixedKey));
            } else {
                acc[prefixedKey] = value;
            }
            return acc;
        }, {});
    }
    
    function jsonToExcel(data) {
        const rows = Array.isArray(data) ? data : [data];
        const flatRows = rows.map(row => flattenObject(row));
    
        // Create headers
        const headers = Object.keys(flatRows.reduce((acc, row) => ({ ...acc, ...row }), {}));
        const tsv = [
            headers.join('\t'), // Header row
            ...flatRows.map(row => headers.map(header => row[header] || '').join('\t')) // Data rows
        ].join('\n');
    
        return tsv;
    }
    
      const tsvData = jsonToExcel(selectedData);
      navigator.clipboard.writeText(tsvData).then(() => {
          console.log('Data copied to clipboard in Excel-compatible format!');
      }).catch(err => {
          console.error('Could not copy data:', err);
      });
    };
  

  return (
    <>
      <Toast ref={toast} />

      <span className="button-container">
        <img src={GLR} alt="Logo" className="logo" />
        {/* Add the Switch for toggling columns */}

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
        {viewExportCsvOption.includes(userInfo?.role) && (
          <Button
            className="right-button"
            label="Export as CSV"
            type="button"
            rounded
            onClick={exportToCSV}
            data-pr-tooltip="Export CSV"
          />
        )}

        {/* Display welcome message in a box */}
        {userInfo && (
          <div className="welcome-box">
            Welcome {userInfo.name}. Logged in as {userInfo.role.toUpperCase()}.
          </div>
        )}
        {import.meta.env.VITE_VIEW_SHOW_ALL_COLUMN_TOGGLE === 'true' && (
          <div className="column-toggle-switch">
            <CustomSwitch
              checked={showAllColumns}
              onChange={toggleColumnVisibility}
            />
          </div>
        )}
        {import.meta.env.VITE_ALLOW_ROW_COPY === 'true' && (
        <Button label="Copy Selected Rows" onClick={copyToClipboard} />
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

      {/* Information Banner */}
      <div className="card">
        <Messages ref={msgs} />
      </div>

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
          columnDefs={[
            {
              headerCheckboxSelection: true, // Show checkbox in the header for selecting all rows
              checkboxSelection: true, // Show checkbox in each row
              headerName: '', // Empty header for checkbox column
              width: 50, // Adjust width of checkbox column
              pinned: 'left', // Optional: Pin the checkbox column to the left
            },
            ...columnDefs, // Spread your other column definitions
          ]}
            rowData={products}
            pagination={true}
            paginationPageSize={50}
            singleClickEdit={true}
            suppressMovableColumns={true}
            onCellValueChanged={handleCellValueChanged}
            onGridReady={onGridReady}
            // pinnedTopRowData={pinnedTopRowData}
            domLayout="normal"
            autoWidth={true}
            headerHeight={120}
            onCellEditingStopped={handleCellEditingStopped}
            rowSelection="multiple" // Enable multiple row selection
            enableClipboard={true} // Enable clipboard functionality
            suppressCopyRowsToClipboard={false} // Include full rows in clipboard
            rowMultiSelectWithClick={true} // Allow multi-row selection with Ctrl+Click
            suppressRowClickSelection={false} // Enable row click selection
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
