var hangmanGame = {
	// object of all available words in the game
	availableWords: {
		pikachu: {
			picture: 'Pikachu.png',
			hint: 'Also known as the mouse Pokemon.'
		},
		charizard: {
			picture: 'Charizard.png',
			hint: 'A fire and flying Pokemon with a red flame at the tip of its tail.'
		},
		mewtwo: {
			picture: 'Mewtwo.png',
			hint: 'It was created by a scientist after years of horrific gene splicing and DNA engineering experiments.'
		}
	},

	// variables to set up the inital game
	wordInPlay: null,
	lettersOfTheWord: [],
	matchedLetters: [],
	guessedLetters: [],
	guessesLeft: 0,
	lettersGuessed: null,
	wins: 0,

	// this function sets up the game on load
	setUpGame: function() {
    
    var objKeys = Object.keys(this.availableWords);
    this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];
    var wordHint = this.availableWords[this.wordInPlay]
    this.lettersOfTheWord = this.wordInPlay.split("");
    this.rebuildWordView();
    this.processUpdateTotalGuesses();

    document.querySelector('#hint').innerHTML = wordHint.hint;

  },
  
  // This function runs whenever a letter is guessed
  updatePage: function(letter) {
    if (this.guessesLeft === 0) {
      this.restartGame();
    } else {
      // check and handle incorrect guesses
      this.updateGuesses(letter);
      // check and handle correct guesses
      this.updateMatchedLetters(letter);
      // rebuild the view of the word
      this.rebuildWordView();

      if (this.updateWins() === true) {
        this.restartGame()
      }
    }
  },

  // This function handles incorrect guesses
  updateGuesses: function(letter) {
    if((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {
      // Add letter to guessed letter array
      this.guessedLetters.push(letter);
      // Decrease guess by 1
      this.guessesLeft--;
      // Update guesses remaining and remaining letter
      document.querySelector('#guesses-remaining').innerHTML = this.guessesLeft;
      document.querySelector('#guessed-letters').innerHTML = this.guessedLetters.join(", ")
    }
  },

  // This function sets up the user's initial guess
  processUpdateTotalGuesses: function() {
    // User will get more guesses the longer the word is
    this.totalGuesses = this.lettersOfTheWord.length + 5;
    this.guessesLeft = this.totalGuesses;

    // render the guesses left to the page
    document.querySelector('#guesses-remaining').innerHTML = this.guessesLeft;
  },

  // This function handles a successful guess
  updateMatchedLetters: function(letter) {
    // Loop through letters of the chosen word
    for (var i=0; i < this.lettersOfTheWord.length; i++) {
      if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
        this.matchedLetters.push(letter);
      }
    }
  },

  // This function builds the word to guess
  rebuildWordView: function() {
    var wordView = "";

    for (var i=0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
        wordView += this.lettersOfTheWord[i];
      } else {
        wordView += "&nbsp;_&nbsp;";
      }
    }
    document.querySelector('#current-word').innerHTML = wordView;
  },

  // function to restart the game
  restartGame: function() {
    document.querySelector('#guessed-letters').innerHTML = "";
    this.wordInPlay = null,
    this.lettersOfTheWord = [];
    this.matchedLetters= [];
    this.guessedLetters= [];
    this.guessesLeft= 0;
    this.totalGuesses= 0;
    this.lettersGuessed= null;
    this.setUpGame();
    this.rebuildWordView();
  },

  // Function to see if user has won
  updateWins: function() {
    var win;

    if (this.matchedLetters.length === 0) {
      win = false;
    } else {
      win = true
    }
    for (var i =0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
        win = false
      }
    }
    if (win) {
      this.wins = this.wins +1;

      // update wins on page
      document.querySelector('#wins').innerHTML = this.wins;
      // update with image
      document.querySelector('#imageDiv').innerHTML = "<img class='pokemon-image' src='assets/images/" + this.availableWords[this.wordInPlay].picture + " '>";
      return true;
    }
    return false;
  }
};

hangmanGame.setUpGame();

document.onkeyup = function(event) {
  hangmanGame.lettersGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  hangmanGame.updatePage(hangmanGame.lettersGuessed);
}

