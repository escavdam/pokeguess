const jugador = {
    vidas: 3,
    puntos: 0,
    fallos: 0,
}

async function getPkmn() {
    const id = Math.floor(Math.random() * 751) + 1;
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
    const pkmn = await getPkmn();
    const pkmn2 = await getPkmn();
    const pkmn3 = await getPkmn();
    const pkmn4 = await getPkmn();
    
    document.querySelector('main').style.border = "8px solid #666"
    document.querySelector('main').style.background = "gray"
    document.querySelector('#mensaje').innerHTML = "¿Que pokemon es?";
    
    const pregunta = {
        win: pkmn.nombre,
        winImg: pkmn.imagen,
        lose1: pkmn2.nombre,
        lose2: pkmn3.nombre,
        lose3: pkmn4.nombre,
    }
    
    updatePkmn(pregunta.winImg);
    hiddenPokemon();
    updateOpciones(pregunta)
    const form = nuevoFormulario()
    form.addEventListener("click", (e) => {
        e.preventDefault(); //previene comportamientos predefinidos
        desactivaBotones();
        const opcion = e.target.value; //capturo el valor del boton
        updatePkmn(pregunta.winImg)
        compruebaRespuesta(opcion, pregunta);
    })
}

function nuevoFormulario(){
    const form = document.querySelector("#form-jugador");
    const newForm = form.cloneNode(true); //copiamos el contenido del formulario sin el evento
    form.parentNode.replaceChild(newForm, form); //sustituimos el contenido del formulario anterior por el nuevo
    return newForm
}

function compruebaRespuesta(opcion, pregunta){
    
    showPokemon();
    if(opcion == pregunta.win){ //condicion para ganar
        document.querySelector('#mensaje').innerHTML = "Correcto!";
        document.querySelector('main').style.border = "8px solid green"
        document.querySelector('main').style.background = "#363"
        jugador.puntos++;
        updateJugador()
        setTimeout(() => nuevaPregunta(), 3000)
    }
    else{ //condicion para fallar
        document.querySelector('#mensaje').innerHTML = `Incorrecto! El pokemon era ${pregunta.win}!`;
        jugador.fallos++;
        jugador.vidas--;
        document.querySelector('main').style.border = "8px solid red"
        document.querySelector('main').style.background = "#633"

        if(jugador.vidas == 0){ //ha perdido
            jugador.vidas = 0;
            document.querySelector('#mensaje').innerHTML = "Game Over!";
            desactivaBotones();
            return //nos saca fuera de la funcion si el jugador ha perdido
        }
        updateJugador() //esto se ejecuta cuando el jugador ha fallado pero no ha perdido
        setTimeout(() => nuevaPregunta(), 3000)
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

    vidas.innerHTML = `<p>Vidas: ${jugador.vidas}</p>`
    puntos.innerHTML = `<p>Puntos: ${jugador.puntos}</p>`
    fallos.innerHTML = `<p>Fallos: ${jugador.fallos}</p>`
}

function updateOpciones(opciones){
    const opcion0 = document.querySelector("#opcion0");
    const opcion1 = document.querySelector("#opcion1");
    const opcion2 = document.querySelector("#opcion2");
    const opcion3 = document.querySelector("#opcion3");

    const botones = [opcion0, opcion1, opcion2, opcion3];
    botones.sort(() => Math.random() - 0.5);

    botones[0].value = opciones.win;
    botones[1].value = opciones.lose1;
    botones[2].value = opciones.lose2;
    botones[3].value = opciones.lose3;
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

updateJugador()
nuevaPregunta()
