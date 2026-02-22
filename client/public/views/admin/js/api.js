// ------------- PERSONALIZAR API DE REGISTRO ------------


const registerForm = document.getElementById('registerForm');
const msjR = document.getElementById('mensaje-r');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 


    const nombre = document.getElementById('reg-nombre').value;
    const correo = document.getElementById('reg-correo').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirmPassword').value;

    if (password !== confirmPassword) {
        msjR.style.color = '#d93025';
        msjR.innerText = 'Las contraseñas no coinciden';
        return;
    }

    try {
        const response = await fetch('/api/user', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, correo, password })
        });

        const result = await response.json();

        if (response.ok) {
            msjR.style.color = 'green';
            msjR.innerText = 'Registro exitoso. Ya puedes iniciar sesión.';

            registerForm.reset();


        } else {
            msjR.style.color = '#d93025';
            msjR.innerText =  'Error al registrar';
        }

    } catch (error) {
        console.error('Error en la conexión:', error);
        msjR.innerText = 'No se pudo conectar con el servidor';
    }
});