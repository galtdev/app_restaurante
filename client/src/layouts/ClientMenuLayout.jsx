import { Outlet } from "react-router-dom";
import '../styles/styles.css'
import ProductCard from "../components/MenuCard";
import {api} from '../services/api.js';


export default function ClientMenuLayout() {

    return(
        <div className="main-container">
            
            <Outlet/>
        </div>
    );
}

