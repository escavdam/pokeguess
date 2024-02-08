async function getPkmn(numero) {
    const url = `https://pokeapi.co/api/v2/pokemon/${numero}`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos;
}

function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 999) + 1;
}

async function mi_peticion() {
    const imagenDesenfocada = document.querySelector('#imagenDesenfocada');
    imagenDesenfocada.classList.remove('hidden');

    const numeroAleatorio = generarNumeroAleatorio();
    const numeroAleatorio1 = generarNumeroAleatorio();
    const numeroAleatorio2 = generarNumeroAleatorio();
    const numeroAleatorio3 = generarNumeroAleatorio();

    const pkmn = await getPkmn(numeroAleatorio);
    const pkmn1 = await getPkmn(numeroAleatorio1);
    const pkmn2 = await getPkmn(numeroAleatorio2);
    const pkmn3 = await getPkmn(numeroAleatorio3);

    const { front_default } = pkmn.sprites;
    const urlImagenFrontal = front_default;

    const imgPokemon = document.querySelector("#imgPokemon");
    imgPokemon.src = urlImagenFrontal;

    imagenDesenfocada.classList.add('hidden');

    mostrarNombrePokemon(nombrePokemon, nombrePokemon1, nombrePokemon2, nombrePokemon3);

    const opciones = {
        win: pkmn.name,
        lose1: pkmn1.name,
        lose2: pkmn2.name,
        lose3: pkmn3.name
    };

    updateOpciones(opciones);

    const newForm = form.cloneNode(true)
    form.parentNode.replaceChild(newForm, form);
    newForm.addEventListener("click", (e) => {
        e.preventDeFault(); //previene comportamientos predefinidos, en este caso, mandar el formulario automaticamente
        updatePkmn(pregunta.winImg, "show")
        const opcion = e.target.value; //capturo el valor del boton
        console.log(opcion)
    })
}

function updateOpciones(opciones) {
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
    botones[4].value = opciones.lose4;
}

document.addEventListener("DOMContentLoaded", function () {
    mi_peticion();

    const obtenerPokemonBotones = document.querySelectorAll("#pkmon, #pkmon1, #pkmon2, #pkmon3");
    Math.random() - 0.5

    obtenerPokemonBotones.forEach(function (boton) {
        boton.addEventListener("click", function () {
            mi_peticion();
        });
    });
});

function mostrarNombrePokemon(nombrePokemon, nombrePokemon1, nombrePokemon2, nombrePokemon3) {
    const btnObtenerPokemon = document.querySelector("#pkmon");
    const btnObtenerPokemon1 = document.querySelector("#pkmon1");
    const btnObtenerPokemon2 = document.querySelector("#pkmon2");
    const btnObtenerPokemon3 = document.querySelector("#pkmon3");

    btnObtenerPokemon.value = `${nombrePokemon}`;
    btnObtenerPokemon1.value = `${nombrePokemon1}`;
    btnObtenerPokemon2.value = `${nombrePokemon2}`;
    btnObtenerPokemon3.value = `${nombrePokemon3}`;
}