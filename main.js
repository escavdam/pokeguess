const jugador = {
    vidas: 3,
    puntos: 0,
    fallos: 0,
}

async function getPkmn() {
    const id = Math.floor(Math.random() * 1008) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    const { name, sprites } = datos;
    const { front_default } = sprites;

    const info = {
        nombre: name,
        imagen: front_default
    };

    return info;
}

async function nuevaPregunta(){
    const pkmn0 = await getPkmn();
    const pkmn1 = await getPkmn();
    const pkmn2 = await getPkmn();
    const pkmn3 = await getPkmn();
    document.querySelector("#mensaje").innerHTML = "Who's that Pokemon?";
    
    const pregunta = {
        win: pkmn0.nombre,
        winImg: pkmn0.imagen,
        lose1: pkmn1.nombre,
        lose2: pkmn2.nombre,
        lose3: pkmn3.nombre
    };

    updatePkmn(pregunta.winImg);
    hiddenPokemon();
    updateOpciones(pregunta);
    const form = nuevoFormulario();
    form.addEventListener("click", (e) => {
        e.preventDefault();
        desactivaBotones();
        const opcion = e.target.value;
        updatePkmn(pregunta.winImg, "show");
        compruebaRespuesta(opcion, pregunta);
    })
    
}

function nuevoFormulario(){
    const form = document.querySelector("#form-jugador");
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    return newForm;
}

function compruebaRespuesta(){
    showPokemon();
    if(opcion == pregunta.win){
        document.querySelector('#mensaje').innerHTML = "Correcto!";
        jugador.puntos++;
        updateJugador();
        setTimeout(() => nuevaPregunta(), 3000);
    } else {
        document.querySelector('#mensaje').innerHTML = `Incorrecto! El pokemon era ${pregunta.win}!`;
        jugador.fallos++;
        jugador.vidas--;

        if(jugador.vidas == 0){
            jugador.vidas = 0;
            document.querySelector('#mensaje').innerHTML = "Game Over!";
            desactivaBotones();
            return;
        }
        updateJugador();
        setTimeout(() => nuevaPregunta(), 3000);
    }
}

function desactivaBotones(){
    document.querySelector("#opcion0").disabled = true;
    document.querySelector("#opcion1").disabled = true;
    document.querySelector("#opcion2").disabled = true;
    document.querySelector("#opcion3").disabled = true;
}

function activaBotones(){
    document.querySelector("#opcion0").disabled = false;
    document.querySelector("#opcion1").disabled = false;
    document.querySelector("#opcion2").disabled = false;
    document.querySelector("#opcion3").disabled = false;
}

function muestraBotones(){
    document.querySelector("#opcion0").hidden = false;
    document.querySelector("#opcion1").hidden = false;
    document.querySelector("#opcion2").hidden = false;
    document.querySelector("#opcion3").hidden = false;
}

function updateJugador(){
    const vidas = document.querySelector("#vidas");
    const puntos = document.querySelector("#aciertos");
    const fallos = document.querySelector("#fallos");

    vidas.innerHTML = `Vidas: ${jugador.vidas}`
    puntos.innerHTML = `Puntos: ${jugador.puntos}`
    fallos.innerHTML = `Fallos: ${jugador.fallos}`
}

function updateOpciones(opciones){
    const opcion0 = document.querySelector("#opcion0");
    const opcion1 = document.querySelector("#opcion1");
    const opcion2 = document.querySelector("#opcion2");
    const opcion3 = document.querySelector("#opcion3");

    const botones = [opcion0, opcion1, opcion2, opcion3];
    botones.sort(() => Math.random() - 0.5);

    botones[0].value = opciones.win
    botones[1].value = opciones.lose1
    botones[2].value = opciones.lose2
    botones[3].value = opciones.lose3
    muestraBotones();
    activaBotones();
}

function updatePkmn(sprite){
    document.querySelector("#sprite").src = sprite
}

function showPokemon(){
    document.querySelector("#sprite").className = "show"
}

function hiddenPokemon(){
    document.querySelector("#sprite").className = "hidden"
}

updateJugador();
nuevaPregunta();