import {Outlet} from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/styles.css';

export default function AdminLayout (){
    return (
        <div className="admin-layout">
            
            <Sidebar/>

            <div className="main-container">
                <main className="main-area">
                    <Outlet/>
                </main>
            </div>

        </div>
    );
}