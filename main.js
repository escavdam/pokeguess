async function getPkmn() {
    const i = Math.floor(Math.random() * 898) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos
}

async function mi_peticion(){
    const pkmn = await getPkmn()
    const pkmn1 = await getPkmn()
    const pkmn2 = await getPkmn()
    const pkmn3 = await getPkmn()
    
    const {name} = pkmn
    const {front_default} = pkmn.sprites.front_default

   /* const imgElement = document.createElement('img');
    imgElement.src = pkmn.sprites.front_default;*/
   

    const pregunta = {
        ganador: pkmn.name,
        imagenGanador: pkmn.sprites.front_default,
        perdedor1: pkmn1.name,
        perdedor2: pkmn2.name,
        perdedor3: pkmn3.name
    }
    //const nombres = document.querySelector("")
    updatePkmn(pkmn.sprites.front_default, "hidden")
    console.log(pkmn.front_default)
    updateOpciones(pregunta)
    
    
}

function updateOpciones(opciones){
    const opcion1 = document.querySelector("#opcion1")
    const opcion2 = document.querySelector("#opcion2")
    const opcion3 = document.querySelector("#opcion3")
    const opcion4 = document.querySelector("#opcion4")
    
    const botones = [opcion1, opcion2, opcion3, opcion4];
    botones.sort(() => Math.random() -0.5);
    //randomizar mi array de botones
    botones[0].value = opciones.ganador;
    botones[1].value = opciones.perdedor1;
    botones[2].value = opciones.perdedor2;
    botones[3].value = opciones.perdedor3;
}
const form = document.querySelector("#form-jugador");
const newForm = form.cloneNode(true);
form.parentNode.replaceChild(newForm, form);
newForm.addEventListener("click", (e) => {
    e.preventDefault();
    updatePkmn(pregunta.imagenGanador,"show")
    const opcion1 = e.target.value;
    console.log(opcion1)
})


function updatePkmn(sprite, mode){
    const contenedor = document.querySelector("#pkmn-img");
    contenedor.innerHTML = `<img src="${sprite}" class="${mode}">`
}


mi_peticion()