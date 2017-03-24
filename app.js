let fs = require('fs')
let _ = require('lodash')
let sentiment = require('sentiment')
let sentenceSplitter = require('sentence-splitter')

var sentences
var sentenceList
var result = []

fs.readFile('north-and-south.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  sentences = sentenceSplitter.split(data)
  //console.log(JSON.stringify(sentences, null, 4))

//iterate through each sentence in the novel
  _.forEach(sentences, function(value) {
    if (value.type == 'Sentence') {
        //console.log(value)
        var sentimentValue = sentiment(value.raw)
        value.sentiment = sentimentValue       
        //console.log(value)
        result.push(value)
        //console.log(sentimentValue)
    }    
  })

    fs.writeFile('output.txt', JSON.stringify(result, null, 4), function (err) {
            if (err) return console.log(err);
            console.log('worked');
    })

})



