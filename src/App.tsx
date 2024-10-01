import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Quiz from "./components/Quiz"
import Review from "./components/Review";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  )
}

export default App;