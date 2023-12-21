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
  const id = resJson.id;
  const name = resJson.name;
  const height = resJson.height;
  const weight = resJson.weight;
  const category = resJson.types[0].type.name;

  const pokemonStats = { name, height, weight, category, id };

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
    let myPokeImg = document.createElement("img");
    let png = await getIMG(baseDatos[num].url);

    myPokemonWrap.appendChild(myDiv);

    myDiv.setAttribute("class", "wrapImg");
    myDiv.appendChild(myPokeImg);

    myPokeImg.setAttribute(
      "src",
      "./styles/img/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278258688k78u.png"
    );
    myPokeImg.setAttribute("class", "pokemonWrapImages");
    myDiv.classList.add("magictime", "tinUpIn");
    setTimeout(function () {
      //temporizador para la del pokemon imagen
      myPokeImg.setAttribute("src", png);
    }, 1100);
    let myPokeName = document.createElement("p");
    myPokeName.setAttribute("class", "myPokeName");
    myDiv.appendChild(myPokeName);
    let stats = await getStats(baseDatos[num].url); // no puedo conseguir el map
    myDiv.classList.add(stats.category);
    myPokeName.style.fontSize = 3;
    console.log(stats.id);
    myPokeName.innerText = `
    id: ${stats.id}
    Name: ${stats.name}
    Height: ${stats.height / 10}m
    Weight: ${stats.weight / 10}kg
    Category: ${stats.category}
    `;
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
    myPokedexImg.classList.add("magictime", "vanishIn");
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

const wrapPokemonsClass = async (baseDatos, clase) => {
  for (const num in baseDatos) {
    let stats = await getStats(baseDatos[num].url);
    let check = stats.category;

    if (check == clase) {
      //compruebo si es de la classe
      let myPokemonWrap = document.body.querySelector(".pokemonWrap");
      let myDiv = document.createElement("div");
      let myPokeImg = document.createElement("img");
      let png = await getIMG(baseDatos[num].url);

      myPokemonWrap.appendChild(myDiv);

      myDiv.setAttribute("class", "wrapImg");
      myDiv.appendChild(myPokeImg);

      myPokeImg.setAttribute(
        "src",
        "./styles/img/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278258688k78u.png"
      );
      myPokeImg.setAttribute("class", "pokemonWrapImages");
      myDiv.classList.add("magictime", "tinUpIn");
      setTimeout(function () {
        //temporizador para la del pokemon imagen
        myPokeImg.setAttribute("src", png);
      }, 1100);
      let myPokeName = document.createElement("p");
      myPokeName.setAttribute("class", "myPokeName");
      myDiv.appendChild(myPokeName);
      let stats = await getStats(baseDatos[num].url); // no puedo conseguir el map
      myDiv.classList.add(stats.category);
      myPokeName.style.fontSize = 3;
      myPokeName.innerText = `
                id : ${stats.id}
                Name: ${stats.name}
                Height: ${stats.height / 10}m
                Weight: ${stats.weight / 10}kg
                Category: ${stats.category}
                `;
      console.log(stats);
    }
  }
};

let final = 10;
const masPokemonClass = async (clase) => {
  const init = 10;

  let url = `https://pokeapi.co/api/v2/pokemon/?limit=${init}&offset=${final}`;
  let baseDatosMas = await getPokeApiMas(url);
  final += 10;
  wrapPokemonsClass(baseDatosMas.results, clase);
};
const classSelector = (tipo) => {
  let clase = document.querySelectorAll(`.${tipo}`);
  let wrap = document.querySelector(".pokemonWrap");
  let clase1 = tipo;
  wrap.innerHTML = "";

  clase.forEach((carta) => wrap.appendChild(carta));

  window.addEventListener("scroll", () => {
    //     console.log(window.scrollY);
    // console.log(window.innerHeight);
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      console.log(clase1);
      masPokemonClass(clase1);
      window.scrollTo(0, window.innerHeight - 1);
    }
  });
};

const masPokemon = async () => {
  const init = 10;

  let url = `https://pokeapi.co/api/v2/pokemon/?limit=${init}&offset=${final}`;
  let baseDatosMas = await getPokeApiMas(url);
  console.log(baseDatosMas.results);
  final += 10;
  wrapPokemons(baseDatosMas.results);
};

const init = async () => {
  let baseDatos = await getPokeApi();
  let allPokeApi = await getAllPokeApi();
  let bottonPokedex = document.querySelector(".pokedex_button");
  let bottonPokedexSet = document.querySelector(".pokedex_buttonSet");
  let pokedexInput = document.querySelector(".pokedex_input");
  let bottonMasPokemon = document.querySelector(".cargarMas");
  let bottonGrass = document.querySelector(".grass_select");
  let bottonFire = document.querySelector(".fire_select");
  let bottonwater = document.querySelector(".water_select");
  let bottonbug = document.querySelector(".bug_select");

  bottonPokedex.addEventListener("click", function () {
    buscador(allPokeApi.results);
  });
  bottonPokedexSet.addEventListener("click", function () {
    pokedexPantalla(pokedexInput.value, allPokeApi.results);
  });
  bottonMasPokemon.addEventListener("click", function () {
    masPokemon();
    window.addEventListener("scroll", () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
      ) {
        masPokemon();
      }
    });
  });
  bottonGrass.addEventListener("click", function () {
    classSelector("grass");
  });
  bottonFire.addEventListener("click", function () {
    classSelector("fire");
  });
  bottonwater.addEventListener("click", function () {
    classSelector("water");
  });
  bottonbug.addEventListener("click", function () {
    classSelector("bug");
  });

  wrapPokemons(baseDatos.results);
};

init();
