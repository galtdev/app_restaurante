// 1. GESTIÓN DE USUARIOS
export const RegistrarUsuario = [
  { name: 'nombre_usuario', label: 'Nombre de usuario', placeholder: 'Ej: angel osuna', required: true },
  { name: 'password', label: 'Contraseña', type: 'password', placeholder: '••••••••', required: true },
  ];


export const camposUsuario = [
  { name: 'nombre', label: 'Nombre Completo', placeholder: 'Ej: Galanton', required: true },
  { name: 'correo', label: 'Correo Electrónico', type: 'email', placeholder: 'correo@ejemplo.com', required: true },
  { name: 'password', label: 'Contraseña', type: 'password', placeholder: '••••••••', required: true },
  { 
    name: 'rol', 
    label: 'Rol del Usuario en el sistema', 
    type: 'select', 
    required: true,
    options: [
      { value: 'admin', label: 'Administrador' },
      { value: 'Caja', label: 'Caja' },
      { value: 'Cocina', label: 'Cocina' }
    ]
  }
];


export const camposMenu = [
    { name: 'nombre_platillo', label: 'Nombre del platillo', placeholder:'Introduzca nombre', required: true },
    { name: 'precio', label: 'Precio del platillo', placeholder:'Introduzca precio', required: true },
    { name: 'contenido', label: 'Contenido del platillo', placeholder:'Introduzca contenido', required: true },
    { name: 'category', label: 'Categoría', placeholder:'ej: comida, bebida', required: false },
    { name: 'imagen', label: 'Imagen del producto', type: 'file', required: true }
];


export const camposEditMenu = [
    { name: 'nombre_platillo', label: 'Nombre del platillo', placeholder:'Introduzca nombre', required: false },
    { name: 'precio', label: 'Precio del platillo', placeholder:'Introduzca precio', required: false },
    { name: 'contenido', label: 'Contenido del platillo', placeholder:'Introduzca contenido', required: false },
    { name: 'category', label: 'Categoría', placeholder:'ej: comida, bebida', required: false },
    { name: 'imagen', label: 'Actualizar imagen', type: 'file', required: false }
];


export const camposUsuarioPedido = [
  { name: 'nombre_cliente', label: 'Nombre del cliente', placeholder: 'Ej: Juan Pérez', required: true },
  { name: 'cedula', label: 'Cédula', placeholder: 'Ej: 12345678', required: true },
  ];

  export const camposPagoPedido = [
  { 
    name: 'metodo_pago', 
    label: 'Método de Pago', 
    type: 'select', 
    required: true,
    options: [
      { value: 'efectivo', label: 'Efectivo' },
      { value: 'tarjeta', label: 'Tarjeta' },
      { value: 'pago_movil', label: 'Pago móvil' }
    ]
  },
  { 
    name: 'comprobante', 
    label: 'Imagen del comprobante de pago', 
    type: 'file',
    required: true,
    showIf: { field: 'metodo_pago', value: 'pago_movil' } 
  }
];

