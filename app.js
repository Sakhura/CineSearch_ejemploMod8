//1.- URL API
const API_BASE='https://api.tvmaze.com'

//2.-Seleccionar los elementos del HTML
const searchInput = document.getElementById('searchInput');
const searchBtn   = document.getElementById('searchBtn');
const heroState   = document.getElementById('heroState');
const loader      = document.getElementById('loader');
const errorMsg    = document.getElementById('errorMsg');
const results     = document.getElementById('results');

//3.-Buscar Series ... GET 
async function buscarSeries(query){
    //en caso de campo vacio
    if (!query.trim()) return;

    //limpiado de pantalla 
    heroState.classList.add('d-none');
    results.innerHTML= '';
    errorMsg.classList.add('d-none');
    loader.classList.remove('d-none');

    try{
        //llamada a la API
        const response = await fetch(`${API_BASE}/search/shows$q=${encodeURIComponent(query)}`);

        //verficacion de respuesta exitosa (codigo 200)
        if (!response.ok){
            throw new Error(`Error HTTP:  ${response.status}`);
        }
        //convertir la respuesta de json a un objeto JS
        const data = await response.json();

        loader.classList.add('d-none');

        //sin no tengo resultados mostrar un mensaje
        if(data.length === 0){
            mostrarError(`No se encontraron resultados para para "${query}`);
            return;
        }

         // si tengo resultados
        mostrarResultados(data, query);
    }catch (error){
        // si algo sale mal, sin internet, error de servidor, desapecio la API, etc
        loader.classList.add('d-none');
        mostrarError('Hubo un error al conectarse con la API. Intentar nuevamente');
        console.error('Error de API: ', error);
    } 
}

//4.- funcion mostrar los resultados. Generar HTML con los datos que nos dara la API
function mostrarResultados(data, query){
    results.innerHTML =`
    <p class="section-title">
    <span>${data.length}</span> resultados para "${query}"
    </p>
    <div class="cards-grid" id="cardsGrid"></div>
    `;

    const grid = document.getElementById('cardsGrid');
    //recorrer cada resultado y crear su tarjeta
    //La API devuelve: { score: ..... show: {id, name, genero, image}}
    data.array.forEach(({ show }) => {
        const poster = show.image?.medium || null;
        const rating = show.rating?.average
            ?`${show.rating.average}`
            : '';
        const genero = show.genres?.slice(0, 2).join(' , ') || 'Sin genero';

        //crear el elemento div de la tarjeta
        const card = document.createElement('div');
        card.className = 'show-card';

        //insertar HTML interno de la card
        card.innerHTML=`
        <div class="card-img-wrap">
            ${poster
                ? `<img src="${poster}" alt="${show.name}" loading="lazy"/>`
                : `<div class="no-poster"><span>🎬</span>Sin imagen</div>`
            }
            ${rating ? `<span class="rating-badge">${rating}</span>` : ''}
        </div>
        <div class="card-body">
        .
                <div class="card-title"  title="${show.name}">${show.name}</div>
                <div class="card-genre">${genero}></div>
        </div>
        `;

        //al hacer click en la tarjeta -> pedir el detalle a la API
        card.addEventListener('click', ()=> verDetalle(show.id));
        grid.appendChild(card)
    });
}

//5. funcion para ver el detalle. Hacer una segunda llamada a la API con ID del show
async function verDetalle(showId) {
    const modalBody = document.getElementById('modalBody');
    const modalFooter = document.getElementById('modalFooter');

    //Inicializar y abrir el modal de Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('showModal'));
    modalBody.innerHTML = `
        <div class="loader">
        <div class="spinner"></div>
        Cargando detalle...
    </div>`;
    modalFooter.innerHTML= '';
    modal.show();
    
}