//Script para capturar pokemons en la pokeAPI:
async function getPkmn(numeroAleatorio) {
    const url = `https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos

}


async function mi_peticion(){
    //Sale un número aleatorio que genera la imagen de un pokemon
    const numeroAleatorio = generarNumeroAleatorio();
    const numeroAleatorio1 = generarNumeroAleatorio();
    const numeroAleatorio2 = generarNumeroAleatorio();
    const numeroAleatorio3 = generarNumeroAleatorio();
    
    const pkmn = await getPkmn(numeroAleatorio);
    const pkmn1 = await getPkmn(numeroAleatorio1);
    const pkmn2 = await getPkmn(numeroAleatorio2);
    const pkmn3 = await getPkmn(numeroAleatorio3);
    
    const {front_default} = pkmn.sprites
    const urlImagenFrontal = front_default
    
    function UpdatePokemon(mode){
        const imgPokemon = document.getElementById("imgPokemon");
        imgPokemon.src = urlImagenFrontal;
        imgPokemon.className = `${mode}`;
    }
    
    //Accedo a la informacion de nombre de la API para que me cambie el nombre de pokemon en el botón
    //updateOpciones(pkmn.name);

    const pregunta = {
        win: pkmn.name,
        winImg: pkmn.imgPokemon,
        lose1: pkmn1.name,
        lose2: pkmn2.name,
        lose3: pkmn3.name,
    }

    updateOpciones(pregunta);
    UpdatePokemon("hidden");
    
    const form = document.querySelector("#form-jugador")
    
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    newForm.addEventListener("click", (e) => {
        e.preventDefault();
        //const imgPokemon = document.getElementById("imgPokemon");
        //imgPokemon.src = pregunta.winImg;
        //imgPokemon.className = "show"
        UpdatePokemon("show");
        const opcion = e.target.value;
        if(opcion == pregunta.win){
            document.querySelector('#mensaje').innerHTML = "Correcto!";
            jugador.aciertos++;
            UpdateJugador();
            setTimeout(() =>{
                mi_peticion();
            }, 500);
        }else{
            document.querySelector('#mensaje').innerHTML = "Incorrecto!";
            jugador.vidas--;
            jugador.fallos++;
            UpdateJugador();

            //Falta poner que pasa cuando llega a 0 vidas

            setTimeout(() =>{
                mi_peticion();
            }, 500);
        }
    })
    
}

const jugador = {
    vidas: 3,
    aciertos: 0,
    fallos: 0,
}

function UpdateJugador(){
    const vidas = document.querySelector('#vidas')
    const aciertos = document.querySelector('#aciertos')
    const fallos = document.querySelector('#fallos')

    vidas.innerHTML = `<p>Vidas: ${jugador.vidas}</p>`
    aciertos.innerHTML = `<p>Aciertos: ${jugador.aciertos}</p>`
    fallos.innerHTML = `<p>Fallos: ${jugador.fallos}</p>`
}


function updateOpciones(opciones) {
    //Modifico la información del botón del HTML
    const btnObtenerPokemon = document.getElementById("btnObtenerPokemon");
    const btnObtenerPokemon1 = document.getElementById("btnObtenerPokemon1");
    const btnObtenerPokemon2 = document.getElementById("btnObtenerPokemon2");
    const btnObtenerPokemon3 = document.getElementById("btnObtenerPokemon3");
    
    const buttons = [btnObtenerPokemon, btnObtenerPokemon1, 
    btnObtenerPokemon2, btnObtenerPokemon3];
    buttons.sort(() => Math.random() - 0.5);

    btnObtenerPokemon.value = opciones.win;
    btnObtenerPokemon1.value = opciones.lose1;
    btnObtenerPokemon2.value = opciones.lose2;
    btnObtenerPokemon3.value = opciones.lose3;
}

UpdateJugador();
mi_peticion();

function generarNumeroAleatorio(){
    return Math.floor(Math.random() * 200) + 1;
}

const btnObtenerPokemon = document.getElementById("btnObtenerPokemon");

//Agregar un event listener para ejecutar mi_peticion al hacer click en el botón
//btnObtenerPokemon.addEventListener("click", mi_peticion);

