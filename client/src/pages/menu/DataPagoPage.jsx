import { useOutletContext, useNavigate } from 'react-router-dom';
import { api } from '../../services/api.js';
import { camposPago } from '../../config/formConfig.js';
import DynamicForm from '../../components/Form.jsx';
import Button from '../../components/Button.jsx';

export default function PagoPedidoPage() {
  const { orderData, resetOrder } = useOutletContext();
  const navigate = useNavigate();

  // 1. Calculamos el monto total de los platillos
  const totalMonto = orderData.step1.reduce((acc, p) => acc + Number(p.precio), 0);

  const finalizarPedido = async (dataPago) => {
    // 2. CONSTRUCCIÓN DEL OBJETO FINAL (Mismo formato que pediste)
    const pedidoFinal = {
      mesa: `Mesa ${orderData.step2.numero_mesa}`,
      tipo_pedido: orderData.step2.tipo_servicio,
      status_pago: "Pagado",
      cedula: orderData.step2.cedula,
      nombre_cliente: orderData.step2.nombre_cliente,
      telefono: orderData.step2.telefono,
      cajaId: 1, // ID por defecto
      cocinaId: 1, // ID por defecto
      productos: orderData.step1.map(p => ({
        id: p.id,
        nombre_platillo: p.nombre_platillo,
        precio: p.precio
      })),
      pago: {
        monto: totalMonto,
        metodo: dataPago.metodo,
        referencia: dataPago.referencia
      }
    };

    try {
      // 3. Envío al servidor
      const { data, error } = await api.post('/api/pedido', pedidoFinal);

      if (!error) {
        alert("✅ ¡Pedido enviado con éxito a cocina!");
        resetOrder(); // Limpia el carrito en el Layout
        navigate('/menu'); // Redirige al inicio del menú
      } else {
        alert("❌ Error: No se pudo procesar el pedido.");
      }
    } catch (err) {
      console.error("Error en la petición:", err);
      alert("Ocurrió un error de conexión.");
    }
  };

  return (
    <div className="page-content" style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h1>Finalizar Pago</h1>
        <p>Estás a un paso de disfrutar tu comida.</p>
      </header>

      {/* Tarjeta de Resumen Final */}
      <div style={{ 
        background: '#2c3e50', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '12px', 
        marginBottom: '25px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>Cliente:</span>
          <strong>{orderData.step2.nombre_cliente}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>Ubicación:</span>
          <strong>Mesa {orderData.step2.numero_mesa}</strong>
        </div>
        <div style={{ 
          marginTop: '15px', 
          paddingTop: '15px', 
          borderTop: '1px solid rgba(255,255,255,0.2)',
          display: 'flex', 
          justifyContent: 'space-between',
          fontSize: '1.4rem'
        }}>
          <span>Total:</span>
          <strong>${totalMonto}</strong>
        </div>
      </div>

      {/* Formulario de Pago */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
        <h4 style={{ marginTop: 0 }}>Información del pago</h4>
        <DynamicForm 
          fields={camposPago} 
          onSubmit={finalizarPedido} 
          buttonText={`Pagar $${totalMonto}`}
        />
        
        <Button 
          variant="secondary" 
          onClick={() => navigate(-1)} 
          style={{ marginTop: '15px', width: '100%', background: 'none', color: '#888' }}
        >
          Editar datos de mesa
        </Button>
      </div>
    </div>
  );
}