import { useState, useEffect, useCallback } from 'react';
import Notification from '../../components/Notification.jsx';
import CocinaCard from '../../components/CocinaCard.jsx';
import { api } from '../../services/api.js';

export default function CocinaPage() {
  const [pedidosAgrupados, setPedidosAgrupados] = useState([]);
  const [notification, setNotification] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(true);

  const agruparPorPedido = (platos) => {
    if (!platos) return [];
    const grupos = platos.reduce((acc, item) => {
      const pId = item.pedido?.id || 'sin-id';
      if (!acc[pId]) {
        acc[pId] = {
          id: pId,
          mesa: item.pedido?.mesa || 'Sin Mesa',
          tipo_pedido: item.pedido?.tipo_pedido || 'Local',
          items: []
        };
      }
      acc[pId].items.push(item);
      return acc;
    }, {});
    return Object.values(grupos);
  };

  const fetchComandas = useCallback(async () => {
    try {
      const { data, error } = await api.get('/api/pedido/cocina/1'); 
      if (!error && data?.body) {
        setPedidosAgrupados(agruparPorPedido(data.body));
      }
    } catch (err) {
      console.error("Error en fetchComandas", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComandas();
    const interval = setInterval(fetchComandas, 10000); 
    return () => clearInterval(interval);
  }, [fetchComandas]);

  const terminarPedidoCompleto = async (pedidoId) => {
    const { error } = await api.put(`/api/pedido/confirmar-entrega/${pedidoId}`);
    
    if (!error) {
      setNotification({ text: '¡Orden completada!', type: 'success' });
      fetchComandas();
    } else {
      setNotification({ text: 'Error al completar orden', type: 'error' });
    }
    setTimeout(() => setNotification({ text: '', type: '' }), 3000);
  };

  return (
    <div className="page-content" style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ margin: 0, color: '#2c3e50' }}>👨‍🍳 Panel de Cocina</h1>
        <p style={{ color: '#7f8c8d' }}>Comandas activas listas para preparar</p>
      </div>

      {loading ? (
        <p>Cargando comandas...</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '20px' 
        }}>
          {pedidosAgrupados.length > 0 ? (
            pedidosAgrupados.map(pedido => (
              <CocinaCard 
                key={pedido.id} 
                pedido={pedido} 
                onCompletar={terminarPedidoCompleto} 
              />
            ))
          ) : (
            <div style={{ 
                textAlign: 'center', 
                gridColumn: '1/-1', 
                padding: '60px', 
                background: 'white', 
                borderRadius: '12px',
                border: '2px dashed #ccc' 
            }}>
              <h2 style={{ color: '#bdc3c7' }}>No hay pedidos por preparar 😴</h2>
            </div>
          )}
        </div>
      )}

      {notification.text && <Notification text={notification.text} type={notification.type} />}
    </div>
  );
}