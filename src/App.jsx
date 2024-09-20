import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login10 from '../login-form-20'
import Datagrid from './components/Datagrid'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login10 />}></Route>
        <Route path="/glrTracker" element={<Datagrid />} />
      </Routes>
    </Router>
  )
}

export default App
