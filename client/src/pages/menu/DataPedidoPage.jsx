import { useOutletContext, useNavigate } from 'react-router-dom';
import DynamicForm from '../../components/Form.jsx';
import { camposPedido } from '../../config/formConfig.js';
import Button from '../../components/Button.jsx';

export default function DataPedidoPage() {
  const { orderData, updateOrder } = useOutletContext();
  const navigate = useNavigate();

  // Calculamos el total (Lógica intacta)
  const total = orderData.step1.reduce((acc, p) => acc + Number(p.precio), 0);

  const handleFormSubmit = (formData) => {
    updateOrder('step2', formData);
    navigate('/menu/pago');
  };

  return (
    <div className="page-content" style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.4rem', color: '#2c3e50', fontWeight: '800', marginBottom: '10px' }}>
          📍 Datos de Entrega
        </h1>
        <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
          Casi terminamos. Dinos dónde llevaremos tu comida.
        </p>
      </header>

      <div style={{ display: 'grid', gap: '30px' }}>
        
        {/* Resumen de Selección Estilizado */}
        <section style={{ 
          background: '#fff', 
          padding: '25px', 
          borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          border: '1px solid #f0f0f0'
        }}>
          <h3 style={{ 
            marginTop: 0, 
            fontSize: '1rem', 
            color: '#95a5a6', 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            marginBottom: '20px'
          }}>
            Tu Selección ({orderData.step1.length})
          </h3>

          <div style={{ 
            maxHeight: '180px', 
            overflowY: 'auto', 
            paddingRight: '10px',
            marginBottom: '20px'
          }}>
            {orderData.step1.map((p, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '12px 0',
                borderBottom: '1px solid #f9f9f9'
              }}>
                <span style={{ color: '#2c3e50', fontWeight: '500' }}>{p.nombre_platillo}</span>
                <span style={{ color: '#7f8c8d' }}>${Number(p.precio).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingTop: '20px', 
            borderTop: '2px dashed #eee'
          }}>
            <span style={{ fontSize: '1.1rem', color: '#2c3e50', fontWeight: '600' }}>Total Acumulado:</span>
            <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#2c3e50' }}>
              ${total.toFixed(2)}
            </span>
          </div>
        </section>

        {/* Contenedor del Formulario Dinámico */}
        <section style={{ 
          background: '#fcfcfc', 
          padding: '30px', 
          borderRadius: '20px', 
          border: '1px solid #eee' 
        }}>
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ margin: 0, color: '#2c3e50', fontSize: '1.3rem' }}>Información del Cliente</h4>
            <p style={{ margin: '5px 0 0', color: '#95a5a6', fontSize: '0.9rem' }}>Completa los campos para continuar.</p>
          </div>

          <DynamicForm 
            fields={camposPedido} 
            onSubmit={handleFormSubmit} 
            buttonText="Ir al Paso de Pago →"
          />
          
          <button 
            onClick={() => navigate('/menu')} 
            style={{ 
              marginTop: '20px', 
              width: '100%', 
              background: 'none', 
              border: 'none', 
              color: '#95a5a6', 
              cursor: 'pointer',
              fontSize: '0.9rem',
              textDecoration: 'underline'
            }}
          >
            ← Volver al Menú para agregar más
          </button>
        </section>

      </div>

      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#bdc3c7', fontSize: '0.85rem' }}>
        Paso 2 de 3 • Información y Ubicación
      </footer>
    </div>
  );
}