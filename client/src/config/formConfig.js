export const camposUsuario = [
    { name: 'nombre', label: 'Nombre Completo', placeholder: 'Ej: Galanton', required: true },
    { name: 'correo', label: 'Correo Electrónico', type: 'email', placeholder: 'correo@ejemplo.com', required: true },
    { name: 'password', label: 'Contraseña', type: 'password', placeholder: '••••••••', required: true },
    {name: 'rol', label: 'Rol del Usuario en el sistema', placeholder:'Introduzca rol', required: true}
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
    {name: 'imagen', label: 'Agrega la la imagen del producto', type: 'file', required: false}
    
]