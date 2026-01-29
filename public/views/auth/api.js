
//  ---------------- FORMULARIO DE REGISTRO ------------------

//
//
// REGISTER API
//
//

// ------------- PERSONALIZAR API DE REGISTRO ------------


// ----------------- FORMULARIO DE LOGIN --------------------


const registerForm = document.getElementById('registerForm');
const mensaje = document.getElementById('mensaje');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, correo, password })
        });

        const result = await response.json();

        if (response.ok) {
            
            localStorage.setItem('token', result.body.token);
            mensaje.style.color = 'green';
            mensaje.innerText = 'Login completo';

            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 1500);

        } else {
            
            mensaje.style.color = '#d93025';
            mensaje.innerText = result.body || 'Error en las credenciales';
        }

    } catch (error) {
        console.error('Error en la conexión:', error);
        mensaje.innerText = 'No se pudo conectar con el servidor';
    }
});