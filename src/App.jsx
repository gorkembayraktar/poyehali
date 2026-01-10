import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { SoundProvider } from './contexts/SoundContext'
import { ProgressProvider } from './contexts/ProgressContext'
import Home from './pages/Home'
import Lesson from './pages/Lesson'
import Story from './pages/Story'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <ProgressProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home view="path" />} />
                <Route path="/alphabet" element={<Home view="cyrillic" />} />
                <Route path="/story" element={<Home view="stories" />} />
                <Route path="/lesson/:lessonId" element={<Lesson />} />
                <Route path="/story/:storyId" element={<Story />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </ProgressProvider>
      </SoundProvider>
    </ThemeProvider>
  )
}

export default App
