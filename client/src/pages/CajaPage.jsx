import DataTable from '../components/Table.jsx';
import DynamicForm from '../components/Form.jsx';
import Button from '../components/Button.jsx';
import Modal from '../components/Modal.jsx';
import Notification from '../components/Notification.jsx';
import {api} from '../services/api.js'
import {camposUsuario} from '../config/formConfig.js'
import { usuariosColumns } from '../config/tableConfig.js';
import { useState, useEffect} from 'react';

export default function CajaPage() {

const [isModalOpen, setIsModalOpen] = useState(false);
const [cargando, setCargando] = useState(false);
const [notification, setNotification] = useState({ text: '', type: '' });

  
  const handleClearMessage = () => {
    setNotification({ text: '', type: '' });
  };


  return (
    <div className="page-content">
      <Button variant='primary' onClick={()=> setIsModalOpen(true)}>
        + Nuevo Usuario
      </Button>
      
      
    </div>
  );
}