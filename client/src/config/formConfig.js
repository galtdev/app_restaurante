// 1. GESTIÓN DE USUARIOS
export const LoginUsuario = [
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
      { value: 'caja', label: 'Caja' },
      { value: 'cocina', label: 'Cocina' }
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



export const camposPedido = [
  { name: 'nombre_cliente', label: 'Nombre del cliente', placeholder: 'Ej: Juan Pérez', required: true },
  { name: 'cedula', label: 'Cédula', placeholder: 'Ej: 12345678', required: true },
  { 
    name: 'telefono', 
    label: 'Teléfono de contacto', 
    type: 'tel', 
    placeholder: 'Ej. 04125556677', 
    required: true 
  },
  { 
    name: 'numero_mesa', 
    label: 'Número de Mesa', 
    type: 'number', 
    placeholder: 'Ej. 5', 
    required: true 
  },
  { 
    name: 'tipo_servicio', 
    label: '¿Cómo desea su pedido?', 
    type: 'select', 
    options: [
      { value: 'comedor', label: 'Comer en el sitio' },
      { value: 'llevar', label: 'Para llevar' }
    ],
    required: true 
  }
];



export const camposPago = [
  { 
    name: 'metodo', 
    label: 'Método de Pago', 
    type: 'select', 
    options: [
      { value: 'Transferencia', label: 'Transferencia Bancaria' },
      { value: 'Pago Móvil', label: 'Pago Móvil' },
      { value: 'Efectivo', label: 'Efectivo (Dólares/Soberanos)' },
      { value: 'Punto de Venta', label: 'Punto de Venta' }
    ],
    required: true 
  },
  { 
    name: 'referencia', 
    label: 'Número de Referencia', 
    type: 'text', 
    placeholder: 'Ej. REF-998877', 
    required: true 
  }
];

