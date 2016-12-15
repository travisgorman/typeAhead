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

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// event listeners on the search input
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

// fetch data from an external enpoint and pushing it into an array we can use
const cities = [];
fetch(endpoint)
	.then(blob => blob.json())
		.then(data => cities.push(...data));

// pass in a string pattern and an array, and it returns an array of items where the string pattern is found anywhere in the `city` or `state` value.
function findMatches(wordToMatch, cities){
	return cities.filter(place => {
		const regex = new RegExp(wordToMatch, 'gi');
		return place.city.match(regex) || place.state.match(regex)
	});
}

// pass in a number, and it returns that number as a string with commas
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// maps over the matching items, returns an HTML string, and inserts it into the `suggestions` list (the results display)
function displayMatches() {
	const matchArray = findMatches(this.value, cities);
	const html = matchArray.map(place => {
		const regex = new RegExp(this.value, 'gi');
		const cityName = place.city.replace(regex,`<span class='hl'>${this.value}</span>`);
		const stateName = place.state.replace(regex,`<span class='hl'>${this.value}</span>`);
		return `
			<li>
				<span class='name'>${cityName}, ${stateName}</span>
				<span class='population'>${numberWithCommas(place.population)}</span>
			</li>
		`;
	}).join('');
	suggestions.innerHTML = html
}
