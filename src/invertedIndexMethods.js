
/**
 * Adds a new token doc pair to the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to store the doc under
 * @param {Object} doc The doc to store against the token
 * @param {Object} root An optional node at which to start looking for the
 * correct place to enter the doc, by default the root of this lunr.TokenStore
 * is used.
 * @memberOf TokenStore
 */
// Require modules for this class to function
// Effectively.

var	fs = require('fs'),
	path = require('path'),
	Firebase = require('firebase'),
	helpers = require('./helpers-1.js'),
	final_created_index = {};
	myRootRef = new Firebase('https://invertedindex.firebaseio.com/');

function Index() {
	this.isEmpty = true;
	this.content_as_json = null;
	this.created_index = {};// This should hold tokens, and markers to specify which book a token appears.
	this.indexed_file = "";
}

// Defining methods for the Index class


/**
 * Adds a new token doc pair to the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to store the doc under
 * @param {Object} doc The doc to store against the token
 * @param {Object} root An optional node at which to start looking for the
 * correct place to enter the doc, by default the root of this lunr.TokenStore
 * is used.
 * @memberOf TokenStore
 */

Index.prototype.createIndex = function(filePath) {
	Index.prototype.indexed_file = path.basename(filePath);
		var content = fs.readFileSync(filePath, "utf-8");
		content = content.toString();
		if (content.length > 0) {
				
			// try {
				// Parsing string into object format.
				this.content_as_json = JSON.parse(content.trim());
				// Index Created at this point
				this.created_index = helpers.generateIndex(this.content_as_json);
				myRootRef.set(this.created_index);
				//console.log("Index successfully created!!")
			// } catch(err) {
			// 	return console.log("\n\nError : Could not generate index." + err + "\n\n");;
			// }
			return true;
		}	else {
			return false; 
		}
};


Index.prototype.getIndex = function(){
	return this.created_index;
};

Index.prototype.searchIndex = function(tokens){
	// Tokens are query strings.
};

module.exports = new Index();
