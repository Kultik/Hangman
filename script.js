var superheroes = [
    "batman",
    "superman",
    "wonderwoman",
    "aquaman",
    "arrow",
    "bane",
    "brainiac",
    "catwoman",
    "cyborg",
    "darkseid",
    "deadshot",
    "deathstroke",
    "doomsday",
    "flash",
    "firestorm",
    "greenlantern",
    "zod",
    "joker",
    "nightwing",
    "owlman",
    "penguin",
    "rasalghul",
    "redhood",
    "riddler",
    "robin",
    "sinestro",
    "scarecrow",
    "starfire",
    "shazam",
    "steppenwolf",
    "ultraman",
    "zatanna"
]

//  investigate : to lower case 

let answer = '';
let maxWrong = 7;
let mistakes = 0;
let guessed = [];
let wordStatus = null;


function randomWord() {
    answer = superheroes[Math.floor(Math.random() * superheroes.length)];
    // alert(answer); atm : to check if answer popping off
}

// *** Generate Buttons *** 
// Could be done through HTML, but better, cleaner, one-timer on script => DRY Coding

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => // Split : to split by nothing the letters. Map/letter = for representing each and everyone of the loots items in the array we just created from the variable ABC. Closing tag on L52(after first letter) capital to press letters
        `<button class="btn btn-lg btn-warning m-2" id="` + letter + `" onClick="handleGuess('` + letter + `')">
        ` + letter + ` 
    </button>
    `).join(''); // .join to get rid of comas between buttons
    document.getElementById("keyboard").innerHTML = buttonsHTML; // call keyboard div
}

// *** Handle the Guess *** HANDLE IT WELL
function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null; // we disabled the buttons when clicked once, cannot be duplicated
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    // alert(answer);

    if (answer.indexOf(chosenLetter) >= 0) { // is answer is >= 0 meaning that it does exist
        guessedWord(); // runs the function to update the letters
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++; // if answer = -1 (so doesn't exist) then mistakes + 1 
        updateMistakes(); //ATM: mistakes count over maxWrong, we need to check for losses
        checkIfGameLost();
        // Inserting changes for picture
        updateHangmanPicture()
    }
}

// *** HANGMAN PICTURE ***
function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = "./images/" + mistakes + '.png';
}

//*** Check if game WON ***
function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = 'Yeh Won!';
    }
}

//*** Check if game LOST ***
function checkIfGameLost() {
    if (mistakes === maxWrong) {
        // adding guessed word when player lost
        document.getElementById('wordSpotLight').innerHTML = `The answer was ${answer}, ha haa haaa`;
        document.getElementById('keyboard').innerHTML = 'You Lost!';
    }
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : "💀")).join(''); // indexOf check if the letter exists in the guessed array that we have guessed previously. If it does exist bigger than 0, pointing to which position it is in. If it doesnt exist equal to 0. + join to erase comas.
    document.getElementById('wordSpotLight').innerHTML = wordStatus;
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

// *** Reset Button ***
function reset() {
    mistakes = 0;
    guessed = [''];
    document.getElementById('hangmanPic').src = './images/0.png';

    randomWord(); // generate a new random word when reset
    guessedWord(); // reset the guessed word so all underscore
    updateMistakes(); // update mistakes because we made mistakes variable 0 here above, but that doesn't mean its gonna be updated in the HTML (this is not react, view js etc)
    generateButtons(); // generate kb buttons so there is no disabled button on kb
}

document.getElementById("maxWrong").innerHTML = maxWrong;

randomWord(); // calling the function 
generateButtons();
guessedWord();