import { useState, useEffect, useCallback } from 'react';
import DataTable from '../../components/Table.jsx';
import Notification from '../../components/Notification.jsx';
import Modal from '../../components/Modal.jsx';
import DynamicForm from '../../components/Form.jsx';
import { api } from '../../services/api.js';
import { cajaColumns } from '../../config/tableConfig.js';
import { camposConfirmarPago } from '../../config/formConfig.js';

/**
 * CajaPage: Gestiona el cobro de pedidos pendientes.
 * Un pedido desaparece de aquí y aparece en cocina una vez pagado.
 */
export default function CajaPage() {
  const [pedidos, setPedidos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [notification, setNotification] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  // ID de la caja actual (podría venir de un contexto de usuario/auth)
  const CAJA_ID = 1;

  // 1. Obtener pedidos pendientes de cobro
  const fetchPedidos = useCallback(async () => {
    setLoading(true);
    const { data, error } = await api.get(`/api/pedido/caja/${CAJA_ID}`);
    
    if (!error && data && data.body) {
      setPedidos(data.body);
    } else {
      setPedidos([]);
      if (error) {
        showNotification('Error al conectar con el servidor', 'error');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPedidos();
  }, [fetchPedidos]);

  // Función auxiliar para mostrar notificaciones temporales
  const showNotification = (text, type) => {
    setNotification({ text, type });
    setTimeout(() => setNotification({ text: '', type: '' }), 4000);
  };

  // 2. Preparar el pedido para el cobro
  const handleAbrirPago = (pedido) => {
    // Calculamos el total real sumando los precios de los detalles
    const total = pedido.detalles?.reduce((acc, item) => acc + Number(item.precio), 0) || 0;
    
    setPedidoSeleccionado({
      ...pedido,
      totalCalculado: total
    });
    setIsModalOpen(true);
  };

  // 3. Confirmar el pago en el servidor (Esto dispara el pedido a cocina)
  const confirmarPagoEnServidor = async (formData) => {
    // IMPORTANTE: Se usa PUT porque actualizamos el estado del pedido a 'PAGADO'
    const { data, error } = await api.put(
      `/api/pedido/confirmar/${pedidoSeleccionado.id}`, 
      {
        monto: formData.monto || pedidoSeleccionado.totalCalculado,
        metodo: formData.metodo,
        referencia: formData.referencia || "S/N"
      }
    );

    if (!error) {
      showNotification('✅ Cobro procesado exitosamente. El pedido ha sido enviado a cocina.', 'success');
      setIsModalOpen(false);
      setPedidoSeleccionado(null);
      fetchPedidos(); // Refrescamos la lista
    } else {
      showNotification(`❌ Error: ${error}`, 'error');
    }
  };

  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <div className="header-caja" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0 }}>💰 Caja Registradora</h1>
          <p style={{ color: '#666' }}>Gestión de cobros y facturación</p>
        </div>
        <div style={{ textAlign: 'right', background: '#e8f4fd', padding: '10px 20px', borderRadius: '8px' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>PENDIENTES:</span>
          <h2 style={{ margin: 0, color: '#2980b9' }}>{pedidos.length}</h2>
        </div>
      </div>

      {loading ? (
        <p>Cargando pedidos...</p>
      ) : (
        <DataTable 
          columns={cajaColumns} 
          data={pedidos} 
          edit={handleAbrirPago} // Botón de acción (Pagar)
          onDelete={() => {}}    // Puedes implementar cancelar pedido si lo deseas
        />
      )}

      {/* Modal de Procesamiento de Pago */}
     <Modal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
  title="💸 Verificación de Pago"
>
  {pedidoSeleccionado && (
    <div className="modal-pago-container">
      {/* Resumen de la Orden */}
      <div style={{ 
        padding: '15px', 
        background: '#f8f9fa', 
        borderRadius: '8px', 
        marginBottom: '15px',
        border: '1px solid #dee2e6' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span><strong>Mesa:</strong> {pedidoSeleccionado.mesa}</span>
          <span><strong>Orden:</strong> #{pedidoSeleccionado.id}</span>
        </div>
        <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: '#666' }}>MONTO A VALIDAR</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#27ae60' }}>
            ${pedidoSeleccionado.totalCalculado.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Datos reportados por el cliente (Si existen) */}
      {pedidoSeleccionado.pago && pedidoSeleccionado.pago.length > 0 ? (
        <div style={{ 
          padding: '15px', 
          background: '#fff3cd', 
          borderRadius: '8px', 
          marginBottom: '20px',
          border: '1px solid #ffeeba'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>📋 Datos del Pago Reportado</h4>
          <p style={{ margin: '5px 0' }}><strong>Método:</strong> {pedidoSeleccionado.pago[0].metodo_pago}</p>
          <p style={{ margin: '5px 0' }}><strong>Referencia:</strong> {pedidoSeleccionado.pago[0].referencia || 'Sin referencia'}</p>
          <p style={{ margin: '5px 0' }}><strong>Fecha/Hora:</strong> {new Date(pedidoSeleccionado.pago[0].fecha).toLocaleString()}</p>
        </div>
      ) : (
        <div style={{ padding: '15px', background: '#fcebea', borderRadius: '8px', marginBottom: '20px' }}>
          <p style={{ margin: 0, color: '#e74c3c' }}>⚠️ Este pedido no tiene datos de pago adjuntos.</p>
        </div>
      )}

      {/* Botón de acción simple */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => confirmarPagoEnServidor({})} // Mandamos objeto vacío porque el backend ya tiene los datos
          style={{ 
            flex: 1, 
            padding: '12px', 
            background: '#27ae60', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          ✅ Validar y Enviar a Cocina
        </button>
        <button 
          onClick={() => setIsModalOpen(false)}
          style={{ 
            padding: '12px', 
            background: '#95a5a6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  )}
</Modal>

      {/* Sistema de notificaciones */}
      {notification.text && (
        <Notification text={notification.text} type={notification.type} />
      )}
    </div>
  );
}