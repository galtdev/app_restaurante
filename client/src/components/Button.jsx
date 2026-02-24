// components/Button.jsx
import '../styles/forms.css';

export default function Button({ children, onClick, variant = 'primary', type = 'button', className = '' }) {
  const fullClassName = `btn-custom ${variant} ${className}`;

  return (
    <button type={type} className={fullClassName} onClick={onClick}>
      {children}
    </button>
  );
}