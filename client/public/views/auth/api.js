

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


// ----------------- FORMULARIO DE LOGIN --------------------


const loginForm = document.getElementById('loginForm');
const msjL = document.getElementById('mensaje-l');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, password })
        });

        const result = await response.json();

        if (response.ok) {
            
            localStorage.setItem('token', result.body.token);
            msjL.style.color = 'green';
            msjL.innerText = 'Login completo';

        } else {
            msjL.style.color = '#d93025';
            msjL.innerText = 'Error en las credenciales';
        }

    } catch (error) {
        console.error('Error en la conexión:', error);
        msjL.innerText = 'No se pudo conectar con el servidor';
    }
});