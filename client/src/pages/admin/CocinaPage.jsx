import { useState, useEffect } from 'react';
import DataTable from '../../components/Table.jsx';
import Notification from '../../components/Notification.jsx';
import { api } from '../../services/api.js';
import { cocinaColumns } from '../../config/tableConfig.js';

export default function CocinaPage() {
  const [comandas, setComandas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [notification, setNotification] = useState({ text: '', type: '' });

  const fetchComandas = async () => {
    // URL según tu backend: /api/pedido/cocina/:idCocina
    const { data, error } = await api.get('/api/pedido/cocina/1'); 
    
    if (!error) {
      setComandas(data.body);
    }
  };

  useEffect(() => {
    fetchComandas();
    // Refresco automático cada 20 segundos
    const interval = setInterval(fetchComandas, 20000);
    return () => clearInterval(interval);
  }, []);

  const marcarComoListo = async (item) => {
    // Aquí llamarías a un PUT para cambiar el status a 'Completado'
    const { error } = await api.put(`/api/pedido/detalle/${item.id}`, { status: 'Completado' });
    
    if (!error) {
      setNotification({ text: '¡Plato listo para servir!', type: 'success' });
      fetchComandas(); // Recargar lista
    }
  };

  return (
    <div className="page-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>👨‍🍳 Comandas Pendientes</h1>
        <span className="badge-count">{comandas.length} platos por salir</span>
      </div>

      {notification.text && (
        <Notification 
          text={notification.text} 
          type={notification.type} 
          onClose={() => setNotification({ text: '', type: '' })} 
        />
      )}

      <DataTable 
        columns={cocinaColumns} 
        data={comandas} 
        edit={marcarComoListo} // Usamos el botón 'editar' como 'Listo'
        onDelete={(id) => console.log("Cancelar plato", id)}
      />
    </div>
  );
}