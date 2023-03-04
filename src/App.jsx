import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/home/Home'
import { Form } from './components/form/Form'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/create" element={<Form />} />
        <Route exact path="/:id/update" element={<Form />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
