const startBtn = document.querySelector(".main__wrapper-btn");
let display = document.querySelector(".main__display");

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  display.style.display = "flex";
});

const apiUrl = "https://pokeapi.co/api/v2/pokedex/";
const kantoRegionUrl = "https://pokeapi.co/api/v2/pokedex/2/";
const pokemonFormUrl = "https://pokeapi.co/api/v2/pokemon-form/";

const pokemonNameDiv = document.querySelector(".pokemon-name");
const pokemonImageDiv = document.querySelector(".main__container-img")

const pokemonSubmit = document.querySelector(".main__input-btn");
const pokeForm = document.querySelector(".main__input");
const result = document.querySelector(".main__input-result");
const points = document.querySelector(".points");

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

let score = 0;
let round = 0;

async function start(){
    let pokeName = await getRandomPokemon();
    let spriteUrl = await getPokemonSprite(pokeName);
    let guessCount = 3;
    console.log(spriteUrl);
    pokemonImageDiv.src = spriteUrl;
    console.log(pokeName);

    pokeForm.addEventListener("submit", function submit(e){
        e.preventDefault();
        let pokemonGuess = e.target.name.value;
    
        if (pokemonGuess.toLowerCase() == pokeName){
            console.log("Woohoo!");
            score ++;
            round ++;
            result.innerText = "CORRECT!!"
            points.innerText = `Score: ${score}`;
            pokeForm.removeEventListener("submit", submit);
            start();
        } else {
            console.log("NOPE");
            guessCount --;

            if (guessCount === 2){
              result.innerText = `Lives Remaining: ❤️❤️`
            } else if (guessCount === 1){
              result.innerText = `Lives Remaining: ❤️`
            } else {
              pokeForm.removeEventListener("submit", submit);
                start();
                round ++;
                result.innerText = `Wrong! Next Pokemon!`
            }
        }
    })
}

start();