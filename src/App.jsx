import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import { Create } from './components/Create'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
