
import Button from './Button';
import '../styles/table.css';

const getValue = (obj, path) => {
  if (!path) return null;
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export default function DataTable({ columns, data, onDelete }) {

  if (!data) return <p>No hay datos disponibles</p>

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col, index) => (
                <td key={index}>{getValue(item, col.key) || "N/A,"}</td>
              ))}
              <td>
                <Button type="submit" variant="danger" onClick={() => onDelete(item.id)}>
                    elimimar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}