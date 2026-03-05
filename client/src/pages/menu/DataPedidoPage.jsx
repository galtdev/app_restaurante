import { useOutletContext, useNavigate } from 'react-router-dom';
import DynamicForm from '../../components/Form.jsx';
import { camposPedido } from '../../config/formConfig.js';
import Button from '../../components/Button.jsx';

export default function DataPedidoPage() {
  const { orderData, updateOrder } = useOutletContext();
  const navigate = useNavigate();

  // Calculamos el total acumulado de los platos seleccionados
  const total = orderData.step1.reduce((acc, p) => acc + Number(p.precio), 0);

  // Esta función se ejecuta cuando el formulario es válido
  const handleFormSubmit = (formData) => {
    // Guardamos los datos del cliente y mesa en el Paso 2 del Layout
    updateOrder('step2', formData);
    
    // Saltamos al Paso 3: Pago
    navigate('/menu/pago');
  };

  return (
    <div className="page-content" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <header style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1>Finalizar Pedido</h1>
        <p className="subtitle">Por favor, indícanos dónde te encuentras y tus datos de contacto.</p>
      </header>

      {/* Resumen de Compra Rápido */}
      <section style={{ 
        background: '#fff', 
        padding: '20px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h3 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          Resumen de Selección
        </h3>
        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
          {orderData.step1.map((p, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0' }}>
              <span>{p.nombre_platillo}</span>
              <span style={{ fontWeight: '600' }}>${p.precio}</span>
            </div>
          ))}
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '15px', 
          paddingTop: '15px', 
          borderTop: '2px dashed #ddd',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#2c3e50'
        }}>
          <span>Total a pagar:</span>
          <span>${total}</span>
        </div>
      </section>

      {/* Formulario Dinámico */}
      <section className="form-container" style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <DynamicForm 
          fields={camposPedido} 
          onSubmit={handleFormSubmit} 
          buttonText="Continuar al Pago"
        />
        
        <Button 
          variant="secondary" 
          onClick={() => navigate('/menu')} 
          style={{ marginTop: '15px', width: '100%', background: 'transparent', color: '#666', border: '1px solid #ccc' }}
        >
          ← Volver al Menú
        </Button>
      </section>
    </div>
  );
}