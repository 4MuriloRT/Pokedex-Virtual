const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_img');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const btnShiny = document.getElementById('toggle-shiny');
const shinyIndicator = document.getElementById('shiny-indicator');

let searchPokemon = 1;
let isShiny = false;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
  
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);   

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;

        let normalSprite;
        let shinySprite;

        if(data.id < 650){
            normalSprite = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            shinySprite = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
        } else{
            normalSprite = data['sprites']['front_default'];
            shinySprite = data['sprites']['front_shiny'];
        }

        if(isShiny){
            pokemonImage.src = shinySprite;
        }else{
            pokemonImage.src = normalSprite;
        }
        

        btnShiny.onclick = () => toggleShiny(normalSprite, shinySprite);

        input.value = '';
        searchPokemon = data.id;
    }else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado :C';
        pokemonNumber.innerHTML = '';
    }
}

function toggleShiny(normalSprite, shinySprite){

    if(isShiny){
        shinyIndicator.style.display = 'none';
        pokemonImage.src = normalSprite;
    }else{
        shinyIndicator.style.display = 'block';
        pokemonImage.src = shinySprite;
    }
    isShiny = !isShiny;
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());    
});
btnPrev.addEventListener('click', (event) =>{
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    } 
});

btnNext.addEventListener('click', (event) =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);