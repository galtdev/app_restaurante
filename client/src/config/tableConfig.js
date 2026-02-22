// src/pages/admin/usuariosConfig.js
export const usuariosColumns = [
  { label: 'Nombre', key: 'nombre' },
  { label: 'Email', key: 'auth.correo' },
  { label: 'Rol', key: 'auth.rol' },
  { label: 'Status', key: 'status' }
];

export const menuColums = [
  { label: 'Plato', key: 'plato' },
  { label: 'Descripcion', key: 'descripcion' },
  { label: 'Estado', key: 'estado' }
];

export const menuData = [
  { id: 1, plato: 'Comida 1', descripcion: 'descripcion 1', estado: 'Disponible' },
  { id: 2, plato: 'Comida 2', descripcion: 'descripcion 2', estado: 'No Disponible' },
];