# Una ayuda
Para esta práctica quiero que tengais algo de boilerplate listo para usar.

- Script para capturar pokemons en la pokeAPI:

~~~javascript
async function getPkmn() {
    const url = `https://pokeapi.co/api/v2/pokemon/1`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos
}
~~~

Esta funcion asincrona devuelve la respuesta de la llamada a la pokeAPI, aunque presenta varios puntos a mejorarle.

~~~css
.hidden{
    filter: brightness(0);
}

.show{
    filter: brightness(1);
}
~~~

Estas clases de css os ayudarán a ocultar y mostrar los pokemon en el juego.