function getTokens (documents, props) {
    var tokens = [];
    for (var i in documents) {
        var doc = documents[i];
        for (var j = 0; j < props.length; j++) {
            var prop = props[j];
            if (doc.hasOwnProperty(prop)) {
                var words = doc[prop].split(/[,.\s]+/);
                for (var i = 0; i < words.length; i++){
                    if (tokens.indexOf(words[i]) === -1 && words[i] !== '') {
                        tokens.push(words[i].toLowerCase());
                    }
                }
            }
        }
    }
    return tokens;
}

var count =  0


function stripNonKeyWords(str){
  //   Returns an array of keywords after removing punctuations
  //   TODO: Address question marks and exclamation marks and other possible punctuations
  // TODO: Address character case later.
  return str.toLowerCase().split(/[,.\s]+/g);
}


var hashList = {}

function createIndexHash(wordIndex, token, prop, docIndex) {
  if (wordIndex == -1) {
  }
  else {
        if(!hashList.hasOwnProperty(token)){
          //console.log("yes, i have that property", token);
//           if(hashList[token][prop] == prop) {
            //We know this is repitition of the word in the text string and sholud be appended to appropriate token
            hashList[token] = [];
            hashList[token].push({[prop] : [docIndex, wordIndex]});
          }
          else {
            // We know this is a case where the word exits in another prop.. eg text/title
            hashList[token].push({[prop] : [docIndex, wordIndex]});
          }
//         }
        //hashList[token] =  {index: [[docIndex, wordIndex]], prop: prop};
  }
}


function getTokenIndex(prop, token, doc, docIndex) {
  // Takes in an object and returns the index of a unique word in the object
  var word = token;
  var textString = doc[prop];
  var validKeyWords = stripNonKeyWords(doc[prop]);
  var wordIndex = validKeyWords.indexOf(word);
  createIndexHash(wordIndex, token, prop, docIndex);
} 


function generateIndex (documents, tokens, props) {
  for(var i = 0; i < props.length; i++){
    // Loop through each property
    var eachProp = props[i];
    
   for (var j = 0; j < tokens.length; j++){
     var currentToken = tokens[j];
     // Do something with current token
     
     for (var k = 0; k < documents.length; k++ ){
       var eachDoc = documents[k];
       var docIndex = k;
       // Go throught the list of words 
       try {
        getTokenIndex(eachProp, currentToken, eachDoc, docIndex);
       }
       catch (TypeError) {}
       
     }
   }
  }
//  for(var key in hashList){
//    console.log(key, '<-key', hashList[key])
//  }
//   console.log(tokens);
}




var docs = [
  {
    "title": "Alice Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and a enters a world full of imagination."
  },
  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual a alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
];

var props = ['title', 'text'];
var tokens = getTokens(docs, props);
var index = generateIndex(docs, tokens, props);
console.log(hashList);
