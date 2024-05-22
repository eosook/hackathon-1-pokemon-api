const apiUrl = "https://pokeapi.co/api/v2/pokedex/";
const kantoRegionUrl = "https://pokeapi.co/api/v2/pokedex/2/";
const pokemonFormUrl = "https://pokeapi.co/api/v2/pokemon-form/";

const pokemonNameDiv = document.querySelector(".pokemon-name");
const pokemonImageDiv = document.querySelector(".pokemon-image")

const pokemonSubmit = document.querySelector(".submit");
const pokeForm = document.querySelector(".form");

function randomPokedexEntry(){
    return (Math.floor(Math.random() * 151));
}

async function getRandomPokemon(){
    const pokedexKanto = await axios.get(kantoRegionUrl);
    let pokedexEntry = randomPokedexEntry();
    let pokemonName = pokedexKanto.data.pokemon_entries[pokedexEntry].pokemon_species.name;
    return pokemonName;
}

async function getPokemonSprite(pokemonName){
    const pokemonSpriteUrl = await axios.get(pokemonFormUrl + pokemonName);
    const pokemonSprite = pokemonSpriteUrl.data.sprites.front_default;
    return pokemonSprite;
}

async function start(){
    const pokeName = await getRandomPokemon();
    const spriteUrl = await getPokemonSprite(pokeName);
    let guessCount = 3;
    console.log(spriteUrl);
    pokemonImageDiv.src = spriteUrl;
    console.log(pokeName);

    pokeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let pokemonGuess = e.target.guess.value;

        if (pokemonGuess.toLowerCase() == pokeName){
            console.log("Woohoo!");
        } else {
            console.log("NOPE");
            guessCount--;
            console.log(guessCount);
        }

        if (guessCount === 0){
            reset();
        }
    })
}

start();

function reset(){
    let guessCount = 3;
    start();
}