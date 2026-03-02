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
    {name: 'nombre_platillo', label: 'Nombre del platillo', placeholder:'Introduzca nombre', required: true},
    {name: 'precio', label: 'Precio del platillo', placeholder:'Introduzca precio', required: true},
    {name: 'contenido', label: 'Contenido del platillo', placeholder:'Introduzca contenido', required: true},
    {name: 'category', label: 'Categoria', placeholder:'ej: comida, bebida', required: false},
    {name: 'imagen', label: 'Agrega la la imagen del producto', type: 'file', required: true}
    
]


export const camposEditMenu = [
    {name: 'nombre_platillo', label: 'Nombre del platillo', placeholder:'Introduzca nombre', required: false},
    {name: 'precio', label: 'Precio del platillo', placeholder:'Introduzca precio', required: false},
    {name: 'contenido', label: 'Contenido del platillo', placeholder:'Introduzca contenido', required: false},
    {name: 'category', label: 'Categoria', placeholder:'ej: comida, bebida', required: false},
    {name: 'imagen', label: 'Agrega la la imagen del producto', type: 'file', required: false},
    {name: 'imagen', label: 'Agrega la la imagen del producto', type: 'file'}

]

export const camposPedido = [
  { name: 'nombre_cliente', label: 'Nombre del cliente', placeholder: 'Ej: Juan Pérez', required: true },
  { name: 'cedula', label: 'Cedula', placeholder: 'Ej: 12345678', required: true },
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
    // Aquí está el truco:
    showIf: { field: 'metodo_pago', value: 'pago_movil' } 
  }
];
