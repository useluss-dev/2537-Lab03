console.log("js file loaded");

let offset = 0;
let limit = 10;

async function loadPokemon() {
	try {
		let response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
		let jsonObj = await response.json();
		let pokemonList = jsonObj.results;

		for (const pokemon of pokemonList) {
			let pokemonDetails = await fetch(pokemon.url);
			const detailsJson = await pokemonDetails.json();
			console.log(detailsJson);

			const card = document.createElement('div');
			card.classList.add("card");
			card.style.width = "475px";

			card.innerHTML = `
				<img src="${detailsJson.sprites.other['official-artwork'].front_default}" class="card-img-top" />
				<div class="card-body" style="background-color:#f8f8f8;">
					<h3 class="card-title">${detailsJson.name}</h3>
				</div>
		`
			document.getElementById("pokemonList").appendChild(card);
		}

	} catch (err) {
		console.error("failed to load pokemon", err);
	}
}
loadPokemon();

document.addEventListener("scroll", function() {
	let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
	let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
	if (scrollTop + clientHeight >= scrollHeight) {
		offset += limit;
		loadPokemon()
	}
});

