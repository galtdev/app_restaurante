
import {Routes, Route} from 'react-router-dom';

// ------ ADMINS

import AdminLayout from './layouts/AdminLayout';
import PageUser from './pages/UsuariosPage';
import MenuPage from './pages/MenuPage';
import Dashboard from './pages/DashboardPage';
import CajaPage from './pages/CajaPage';

// ------ MENU CLIENT

import MenuClientLayout from './layouts/ClientMenuLayout';
import MenuClient from './pages/MenuClientPage';


function App() {

  return (
  
    <Routes>

      {/* Seccion admin */}

      <Route path="/admin" element={<AdminLayout/>}>
        <Route path="usuarios" element={<PageUser/>} />
        <Route path="menu" element={<MenuPage/>} />
        <Route path='dashboard' element={<Dashboard/>}></Route>
        <Route path='caja' element={<CajaPage/>}></Route>
      </Route>


      {/* Seccion menu cliente */}

      <Route path="/menu" element={<MenuClientLayout/>}>
        <Route path="" element={<MenuClient/>} />
      </Route>

    </Routes>
    
  )
}

export default App
