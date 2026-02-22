
import '../styles/table.css';

const getValue = (obj, path) => {
  if (!path) return null;
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export default function DataTable({ columns, data }) {
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
                <button className="btn-edit">Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}