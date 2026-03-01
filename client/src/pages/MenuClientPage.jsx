import {api} from '../services/api.js'
import { useState, useEffect } from 'react';
import ProductCard from '../components/MenuCard.jsx';
import '../styles/styles.css';



export default function MenuClient() {

  const [platillos, setPlatillos] = useState([]);

  const consult = async () => {
    const {data, error} = await api.get('/api/menu');
    
    if (!error) {
      setPlatillos(data.body);
      console.log(data.body);
    }
  
  }

  useEffect(()=>{
    consult();
  }, [])

  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h1>Menu Cliente</h1>

      <h2 style={{ marginTop: '40px' }}>Vista de Productos</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
        gap: '25px',
        padding: '20px 0'
      }}>

        
        {platillos.map((data) => (
          <ProductCard
            key={data.id} 
            name={data.nombre_platillo} 
            price={data.precio}
            contain={data.contenido} 
            category={data.category}
            image={data.imagen ? `/imagenes/${data.imagen}` : "https://via.placeholder.com/200"}
            onAdd={() => alert(`Agregado; ${data.nombre_platillo}`)}
        />
        ))}

      </div>

    </div>
  );
}