const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// Get array of data from the endpoint

const cities = [];

fetch(endpoint)
	.then(blob => blob.json())
		.then(data => cities.push(...data));


// findMatches takes input patern and creates a regular expression to search for

function findMatches(wordToMatch, cities){
	return cities.filter(place => {
		const regex = new RegExp(wordToMatch, 'gi');
		return place.city.match(regex) || place.state.match(regex)
	});
}

// `displayMatches` calls `findMatches`, maps over its returned data returning a string of list items, and inserts them into the `.suggestions` list.

function displayMatches() {
	// this is an event handler, so `this.value` is anything currently typed in the search input
	// call `findMatches` and pass in `this.value`, as the `wordsToMatch` argument, and the `cities` array
	const matchArray = findMatches(this.value, cities);
	// return an HTML string of list items by mapping over `matchArray`
	const html = matchArray.map(place => {
		// const RegEx = new RegExp(this.value, 'gi');
		// const cityName = place.city.replace(regex,`<span class='hl'>${this.value}</span>`);
		// const stateName = place.state.replace(regex,`<span class='hl'>${this.value}</span>`);
		return `
			<li>
				<span class='name'>${place.city}, ${place.state}</span>
				<span class='population'>${place.population}</span>
			</li>
		`;
	}).join('');
	suggestions.innerHTML = html

}

// declare variables for search and display elements
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');


// `searchInput` listens to the search element for changes and keyup events, calling `displayMatches`
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);



// format population numbers to include comma separators




// highlight matching patterns in the displayed suggestions