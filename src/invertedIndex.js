/*******************************************
*
*
*		Author: Lawrence Bolutife
*		Implementation File : invertedIndex.js
*		This file is implements the class Index(), required into this
* 	file as a model. invertedIndexMethods.js exports the instance
* 	of the Index() class.
*		Finally this Implementation file is then exported to
*		the program runner : index.js in the root of the application.
*
*
********************************************/

var index = require("./invertedIndexMethods.js");
var implementations = {
	createIndex : function (filePath) {
		index.createIndex(filePath);
	},
	getIndex : function() {
		console.log(index.getIndex());
	}
};
module.exports = implementations;
