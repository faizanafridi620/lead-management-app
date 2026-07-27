import './App.css'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LeadDetails from './pages/LeadDetails'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }/>
      <Route path='/dashboard/leads/:id' element={
        <ProtectedRoute>
          <LeadDetails />
        </ProtectedRoute>
      }/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
