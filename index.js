/**************************************************/
// Require Commander.js here. TODO

/*******************************************************************************
*
*	The create index method creates a bunch of indices from
*	a JSON file.
* 	@args - filePath to json file
*
********************************************************************************/
var program = require ("./src/invertedIndex.js");
program.createIndex("books.json");
program.getIndex();
