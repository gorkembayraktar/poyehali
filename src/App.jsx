import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { ProgressProvider } from './contexts/ProgressContext'
import Home from './pages/Home'
import Lesson from './pages/Lesson'
import Layout from './components/Layout'

function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <Router>
          <Routes>
            {/* Main learning path - no layout wrapper */}
            <Route path="/" element={<Home />} />
            <Route path="/lesson/:lessonId" element={<Lesson />} />

            {/* Legacy routes can be kept for reference but hidden */}
          </Routes>
        </Router>
      </ProgressProvider>
    </ThemeProvider>
  )
}

export default App
