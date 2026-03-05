import { useOutletContext, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

export default function ResumenPedido() {
  const { orderData, updateOrder } = useOutletContext();
  const navigate = useNavigate();

  // Calculamos el total
  const montoTotal = orderData.step1.reduce((acc, p) => acc + Number(p.precio), 0);

  const eliminarDelPedido = (id) => {
    const nuevoCarrito = orderData.step1.filter(p => p.id !== id);
    updateOrder('step1', nuevoCarrito);
  };

  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h2>Tu Pedido</h2>
      
      {orderData.step1.length === 0 ? (
        <p>No tienes platillos seleccionados. <Button onClick={() => navigate('/pedido')}>Volver al menú</Button></p>
      ) : (
        <div className="resumen-container">
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th style={{ textAlign: 'left', padding: '10px' }}>Platillo</th>
                <th style={{ textAlign: 'right', padding: '10px' }}>Precio</th>
                <th style={{ textAlign: 'center', padding: '10px' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {orderData.step1.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{p.nombre_platillo}</td>
                  <td style={{ padding: '10px', textAlign: 'right' }}>${p.precio}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button onClick={() => eliminarDelPedido(p.id)} style={{ color: 'red' }}>Quitar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: 'right', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Total: ${montoTotal}
          </div>

          <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => navigate('/menu')}>Agregar más</Button>
            <Button onClick={() => navigate('/menu/datos')}>Confirmar Datos</Button>
          </div>
        </div>
      )}
    </div>
  );
}