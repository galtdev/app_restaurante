
const regPlatillo = document.getElementById('reg_platillo');
const mensaje = document.getElementById('mensaje');



regPlatillo.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const nombre_platillo = document.getElementById('nombre_platillo').value;
    const precio = document.getElementById('precio').value;
    const contenido = document.getElementById('contenido').value;

    try {
        const response = await fetch('/api/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id:0, nombre_platillo, precio, contenido })
        });

        const result = await response.json();
        const msj = result.body.msj;

        if (response.ok) {
            mensaje.innerText = msj;
            setTimeout(() => {
                mensaje.innerText = '';
            }, 1500);
        }
        else {
            mensaje.style.color = "#d93025";
            mensaje.innerText = "error al enviar";
        }

    } catch (error) {
        console.error('Error en la conexión:', error);
        mensaje.innerText = 'No se pudo conectar con el servidor';
    }
});
