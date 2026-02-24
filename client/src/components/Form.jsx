import { useState } from 'react';
import Button from './Button';
import Notification from './Notification';
import '../styles/forms.css';


export default function DynamicForm({ fields, onSubmit, title, subtitle, message, clearMessage }) {
  // Inicializamos el estado dinámicamente según los campos recibidos
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialState);
  };

  return (
    <div className="form_container">
      <form onSubmit={handleSubmit} className="form">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
        
        {fields.map((field) => (
          <div key={field.name} className="input-group">
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type || "text"}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
            />
          </div>
          
        ))}
        
        <Button type="submit" variant="primary">
          Guardar Registro
        </Button>

        <Notification text={message.text} type={message.type} onClose={clearMessage} location={message.target} currentTarget="form"/>
      </form>
    </div>
  );
}