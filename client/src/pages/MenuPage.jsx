import DataTable from '../components/Table.jsx';
import { menuColums, menuData } from '../config/tableConfig.js';
import Card from '../components/Card.jsx';
import ProductCard from '../components/MenuCard.jsx';
import Button from '../components/Button.jsx'; // Asegúrate de tenerlo importado
import '../styles/styles.css';

export default function MenuPage() {
  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h1>Gestión de Menú</h1>

      {/* --- SECCIÓN DE LA TABLA --- */}
      <div className="table-container">
        <DataTable columns={menuColums} data={menuData} />
      </div>

      <h2 style={{ marginTop: '40px' }}>Vista de Productos</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
        gap: '25px',
        padding: '20px 0'
      }}>

        
        {/* Renderizado Manual para la vista */}
        <ProductCard 
          name="Hamburguesa Especial" 
          price="12.50" 
          category="Comida"
          image="https://via.placeholder.com/200"
          onAdd={() => alert('Añadido')}
        />

        <ProductCard 
          name="Pizza Pepperoni" 
          price="15.00" 
          category="Comida"
          image="https://via.placeholder.com/200"
          onAdd={() => alert('Añadido')}
        />

        <ProductCard 
          name="Jugo de Naranja" 
          price="3.50" 
          category="Bebidas"
          image="https://via.placeholder.com/200"
          onAdd={() => alert('Añadido')}
        />
      </div>

    </div>
  );
}