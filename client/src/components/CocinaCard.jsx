import Button from './Button.jsx';

const CocinaCard = ({ pedido, onCompletar }) => {
  return (
    <div className="cocina-card" style={{
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column',
      minWidth: '300px',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '12px 15px',
        background: '#2c3e50',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontWeight: 'bold' }}>ORDEN #{pedido.id}</span>
        <span style={{ 
          background: pedido.tipo_pedido === 'Para llevar' ? '#e74c3c' : '#27ae60', 
          padding: '2px 8px', 
          borderRadius: '4px', 
          fontSize: '0.7rem',
          textTransform: 'uppercase'
        }}>
          {pedido.tipo_pedido}
        </span>
      </div>

      <div style={{ padding: '10px 15px', borderBottom: '1px solid #f0f0f0', background: '#fdfdfd' }}>
        <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '1.2rem' }}>📍 {pedido.mesa}</h3>
      </div>

      <div style={{ padding: '15px', flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {pedido.items.map((item) => (
            <li key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px dashed #eee',
              color: '#34495e'
            }}>
              <span style={{ fontWeight: '500' }}>• {item.nombre_platillo}</span>
              <span style={{ color: '#95a5a6', fontSize: '0.8rem' }}>PENDIENTE</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ padding: '15px', background: '#f9f9f9' }}>
        <Button 
          text="✅ Marcar Pedido como Listo" 
          color="success" 
          onClick={() => onCompletar(pedido.id)}
          style={{ width: '100%' }} 
        />
      </div>
    </div>
  );
};

export default CocinaCard;