import DataTable from '../components/Table.jsx';
import { menuColums} from '../config/tableConfig.js';

import {api} from '../services/api.js';
import { useState, useEffect } from 'react';

import Modal from '../components/Modal.jsx';

import DynamicForm from '../components/Form.jsx';
import { camposMenu } from '../config/formConfig.js';
import Notification from '../components/Notification.jsx';
import ProductCard from '../components/MenuCard.jsx';
import Button from '../components/Button.jsx'; 
import '../styles/styles.css';



export default function MenuPage() {

  const [platos, setPlatos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [notification, setNotification] = useState({ text: '', type: '', target: '' });

  const handleClearMessage = () => {
    setNotification({ text: '', type: '', target: '' });
  }


  const consultPlatos = async () => {
    const {data, error} = await api.get('/api/menu');
    setPlatos(data.body);
  }

  const registrarPlato = async (dataForm)=> {

    const formData = new FormData();

    Object.keys(dataForm).forEach(key => {
      formData.append(key, dataForm[key]);
    })
    
    const resp = await api.post('/api/menu', formData);

    if(!resp.error) {
      setNotification({ text: 'Plato registrado', type: 'success', target: 'form' });
      consultPlatos();
    }
  }

  const eliminarPlato = async (id)=>{

    const resp = await api.delete(`/api/menu/${id}`);

    if(!resp.error) {
      setNotification({ text: `${resp.data.body}`, type: 'advertencia', target:'form' })
      consultPlatos();
    }
  }

  useEffect(() => {
    consultPlatos();
  }, []);

  
  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h1>Gestión de Menú</h1>
      <Button variant='primary' onClick={() => setOpenModal(true)}>
        + Agregar Platillo
      </Button>

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={"Agregar platillo"}
      >

        <DynamicForm
          subtitle="Registra un nuevo usuario en la base de datos"
          fields={camposMenu} 
          onSubmit={registrarPlato} 
          message={notification}
          clearMessage={handleClearMessage}
        />

      </Modal>
    
      <div className="table-container">
        <DataTable columns={menuColums} data={platos} onDelete={eliminarPlato}/>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Notification 
          text={notification.text}   
          type={notification.type}   
          onClose={handleClearMessage} 
          target='page'
        />
      </div>
      

      <h2 style={{ marginTop: '40px' }}>Vista de Productos</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
        gap: '25px',
        padding: '20px 0'
      }}>

        
        {platos.map((data) => (
          <ProductCard
            key={data.id} 
            name={data.nombre_platillo} 
            price={data.precio} 
            category={data.contenido}
            image={data.imagen ? `/public/${data.imagen}` : "https://via.placeholder.com/200"}
            onAdd={() => alert(`Agregado: ${data.nombre_platillo}`)}
          />
        ))}

      </div>

    </div>
  );
}