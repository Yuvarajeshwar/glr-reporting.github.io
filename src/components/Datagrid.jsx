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
import CustomHeader from './CustomHeader'

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

  const location = useLocation()
  const userInfo = location.state?.user
  console.log(userInfo?.role)

  const transformColumns = (columns) => {
    return columns
      .filter(
        (col) => userInfo.role === 'accounts' || col.department !== 'accounts'
      ) // Filter out accounts columns if user is not in accounts
      .map((col) => ({
        headerName: `${col.department}|${col.headerName || col.name}`, // Pass department and headerName separated by '|'
        field: col.field,
        sortable: col.sortable === 'true',
        pinned: col.freeze === 'true' ? 'left' : null,
        editable: true,
        filter: true,
        cellEditor:
          col.type === 'date' ? 'agDateCellEditor' : 'agTextCellEditor',
        valueFormatter: col.type === 'date' ? dateFormatter : null,
        valueParser: col.type === 'date' ? dateParser : null,
        cellClass:
          col.department.toLowerCase() === userInfo.role
            ? 'editable-cell'
            : null, // Apply class for editable columns

        // Use CustomHeader component for the header
        headerComponent: CustomHeader,
      }))
  }

  const columnDefs = transformColumns(columnsDefinition)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the user role is 'accounts'
        const headers =
          userInfo.role === 'accounts'
            ? { 'Content-Type': 'application/json', role: 'accounts' } // Add the custom 'Role' header
            : { 'Content-Type': 'application/json' } // Default header

        const response = await fetch(`${import.meta.env.VITE_GLR_REPORTING_URL}/study`, {
          method: 'GET', // Specify the method (default is GET)
          headers: headers, // Include the headers object
        })

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
    const dept =
      department !== 'MAIL COMMUNICATION'
        ? department.toLowerCase()
        : 'mailCommunication'

    try {
      if (!id) {
        toast.current.show({
          severity: 'error',
          summary: 'Info',
          detail: 'Study number is missing for the requested update.',
        })
        return
      }
      const response = await fetch(`${import.meta.env.VITE_GLR_REPORTING_URL}/${dept}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: raw,
      })

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
    if (userInfo.role) {
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

  const addNewRow = () => {
    // Create a new row object with default values based on column definitions
    const newRow = columnDefs.reduce((row, col) => {
      row[col.field] = '' // Initialize each field with an empty string or default value
      return row
    }, {})

    // Add the new row to the beginning of the products array
    setProducts([newRow, ...products])
  }
  return (
    <>
      <Toast ref={toast} />
      <span className="button-container">
        <img src={GLR} alt="Logo" className="logo" />
        <Button
          className="center-button"
          label="Add New Row"
          type="button"
          rounded
          onClick={addNewRow}
          data-pr-tooltip="Add New Row"
        />
        <Button
          className="right-button"
          label="Export as CSV"
          type="button"
          rounded
          onClick={exportToCSV}
          data-pr-tooltip="Export CSV"
        />
      </span>
      <div className="ag-theme-quartz" style={{ height: 1500, width: '100%' }}>
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
            domLayout="autoHeight"
            rowClassRules={{
              'fixed-row': (params) => params.rowIndex === 0,
            }}
          />
        ) : (
          <Login10 />
        )}
      </div>
    </>
  )
}

export default Datagrid
