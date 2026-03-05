import { useState, useEffect } from 'react';
import DataTable from '../../components/Table.jsx';
import Notification from '../../components/Notification.jsx';
import { api } from '../../services/api.js';
import { cajaColumns } from '../../config/tableConfig.js';
import '../../styles/styles.css';

export default function CajaPage() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [notification, setNotification] = useState({ text: '', type: '' });

  const fetchPedidos = async () => {
    setCargando(true);
    // Cambié la ruta para que coincida con tu backend: /api/pedido/caja/:idCaja
    const { data, error } = await api.get('/api/pedido/caja/1'); 
    
    if (!error) {
      setPedidos(data.body);
    } else {
      setNotification({ text: 'Error al cargar pedidos', type: 'error' });
    }
    setCargando(false);
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleEdit = (pedido) => {
    console.log("Editar pedido:", pedido);
    // Aquí podrías abrir un modal para cambiar el status_pago a "Completado"
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este registro?")) {
      const { error } = await api.delete(`/api/pedido/${id}`);
      if (!error) {
        setNotification({ text: 'Pedido eliminado', type: 'success' });
        fetchPedidos();
      }
    }
  };

  return (
    <div className="page-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>💰 Control de Caja</h1>
        <button className="btn-secondary" onClick={fetchPedidos}>🔄 Refrescar</button>
      </div>

      {notification.text && (
        <Notification 
          text={notification.text} 
          type={notification.type} 
          onClose={() => setNotification({ text: '', type: '' })} 
        />
      )}

      {cargando ? (
        <p>Cargando transacciones...</p>
      ) : (
        <DataTable 
          columns={cajaColumns} 
          data={pedidos} 
          edit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
}