var wordList = ['pikachu', 'bulbasaur', 'squirtle', 'charmander', 'dragonite', 'caterpie', 'meowth', 'psyduck', 'mewtwo', 'articuno', 'zapdos', 'moltres', 'snorlax', 'chansey', 'pidgeotto'];
var chosenWord = "";
var lettersInChosenWord = [];
var numberBlanks = 0;
var blanksAndSuccesses = [];
var wrongGuesses = [];


// Game Counters
var winCounter = 0;
var lossCounter = 0;
var numberGuesses = 10;

// To Start Game
function startGame () {
	numberGuesses = 10;
	chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
	lettersInChosenWord = chosenWord.split("");
	numberBlanks = lettersInChosenWord.length;

	console.log(chosenWord);

	blanksAndSuccesses = [];
	wrongGuesses = [];

	for ( var i = 0; i < numberBlanks; i++) {
		blanksAndSuccesses.push("_");
	}

	console.log(blanksAndSuccesses);

	document.getElementById("guessesLeft").innerHTML = numberGuesses;
	document.getElementById("wordBlanks").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongGuesses.join(" ");
}

// To check all of the comparisons for matches.
function checkLetters(letter) {

	var letterInWord = false; 

	for (var i=0; i<numberBlanks; i++) {
		if(chosenWord[i] == letter) {
			letterInWord = true; 
 		}
	}

	if(letterInWord){
		for (var i=0; i<numberBlanks; i++){
			if(chosenWord[i] == letter) {
				blanksAndSuccesses[i] = letter; 
			}
			console.log(blanksAndSuccesses);
			document.getElementById("wordBlanks").innerHTML = blanksAndSuccesses;
		}

	}
	
	else {
		wrongGuesses.push(letter);
		numberGuesses--; 
	}
}

// Complete a round of the game
function roundComplete() {
	console.log("winCount: " + winCounter +" | lossCount: " + lossCounter + " | numberGuesses: " + numberGuesses);
	document.getElementById("guessesLeft").innerHTML = numberGuesses;
	document.getElementById("wordBlanks").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongGuesses.join(" ");

	if (lettersInChosenWord.toString() == blanksAndSuccesses.toString()) {
		winCounter++;
		

		document.getElementById("winCounter").innerHTML = winCounter
		startGame();
	}
	else if(numberGuesses == 0) {
		lossCounter++;
		alert("You Lose!");

	document.getElementById("lossCounter").innerHTML = lossCounter;
	startGame();
	}
}

// Main process of the game
startGame();

document.onkeyup = function (event) {
	  letterGuessed = event.key.toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();
	console.log(letterGuessed);
}