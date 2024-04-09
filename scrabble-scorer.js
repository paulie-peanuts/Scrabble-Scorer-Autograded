// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};
const vowelPointStructure = {
   1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'],
   3: ['A', 'E', 'I', 'O', 'U', 'Y']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			// letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         letterPoints += Number(pointValue)
		 }
	  }
	}
	return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   word = input.question("Let's play some Scrabble!\n\nEnter a word to score: ");
   return word;
}

let simpleScorer = function(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints++;
		 }
	  }
	}
	return letterPoints;
};

let vowelBonusScorer = function(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in vowelPointStructure) {
 
		 if (vowelPointStructure[pointValue].includes(word[i])) {
			letterPoints += Number(pointValue);
		 }
	  }
	}
	return letterPoints;
};
let newPointStructure = transform(oldPointStructure);

// console.log(newPointStructure)
let scrabbleScorer = function(word) {
   // word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const letter in newPointStructure) {
 
		 if (letter == word[i]) {
			// letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         letterPoints += Number(newPointStructure[letter]);
		 }
	  }
	}
	return letterPoints;
};

let firstScorer = {
   name: "Simple Score",
   description: "Each letter is worth 1 pt.",
   scorerFunction: simpleScorer
};

let secondScorer = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

let thirdScorer = {
   name: "Scrabble",
   description: "The tradtional scoring algorithm.",
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [firstScorer, secondScorer, thirdScorer];

function scorerPrompt(array) {
   let scoreChoice = input.question(`What scoring algorithm would you like to use? \n
   0 - Simple: One point per character \n
   1 - Vowel Bonus: Vowels are worth 3 points \n
   2 - Scrable: Uses scrabble point system \n
   Enter 0, 1, or 2: `);
   return scoringAlgorithms[scoreChoice].scorerFunction(array);
}

function transform(oldPointStructure) {
   let newObject = {};
   for (item in oldPointStructure) {
      let Letters = oldPointStructure[item];
      let PointValue = item;
      for (let i=0; i <Letters.length; i++) {
         newObject[Letters[i].toLowerCase()] = Number(PointValue);
      }
   };
   return newObject;
}



function runProgram() {
   console.log(scorerPrompt(initialPrompt()));
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
