var _ = require('lodash');
module.exports = {

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
 
	get_indices : function(array_hash, books_array, token_per_book, token){
		//console.log(token);
		var result = {}, used_token = {};
		for (var f = 0; f < array_hash.length; f++) {
			for (var book = 0; book < books_array.length; book++) {
				 	if (!(used_token[array_hash[f].token] && used_token[_.indexOf(token_per_book[book], token).toString()]))
				 	{
					if (array_hash[f].token === token && array_hash[f].book_genenrated_from === books_array[book]) {
						if (!result.hasOwnProperty(array_hash[f].token)) {
							result[array_hash[f].token] = [];
							result[array_hash[f].token].push([_.indexOf(books_array, books_array[book]) , _.indexOf(token_per_book[book], token)]);
						}
						else {
							result[array_hash[f].token].push([_.indexOf(books_array, books_array[book]) , _.indexOf(token_per_book[book], token)]);
						}
						used_token[array_hash[f].token] = true;
						used_token[_.indexOf(token_per_book[book], token).toString()] = true;
					}
				}
			}
		 }
		return result;
	},


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
	generateIndex : function(content_file_json)
	{
		var books_generated = [], tokens_per_book = [], unique_tokens = [], token_per_book_hash = [], final_created_index = {}, per_book_obj, temp_result;
		for (var i = 0; i < content_file_json.length; i++) {
			per_book_obj = content_file_json[i];
			// for each item (object), get all the words and aslo book title.
			// Logic here - Books Titles in index 0 corresponds to its tokens in index 0, and so on.
			// Consecutive Arrangement.
			books_generated.push(per_book_obj["title" in per_book_obj ? "title" : null]);
			tokens_per_book.push(_.map(per_book_obj["text" in per_book_obj ? "text" : null].split(/[,.\s]+/g), function(token){
				return token.toLowerCase();
			}));

		}

		for (var j = 0; j < tokens_per_book.length; j++) {
			tokens_per_book[j].splice(-1);
			for (var k = 0; k < tokens_per_book[j].length; k++) {
				token_per_book_hash.push({
					token: tokens_per_book[j][k],
					book_genenrated_from: books_generated[j]
				});
			}
		}

		unique_tokens = _.uniq(_.flatten(tokens_per_book, true));
		// Compare Unique tokens generated with each tokens originally generated per book.
		for (var l = 0; l < unique_tokens.length; l++) {
			temp_result = this.get_indices(token_per_book_hash, books_generated, tokens_per_book, unique_tokens[l]);
			for (var prop in temp_result){
				final_created_index[prop] = temp_result[prop];
			}
		}
		return final_created_index;
	}
}
