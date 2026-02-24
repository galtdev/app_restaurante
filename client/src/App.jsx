
import {Routes, Route} from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import PageUser from './pages/UsuariosPage';
import MenuPage from './pages/MenuPage';
import Dashboard from './pages/DashboardPage'


function App() {

  return (
  
    <Routes>
      <Route path="/admin" element={<AdminLayout/>}>
        <Route path="usuarios" element={<PageUser/>} />
        <Route path="menu" element={<MenuPage/>} />
        <Route path='dashboard' element={<Dashboard/>}></Route>
      </Route>
    </Routes>
    
  )
}

export default App
