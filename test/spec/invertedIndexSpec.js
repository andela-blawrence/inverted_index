
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

// describe("Inverted Index" function(){
	window.index = new Index();
	describe("Read Book Data", function(){
		it("should not be be empty", function(){
			expect(index.createIndex()).toBe(true);
		});            
	});

	describe("Inverted_Index", function(){
		it("should perform all operations/task with a within a class", function(){
			expect(typeof index).toBe('object');
		});
	});

	describe("Populate Index", function(){
		it("should create index once JSON file is read.", function(){

		});

		it("should map string keys to the correct objects in the JSON array.", function(){

		});
	});

	describe("Search Index", function(){
		it("should return an array of indices that matches search query", function(){

		});
	});
// });


