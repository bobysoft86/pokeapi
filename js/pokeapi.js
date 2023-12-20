const getPokeApi = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=12");
  const resJson = await response.json();
  return resJson;
};

const getAllPokeApi = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1300");
  const resJson = await response.json();
  return resJson;
};
const getStats = async (url) => {
  const response = await fetch(url);
  const resJson = await response.json();

  const name = resJson.name;
  const height = resJson.height;
  const weight = resJson.weight;
  const category = resJson.types[0].type.name;

  const pokemonStats = { name, height, weight, category };

  return pokemonStats;
};
const getPokeApiMas = async (url) => {
  const response = await fetch(url);
  const resJson = await response.json();
  return resJson;
};

const getIMG = async (url) => {
  const response = await fetch(url);
  const resJson = await response.json();
  return resJson.sprites.other["official-artwork"].front_default;
};

const wrapPokemons = async (baseDatos) => {
  for (const num in baseDatos) {
    let myPokemonWrap = document.body.querySelector(".pokemonWrap");
    let myDiv = document.createElement("div");
    let png = await getIMG(baseDatos[num].url);
    let myPokeImg = document.createElement("img");

    myPokemonWrap.appendChild(myDiv);

    myDiv.setAttribute("class", "wrapImg");
    myDiv.appendChild(myPokeImg);

    myPokeImg.setAttribute("src", png);
    myPokeImg.setAttribute("class", "pokemonWrapImages");
    myDiv.classList.add("magictime", "tinUpIn");
    let myPokeName = document.createElement("p");
    myPokeName.setAttribute("class", "myPokeName");
    myDiv.appendChild(myPokeName);

    let stats = await getStats(baseDatos[num].url); // no puedo conseguir el map
    myPokeName.style.fontSize = 3;
    myPokeName.innerText = `
    Name: ${stats.name}
    Height: ${stats.height / 10}m
    Weight: ${stats.weight / 10}kg
    Category: ${stats.category}
    `;
    myDiv.classList.add(stats.category);
  }
};

const pokedexPantalla = async (nombre, allPokeApi) => {
  let result = allPokeApi.filter((x) =>
    x.name.includes(nombre.toLocaleLowerCase())
  );
  result = result.map((data) => {
    return (data = `${data.url}`);
  });
  if (result.length != 1) {
    console.log("hola estas mal");
  } else {
    let pokedex_listaStats = document.querySelector(".pokedex_listaStats");
    let pokedexDivImg = document.body.querySelector(".pokedexDiv_img");

    pokedexDivImg.innerHTML = "";
    let myPokedexImg = document.createElement("img");
    let png = await getIMG(result);
    myPokedexImg.setAttribute("src", png);
    pokedexDivImg.appendChild(myPokedexImg);

    let stats = await getStats(result); // no puedo conseguir el map
    pokedex_listaStats.innerHTML = `
    <li>Name: ${stats.name}</li>
    <li>Height: ${stats.height / 10}m</li>
    <li>Weight: ${stats.weight / 10}kilos</li>
    <li>Category: ${stats.category}</li>
    `;
    let container_suggestions = document.querySelector(
      ".container_suggestions"
    );
    container_suggestions.innerHTML = "";
  }
};

const buscador = (allPokeApi) => {
  let pokedexInput = document.querySelector(".pokedex_input");
  let boxSuggestion = document.querySelector(".container_suggestions");
  let text = pokedexInput.value;

  let result = allPokeApi.filter((x) =>
    x.name.includes(text.toLocaleLowerCase())
  );
  console.log(result);

  result = result.map((data) => {
    return (data = `<li>${data.name}<li>`);
  });

  const showsuggestions = (list) => {
    let listData;

    if (!list.length) {
      boxSuggestion.innerText = "no existe";
    } else {
      listData = list.join(" ");
    }
    boxSuggestion.innerHTML = listData;
  };

  showsuggestions(result);
  let allList = boxSuggestion.querySelectorAll("li");

  allList.forEach((li) => {
    li.addEventListener("click", function () {
      select(this);
    });
  });

  function select(element) {
  let selectUserData = element.textContent;
  pokedexInput.value = selectUserData;
  }
};

let final = 10;
const masPokemon = async () => {
  const init = 5;

  let url = `https://pokeapi.co/api/v2/pokemon/?limit=${init}&offset=${final}`;
  let baseDatosMas = await getPokeApiMas(url);
  console.log(baseDatosMas.results);
  final += 5;
  wrapPokemons(baseDatosMas.results);
};

const init = async () => {
  let baseDatos = await getPokeApi();
  let allPokeApi = await getAllPokeApi();
  let bottonPokedex = document.querySelector(".pokedex_button");
  let bottonPokedexSet = document.querySelector(".pokedex_buttonSet");
  let pokedexInput = document.querySelector(".pokedex_input");
  let bottonMasPokemon = document.querySelector(".cargarMas");

  bottonPokedex.addEventListener("click", function () {
    buscador(allPokeApi.results);
  });

  bottonPokedexSet.addEventListener("click", function () {
    pokedexPantalla(pokedexInput.value, allPokeApi.results);
  });

  bottonMasPokemon.addEventListener("click", function () {
    masPokemon();
  });
  console.log(baseDatos.results);
  wrapPokemons(baseDatos.results);

  window.addEventListener("scroll", () => {
    console.log(window.scrollY);
    console.log(window.innerHeight);
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      masPokemon();
    }
  });
};

init();
