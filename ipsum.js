// Create our IpsumGenerator function
var IpsumGenerator = function(){};

// Master method that gets called to generate the ipsum based on a set
// of words and a desired word count.
IpsumGenerator.prototype.generateIpsum = function(words, wordCount) {
  this.wordList = [];
  this.sentences = [];
  this.paragraphs = [];
  this.generateWordlist(words, wordCount);
  this.generateSentencesFromWordlist();
  this.generateParagraphsFromSentences();

  // Return the Nietzsche Ipsum
  ipsum = '';
  this.paragraphs.forEach(function(paragraph) {
    ipsum += paragraph.join(' ');
    ipsum += "<br><br>";
  });

  return ipsum;
};

// Creates an array n elements long, where n = wordCount
// Each element is a random word from the set of words given by the user
IpsumGenerator.prototype.generateWordlist = function(words, wordCount) {
  var wordArray = words.split(' ');
  for (i=0; i < wordCount; i++) {
    var randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    this.wordList.push(randomWord);
  }
};

// Split the wordList into sentences that are between 5 and 15 words long
IpsumGenerator.prototype.generateSentencesFromWordlist = function() {
  var cursor = 0;
  while (cursor <= this.wordList.length) {
    var sentence = [];
    var sentenceLength = Math.floor((Math.random() * 10) + 5);
    for (var i = 0; i < sentenceLength; i++) {
      var word = this.wordList[i + cursor];
      if (word !== undefined) {
        sentence.push(word);
      }
    }
    this.sentences.push(sentence);
    cursor += sentenceLength;
  }
};

// Split the sentences into paragraphs that are between 2 and 8 sentences long
// Also format the sentences to be capitalized and end with a period
IpsumGenerator.prototype.generateParagraphsFromSentences = function() {
  var cursor = 0;
  while (cursor <= this.sentences.length) {
    var paragraph = [];
    var paragraphLength = Math.floor((Math.random() * 6) + 2);
    for (var i = 0; i < paragraphLength; i++) {
      var sentence = this.sentences[i + cursor];
      if (sentence !== undefined) {
        sentence = sentence.join(' ') + '.';
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
        sentence[0] = sentence[0].toUpperCase();
        paragraph.push(sentence);
      }
    }
    this.paragraphs.push(paragraph);
    cursor += paragraphLength;
  }

};

// Instantiate the ipsum generator, set up our string, and generate the nietzsche ipsum!
ipsumGen = new IpsumGenerator();
nietzscheWords =  'society joy madness morality snare truth abstract depths faithful grandeur against philosophy ';
nietzscheWords += 'victorious sexuality ultimate pinnacle spirit good evil overcome will strong insofar ';
nietzscheWords += 'selfish intentions gains marvelous noble inexpedient passion chaos of right self oneself ';
nietzscheWords += 'virtues enlightenment ocean superiority sea god dead holiest decrepit deceptions decieve ';
nietzscheWords += 'justice merciful burying ideal law derive endless mountains ultimate convictions ';
nietzscheWords += 'aversion pious faith disgust horror moral prejudice free eternal-return christian ';
nietzscheWords += 'fearful ascetic salvation zarathustra hope value revaluation transvaluation ';
nietzscheWords += 'christianity love hatred war ubermensch play suicide contradict battle reason';

// Generate the ipsum on click
$(function(){

  var generateIpsum = function () {
    ipsum = ipsumGen.generateIpsum(nietzscheWords, $('#num').val());
    ipsum = '<span class="dropcap">' + ipsum.charAt(0) + '</span>' + ipsum.slice(1);
    $('.ipsum-container').html(ipsum);
    $('.ipsum-container').addClass('show');
    $('html, body').animate({
        scrollTop: $(".ipsum-container").offset().top
    }, 600).addClass('show-social-buttons');
  };

  $('#generate').on('click', generateIpsum);
  $('#generate').on('tapstart', generateIpsum);

});

