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
    document.querySelector('#mensaje').innerHTML = "¿Que pokemon es?";
    const { nombre, imagen } = pkmn;

    const pregunta = {
        win: pkmn.nombre,
        winImg: pkmn.imagen,
        lose1: pkmn2.nombre,
        lose2: pkmn3.nombre,
        lose3: pkmn4.nombre,
    }

    updatePkmn(pregunta.winImg, "hidden");
    updateOpciones(pregunta)
    const form = document.querySelector("#form-jugador");
    //clear form event listeners
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    newForm.addEventListener("click", (e) => {
        e.preventDefault();
        updatePkmn(pregunta.winImg, "show")
        const opcion = e.target.value;
        if(opcion == pregunta.win){
            document.querySelector('#mensaje').innerHTML = "Correcto!";
            jugador.puntos++;
            if(jugador.puntos % 5 === 0){
                jugador.vidas++;
            }
            updateJugador()
            setTimeout(() => {
                nuevaPregunta()
            }, 500);
        }
        else{
            document.querySelector('#mensaje').innerHTML = `Incorrecto! El pokemon era ${pregunta.win}!`;
            jugador.fallos++;
            jugador.vidas--;
            if(jugador.vidas == 0){
                jugador.vidas = 0;
                document.querySelector('#mensaje').innerHTML = "Game Over!";
                document.querySelector('#form-jugador').innerHTML = "";
                return
            }
            updateJugador()
            setTimeout(() => {
                nuevaPregunta()
            }, 500);
        }
    })
}

const jugador = {
    vidas: 3,
    puntos: 0,
    fallos: 0,
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

}

function updatePkmn(sprite, mode){
    const img = document.querySelector("#pkmn-img");
    img.innerHTML = `<img src="${sprite}" class="${mode}">`
}

updateJugador()
nuevaPregunta()
