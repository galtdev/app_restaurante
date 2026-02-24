import { NavLink } from "react-router-dom";
import '../styles/styles.css';

export default function Sidebar(){
    return(
        <aside className="sidebar">
            <h2>Restaurante APP</h2>
            <nav className="sidebar-nav">
                <NavLink to="/admin/dashboard" className="sidebar-link">dashboard</NavLink>
                <NavLink to="/admin/usuarios" className="sidebar-link">Usuarios</NavLink>
                <NavLink to="/admin/menu" className="sidebar-link">Menu</NavLink>
                <NavLink className="sidebar-link">Caja</NavLink>
                <NavLink className="sidebar-link">Cocina</NavLink>
              
            </nav>
        </aside>
    )
}