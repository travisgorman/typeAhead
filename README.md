# Type Ahead Search
A search tool that displays results as you type

* browser API: `fetch`
* spread operator
* `RegExp` constructor


#Process 
1. Get array of data from the endpoint
1. declare variables for search and display elements
1. event listeners: `searchInput` listens to the search element for changes and keyup events, calling `displayMatches`
1. `findMatches` takes input patern and creates a regular expression to search for
1. `displayMatches` calls `findMatches`, maps over its returned data returning a string of list items, and inserts them into the `.suggestions` list.
1. `displayMatches` is an event handler, so `this.value` is anything currently typed in the search input
1. inside `displayMatches` create a variable that maps over `matchArray` returning HTML list items
1. format population numbers to include comma separators
1. highlight matching patterns in the displayed suggestions

