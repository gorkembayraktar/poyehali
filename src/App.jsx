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
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lesson/:lessonId" element={<Lesson />} />
            </Routes>
          </Layout>
        </Router>
      </ProgressProvider>
    </ThemeProvider>
  )
}

export default App
