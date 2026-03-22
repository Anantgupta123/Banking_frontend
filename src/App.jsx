import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Navbar from './components/Navbar.jsx'
import { api } from './services/api'
import { toast } from 'react-hot-toast'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      await api.get('/accounts/')
      const userData = { name: 'User' } // Enhanced with backend data later
      setUser(userData)
    } catch (err) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout')
      setUser(null)
      toast.success('Logged out successfully')
    } catch (err) {
      toast.error('Logout failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="card p-12 text-center max-w-sm">
          <div className="w-16 h-16 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-6" />
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" /> } />
          <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Navigate to="/dashboard" /> } />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

