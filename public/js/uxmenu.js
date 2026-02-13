const card = document.querySelector('.container_card');

async function showTarget(){
    try{


        const token = localStorage.getItem('token');

        // Opcional: Si quieres que ni siquiera intente pedir datos sin token
        if (!token) {
            console.warn("No hay token disponible");
            card.innerHTML = "<p>Por favor, inicia sesión para ver el menú.</p>";
            return;
        }

        
        const response = await fetch('/api/menu', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // AQUÍ enviamos el token
                'Content-Type': 'application/json'
            }
        });


        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('token'); 
            window.location.href = '/login.html'; 
            return;
        }

        const result = await response.json();

        console.log(result)

        const data = result.body;

        const templateCard =  data.map(p => `
            <div class="card_container">
            <div class="card_header">
                <p class="title_card">${p.nombre_platillo} </p>
                <p class="price_card">${p.precio} $</p>
            </div>
            <div class="card_body">
                <p class="contain_card">${p.contenido}</p>
            </div>
            <div class="action_card">
                <button class="button" id="agg_menu">${p.id}</button>
            </div> 

        </div>         
        `).join('');

        card.innerHTML = templateCard;


    }catch(error){
        console.error("error");
        card.innerHTML = "<p>Error al cargar los platillos.</p>";
    }
}


document.addEventListener('DOMContentLoaded', showTarget);