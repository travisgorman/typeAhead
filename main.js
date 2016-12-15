const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// Get array of data from the endpoint
// declare variables for search and display elements
// event listeners: `searchInput` listens to the search element for changes and keyup events, calling `displayMatches`
// `findMatches` takes input patern and creates a regular expression to search for
// `displayMatches` calls `findMatches`, maps over its returned data returning a string of list items, and inserts them into the `.suggestions` list.
// `displayMatches` is an event handler, so `this.value` is anything currently typed in the search input
// inside `displayMatches` create a variable that maps over `matchArray` returning HTML list items
// format population numbers to include comma separators
// highlight matching patterns in the displayed suggestions


const cities = [];

fetch(endpoint)
	.then(blob => blob.json())
		.then(data => cities.push(...data));


function findMatches(wordToMatch, cities){
	return cities.filter(place => {
		const regex = new RegExp(wordToMatch, 'gi');
		return place.city.match(regex) || place.state.match(regex)
	});
}


function displayMatches() {
	const matchArray = findMatches(this.value, cities);
	const html = matchArray.map(place => {
		const regex = new RegExp(this.value, 'gi');
		const cityName = place.city.replace(regex,`<span class='hl'>${this.value}</span>`);
		const stateName = place.state.replace(regex,`<span class='hl'>${this.value}</span>`);
		return `
			<li>
				<span class='name'>${cityName}, ${stateName}</span>
				<span class='population'>${place.population}</span>
			</li>
		`;
	}).join('');
	suggestions.innerHTML = html
}


const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');



searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);




