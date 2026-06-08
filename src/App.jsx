import { useState } from 'react'
import './App.css'
import PayrollDashboard from './components/PayrollDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <PayrollDashboard />
    </div>
  )
}

export default App
