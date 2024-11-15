// CustomHeader.js

const CustomHeader = (props) => {
  const department = props.displayName.split('|')[0] // Assuming '|' separates department and headerName
  const headerName = props.displayName.split('|')[1]

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>{department}</div>
      <hr style={{ margin: '5px 0' }} />
      <div>{headerName}</div>
    </div>
  )
}

export default CustomHeader
