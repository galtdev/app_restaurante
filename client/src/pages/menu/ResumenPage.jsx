import { useOutletContext, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

export default function ResumenPedido() {
  const { orderData, updateOrder } = useOutletContext();
  const navigate = useNavigate();

  // Agrupamos visualmente para la tabla
  const platosAgrupados = orderData.step1.reduce((acc, p) => {
    const encontrado = acc.find(item => item.id === p.id);
    if (encontrado) {
      encontrado.cantidadVista += 1;
    } else {
      acc.push({ ...p, cantidadVista: 1 });
    }
    return acc;
  }, []);

  const montoTotal = orderData.step1.reduce((acc, p) => acc + Number(p.precio), 0);

  const sumarPlato = (platoBase) => {
    const { cantidadVista, ...soloPlato } = platoBase;
    updateOrder('step1', [...orderData.step1, soloPlato]);
  };

  const restarPlato = (id) => {
    const index = orderData.step1.findIndex(p => p.id === id);
    if (index !== -1) {
      const nuevoCarrito = [...orderData.step1];
      nuevoCarrito.splice(index, 1);
      updateOrder('step1', nuevoCarrito);
    }
  };

  const eliminarTodo = (id) => {
    updateOrder('step1', orderData.step1.filter(p => p.id !== id));
  };

  return (
    <div className="page-content" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#333', borderBottom: '3px solid #f1c40f', display: 'inline-block' }}>
        🛒 Resumen de tu Pedido
      </h2>
      
      {orderData.step1.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: '#f9f9f9', borderRadius: '15px' }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>Tu carrito está vacío.</p>
          <Button onClick={() => navigate('/pedido')}>Ver el Menú</Button>
        </div>
      ) : (
        <div className="resumen-container" style={{ background: 'white', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', padding: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 15px' }}>
            <thead>
              <tr style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
                <th style={{ padding: '10px' }}>Cantidad</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Platillo</th>
                <th style={{ textAlign: 'right', padding: '10px' }}>Unitario</th>
                <th style={{ textAlign: 'center', padding: '10px' }}>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {platosAgrupados.map((p) => (
                <tr key={p.id} style={{ background: '#fcfcfc', borderRadius: '10px', transition: 'transform 0.2s' }}>
                  {/* Selector de Cantidad */}
                  <td style={{ padding: '15px', borderRadius: '10px 0 0 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee', borderRadius: '25px', padding: '5px 10px', width: 'fit-content', margin: '0 auto' }}>
                      <button 
                        onClick={() => restarPlato(p.id)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', padding: '0 10px', fontSize: '1.2rem' }}
                      >−</button>
                      <span style={{ fontWeight: '800', fontSize: '1.1rem', minWidth: '30px', textAlign: 'center' }}>{p.cantidadVista}</span>
                      <button 
                        onClick={() => sumarPlato(p)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', padding: '0 10px', fontSize: '1.2rem', color: '#27ae60' }}
                      >+</button>
                    </div>
                  </td>

                  <td style={{ padding: '15px', fontWeight: '600', color: '#2c3e50' }}>{p.nombre_platillo}</td>
                  <td style={{ padding: '15px', textAlign: 'right', color: '#7f8c8d' }}>${Number(p.precio).toFixed(2)}</td>
                  
                  <td style={{ padding: '15px', textAlign: 'center', borderRadius: '0 10px 10px 0' }}>
                    <button 
                      onClick={() => eliminarTodo(p.id)} 
                      style={{ background: '#fff0f0', border: 'none', color: '#e74c3c', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                    >
                      🗑️ Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr style={{ border: 'none', borderTop: '1px dashed #ddd', margin: '20px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
            <span style={{ color: '#888' }}>Total a pagar:</span>
            <span style={{ fontSize: '2.2rem', fontWeight: '900', color: '#2c3e50' }}>
              ${montoTotal.toFixed(2)}
            </span>
          </div>

          <div style={{ marginTop: '40px', display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => navigate('/menu')} style={{ background: '#f8f9fa', border: '1px solid #ddd' }}>
              ← Seguir Comprando
            </Button>
            <Button onClick={() => navigate('/menu/datos')} style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
              Confirmar Datos →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}