import DataTable from '../components/Table.jsx';
import { menuColums, menuData } from '../config/tableConfig.js';
import Card from '../components/Card.jsx';
import ProductCard from '../components/MenuCard.jsx';
import Button from '../components/Button.jsx'; // Asegúrate de tenerlo importado
import '../styles/styles.css';

export default function MenuPage() {
  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h1>Dashboard</h1>

      {/* --- SECCIÓN DE CARDS MANUALES --- */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        <Card title="Platos Hoy" subtitle="Disponibles">
          <h2 style={{ color: '#2ecc71', margin: 0 }}>15</h2>
        </Card>

        <Card title="Categorías" subtitle="Secciones">
          <h2 style={{ color: '#3498db', margin: 0 }}>4</h2>
        </Card>

        <Card title="Agotados" subtitle="Sin stock">
          <h2 style={{ color: '#e74c3c', margin: 0 }}>2</h2>
        </Card>

      </div>

      
    </div>
  );
}