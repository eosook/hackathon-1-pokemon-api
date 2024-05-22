const apiUrl = "https://pokeapi.co/api/v2/pokedex/";
const kantoRegionUrl = "https://pokeapi.co/api/v2/pokedex/2/";
const pokemonFormUrl = "https://pokeapi.co/api/v2/pokemon-form/";

const pokemonNameDiv = document.querySelector(".pokemon-name");

const pokemonSubmit = document.querySelector(".submit");
const pokeForm = document.querySelector(".poke-form");

// async function fetch(){
//     const pokedexKanto = await axios.get(kantoRegionUrl);
//     console.log(pokedexKanto.data.pokemon_entries[0].pokemon_species.name);
// }

// fetch();

function randomPokedexEntry(){
    return (Math.floor(Math.random() * 151));
}

async function getRandomPokemon(){
    const pokedexKanto = await axios.get(kantoRegionUrl);
    let pokedexEntry = randomPokedexEntry();
    let pokemonName = pokedexKanto.data.pokemon_entries[pokedexEntry].pokemon_species.name;
    return pokemonName;
}

async function getPokemonSprite(){
    const pokeName = await getRandomPokemon();
    const pokemonSprite = await axios.get(pokemonFormUrl + pokeName);
    console.log(pokemonSprite.data.sprites.front_default);
    return pokeName;
}

async function storeName(){
    const pokeName = await getPokemonSprite();
    pokemonNameDiv.innerText = pokeName;
    console.log(pokeName);

    pokeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let pokemonGuess = e.target.guess.value;

        if (pokemonGuess.toLowerCase() == pokeName){
            console.log("Woohoo!");
        } else {
            console.log("NOPE");
        }
    })
}

storeName();