// selectores
const day = document.querySelector('#day');
const fecha = document.querySelector('#date');// cambviar al final a nombre date y no fecha y todos estos con html al final
const locationhtlm = document.querySelector('#location');
const logo = document.querySelector('#logo');
const degrees = document.querySelector('#degrees');
const detalles = document.querySelector('#status');
const seSienteComo = document.querySelector('#feels');
const humedad = document.querySelector('#humidity');
const wind = document.querySelector('#wind');

const ubicacion = document.querySelector('#wheather3');
ubicacion.onclick = () => preguntarUbicacion();

// funciones
function preguntarUbicacion() {
    const cuidad = prompt('Cuidad: ');

    if (cuidad === ""){
        mostrarError('Todos los campos son Necesarios');
        return;
    };

    mostrarClima(cuidad)
}

function mostrarError () {
    console.log('error');
};

function mostrarClima(ciudad) {
    
    const apiKey = 'a6f65737c42efb377d6e034e96be0d3b';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`;

    fetch(url)
        .then( respuesta => respuesta.json())
        .then(datos => mostrarDatos(datos))
        
};

function mostrarDatos(datos) {
    console.log(datos);
    // dias transformador
    const d = new Date();
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday "];
    let dia_actual = days[d.getDay()];

    const {name, sys:{country}, wind:{speed}, weather:{[0]:{description, main}}, main:{temp, humidity, feels_like}} = datos;
    //dia
    day.textContent = `${dia_actual}`;
    // fecha
    fecha.textContent = `${d.toLocaleDateString()}`;
    // ubicacion
    locationhtlm.textContent = `${name}, ${country}`;
    //logo clima
    if (main === 'Clear') {
        logo.classList.remove('nube');
        logo.classList.add('sol');
    } else {
        logo.classList.remove('sol');
        logo.classList.add('nube');
    };
    // grados
    const grados = Math.round(temp-273.15);
    degrees.innerHTML = `${grados} &#176C`;
    // Estatus
    detalles.textContent = `${description}`;
    // Feels like
    const gradosComo = Math.round(feels_like-273.15); 
    seSienteComo.innerHTML = `Feels Like : &#171&#171&#171&#171&#171&#171&#171&#171&#171&#171 ${gradosComo} &#176C &#187&#187&#187&#187&#187&#187&#187&#187&#187&#187`;
    //humidity
    humedad.textContent = `Humidity: ${humidity}%`;
    // wind
    const KM = Math.round((speed*3.6));
    wind.innerHTML = `Wind :  ${KM}km/h`;
};