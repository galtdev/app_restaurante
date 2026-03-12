import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { api } from '../../services/api.js';
import { camposPago } from '../../config/formConfig.js';
import DynamicForm from '../../components/Form.jsx';
import Button from '../../components/Button.jsx';
import Modal from '../../components/Modal.jsx'; // 👈 Importamos tu componente

export default function DataPagoPage() {
  const { orderData, resetOrder } = useOutletContext();
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalMonto = orderData.step1.reduce((acc, p) => acc + Number(p.precio), 0);

  const finalizarPedido = async (dataPago) => {
    setLoading(true);
    const pedidoFinal = {
      mesa: `Mesa ${orderData.step2.numero_mesa}`,
      tipo_pedido: orderData.step2.tipo_servicio,
      status_pago: "POR_VERIFICAR",
      cedula: orderData.step2.cedula,
      nombre_cliente: orderData.step2.nombre_cliente,
      telefono: orderData.step2.telefono,
      cajaId: 1, 
      cocinaId: 1, 
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
      const { error } = await api.post('/api/pedido', pedidoFinal);
      if (!error) {
        setIsModalOpen(true); // 👈 Abrimos tu modal
      } else {
        alert("❌ Error al procesar el pedido.");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  const confirmarYSalir = () => {
    setIsModalOpen(false);
    resetOrder(); 
    navigate('/menu'); 
  };

  return (
    <div className="page-content" style={{ padding: '40px 20px', maxWidth: '550px', margin: '0 auto' }}>
      
      {/* USO DE TU COMPONENTE MODAL */}
      <Modal isOpen={isModalOpen} onClose={confirmarYSalir}>
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '15px' }}>✅</div>
          <h2 style={{ color: '#2c3e50', fontSize: '1.8rem', fontWeight: '800' }}>¡Todo listo!</h2>
          <p style={{ color: '#7f8c8d', marginBottom: '25px', lineHeight: '1.5' }}>
            Tu pedido ha sido recibido con éxito. En breve comenzaremos a prepararlo.
          </p>
          <Button onClick={confirmarYSalir} style={{ width: '100%' }}>
            Entendido
          </Button>
        </div>
      </Modal>

      <header style={{ textAlign: 'center', marginBottom: '35px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#2c3e50' }}>Checkout</h1>
        <div style={{ height: '4px', width: '50px', background: '#f1c40f', margin: '10px auto', borderRadius: '2px' }}></div>
      </header>

      {/* Recibo de Orden */}
      <div style={{ 
        background: 'white', padding: '30px', borderRadius: '20px', 
        marginBottom: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ color: '#95a5a6' }}>Resumen para:</span>
          <span style={{ fontWeight: '600' }}>{orderData.step2.nombre_cliente}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <span style={{ color: '#95a5a6' }}>Ubicación:</span>
          <span style={{ fontWeight: '600' }}>Mesa {orderData.step2.numero_mesa}</span>
        </div>
        <div style={{ paddingTop: '20px', borderTop: '2px dashed #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>Total</span>
          <span style={{ fontSize: '2.2rem', fontWeight: '900', color: '#27ae60' }}>${totalMonto.toFixed(2)}</span>
        </div>
      </div>

      {/* Formulario */}
      <div style={{ background: '#fcfcfc', padding: '30px', borderRadius: '20px', border: '1px solid #eee' }}>
        <DynamicForm 
          fields={camposPago} 
          onSubmit={finalizarPedido} 
          buttonText={loading ? "Enviando..." : `Confirmar y Pagar $${totalMonto.toFixed(2)}`}
          disabled={loading}
        />
        <button 
          onClick={() => navigate(-1)} 
          style={{ marginTop: '20px', width: '100%', background: 'none', border: 'none', color: '#bdc3c7', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
}