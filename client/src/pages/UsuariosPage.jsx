import DataTable from '../components/Table.jsx';
import { usuariosColumns } from '../config/tableConfig.js';
import { useState, useEffect} from 'react';

export default function UsuariosPage() {

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const constulHttp = async ()=> {
    try{
      const response = await fetch('/api/user');
      const data = await response.json();

      setUsuarios(data.body);


    }catch(error){
      console.error("error al atraer usuarios", error);
    }finally{
      setCargando(false);
    }
  };

  useEffect(() => {
    constulHttp();
  }, []);

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      
      {cargando ? (<p>cargando datos</p>
    ) : ( 
    <DataTable columns={usuariosColumns} data={usuarios} />
    )}

    </div>
  );
}