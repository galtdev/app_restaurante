
import {Routes, Route} from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import PageUser from './pages/UsuariosPage';
import MenuPage from './pages/MenuPage'


function App() {

  return (
  
    <Routes>
      <Route path="/admin" element={<AdminLayout/>}>
        <Route path="usuarios" element={<PageUser/>} />
        <Route path="menu" element={<MenuPage/>} />
      </Route>
    </Routes>
    
  )
}

export default App
