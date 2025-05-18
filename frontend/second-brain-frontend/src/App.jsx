import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import SaveItem from './pages/SaveItem'
import MainLayout from './components/MainLayout'

import AuthPage from './pages/Login'
import ContentPage from './components/ContentPage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="save" element={<SaveItem />} />
          <Route path="signup" element={<AuthPage/>}/>
          <Route path="my-items" element={<ContentPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
