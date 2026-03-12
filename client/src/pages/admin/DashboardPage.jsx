import { useState, useEffect } from 'react';
import Card from '../../components/Card.jsx';
import { api } from '../../services/api.js';
import '../../styles/styles.css';

export default function MenuPage() {
  const [metrics, setMetrics] = useState({
    enCaja: 0,
    enCocina: 0,
    totalPlatillos: 0,
    recaudado: 0
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      // Aquí llamarías a un endpoint de estadísticas que podrías crear
      // O hacer múltiples fetch a tus servicios actuales
      const { data, error } = await api.get('/api/pedido/dashboard-metrics');
      if (!error && data?.body) {
        setMetrics(data.body);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Actualiza cada 30 seg
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h1>Dashboard</h1>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        {/* Cantidad en Caja: Pedidos esperando validación */}
        <Card title="En Caja" subtitle="Pendientes de Pago">
          <h2 style={{ color: '#f39c12', margin: 0 }}>{metrics.enCaja}</h2>
        </Card>

        {/* Cantidad en Cocina: Pedidos en preparación */}
        <Card title="En Cocina" subtitle="Platos en Cola">
          <h2 style={{ color: '#3498db', margin: 0 }}>{metrics.enCocina}</h2>
        </Card>

        {/* Total Platillos: Cantidad de items en el menú */}
        <Card title="Menú" subtitle="Platillos Registrados">
          <h2 style={{ color: '#9b59b6', margin: 0 }}>{metrics.totalPlatillos}</h2>
        </Card>

        {/* Dinero Recaudado: Suma de pagos confirmados */}
        <Card title="Ganancias" subtitle="Ventas del Día">
          <h2 style={{ color: '#27ae60', margin: 0 }}>
            ${metrics.recaudado.toFixed(2)}
          </h2>
        </Card>
      </div>
    </div>
  );
}