async function inicializarVistaAdmin() {
    const contTable = document.getElementById('contenedor-tabla');
    contTable.innerHTML = '<p>Cargando datos...</p>'; 

    // Obtenemos el token guardado
    const token = localStorage.getItem('token'); 

    try {
        const res = await fetch('/api/user', {
            method: 'GET',
            headers: {
                // ESTA LÍNEA ES VITAL:
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }); 
        
        const resultado = await res.json();

        if (resultado.status === 200) {
            construirInterfaz(resultado.body, contTable);
        } else {
            // Si el status es 401 o 403, el error vendrá aquí
            contTable.innerHTML = `<p class="error">Acceso denegado: ${resultado.body}</p>`;
        }
    } catch (error) {
        contTable.innerHTML = '<p class="error">Error de conexión.</p>';
        console.error(error);
    }
}

function construirInterfaz(usuarios, contenedor) {
    // Si no hay usuarios, mostramos un mensaje amigable
    if (!usuarios || usuarios.length === 0) {
        contenedor.innerHTML = '<p>No hay registros disponibles.</p>';
        return;
    }

    // Construimos el HTML. Nota: No repetimos el H1 si ya está en tu HTML estático
    let html = `
        <div class="table-wrapper">
            <table class="main-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
    `;

    usuarios.forEach(u => {
        html += `
            <tr>
                <td>${u.id}</td>
                <td><strong>${u.nombre || 'N/A'}</strong></td>
                <td>${u.auth?.correo}</td>
                <td><span class="status-pill">${u.auth?.rol}</span></td>
                <td>
                    <button class="btn-edit edit" onclick="editar(${u.id})">Editar</button>
                    <button class="btn-delete delete" onclick="eliminar(${u.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
    `;

    // Inyectamos el HTML generado en el contenedor
    contenedor.innerHTML = html;
}

// Inicializar
window.onload = inicializarVistaAdmin;