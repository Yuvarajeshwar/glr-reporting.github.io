import { useEffect, useState } from 'react'
import './LogViewer.css' // Add styles for your log viewer

const LogViewer = () => {
  const [logs, setLogs] = useState([])
  const [filter, setFilter] = useState('')
  const [startDateTime, setStartDateTime] = useState('')
  const [endDateTime, setEndDateTime] = useState('')

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_GLR_REPORTING_URL}/logs`
        )
        const data = await response.json()
        console.log(data)
        setLogs(data)
      } catch (error) {
        console.error('Error fetching logs:', error)
      }
    }

    fetchLogs()
  }, [])

  const filteredLogs = logs.filter((log) => {
    const logDate = new Date(log.timestamp)

    // Check if log level or message matches the filter
    const matchesFilter =
      log?.level?.includes(filter) ||
      (typeof log.message === 'string' && log.message.includes(filter))

    // Check if log date falls within the specified date and time range
    const isWithinDateTimeRange =
      (!startDateTime || logDate >= new Date(startDateTime)) &&
      (!endDateTime || logDate <= new Date(endDateTime))

    return matchesFilter && isWithinDateTimeRange
  })

  return (
    <div className="log-viewer">
      <h2>Log Viewer</h2>
      <input
        type="text"
        placeholder="Filter by level or message"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-input"
      />
      <div className="date-filters">
        <div className="date-filter-group">
          <label>Start Time</label>
          <input
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
          />
        </div>
        <div className="date-filter-group">
          <label>End Time</label>
          <input
            type="datetime-local"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
          />
        </div>
      </div>
      <table className="log-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Level</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log, index) => (
            <tr key={index}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.level}</td>
              <td>
                {typeof log.message === 'object'
                  ? JSON.stringify(log.message) // Convert objects to JSON strings
                  : log.message}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LogViewer
