import DataTable from '../components/Table.jsx';
import { menuColums, menuData } from '../config/tableConfig.js';

export default function MenuPage() {
  return (
    <div>
      <h1>Gestión de Menu</h1>
      <DataTable columns={menuColums} data={menuData} />
    </div>
  );
}