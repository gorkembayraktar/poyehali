import { motion } from 'framer-motion'
import { useProgress } from '../contexts/ProgressContext'
import Sidebar from '../components/Sidebar'
import RightSidebar from '../components/RightSidebar'
import LearningPath from '../components/learning-path/LearningPath'
import BottomNav from '../components/BottomNav'

function Home({ view }) {
  const sections = view === 'cyrillic'
    ? ['alphabet', 'phonetics', 'confusion']
    : ['vocabulary', 'practice']

  return (
    <LearningPath view={view} sections={sections} />
  )
}

export default Home
