const card = document.querySelector('.container_card');

async function showTarget(){
    try{
        const response = await fetch('/api/menu');
        const result = await response.json();

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