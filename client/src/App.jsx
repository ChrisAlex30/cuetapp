import React from 'react'
import Mcqapp from './Mcqapp'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ErrorPage from './ErrorPage'

const App = () => {
  return (
    <Router>
    <Routes>
    <Route path={'/:subject/:paper'} element={<Mcqapp/>} />
    <Route path="*" element={<ErrorPage />} />
    </Routes>
    </Router>
  )
}

export default App