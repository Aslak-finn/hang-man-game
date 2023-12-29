// henter HTML elementene
const korekt_Svar_Teks = document.querySelector('[data-korekt_svar_teks]')
const guess_From_Player_Input = document.querySelector('[data-guess-from-player]')
const user_Input_Guess = document.querySelector('[data-bruker-input-forsøk]')

// liste for feil svar 
const data_List_Of_Wrong_Leters= document.querySelector('[data-list-of-wrong-leters]')

// variabel liste med ord 
const words = ["monitor", "program", "application", "keyboard", "javascript", "gaming", "network"];
  // arrays for riktig og feil svar
  let trueArray = [];
  let falseArray = [];



// variabel som tar variablen words og bruker Math som er en inne byggd objekt som kan gjøre matematiske beregninger.
//  så .floor som runder ned tallet til den nærmeste hele tall foreksempel hvis variabelen er 4,6 så vil .floor runde det ned til 4.
//  så er det Math.random som velger en tilfeldig verdi mellom 0 og words.length
//  words.length teller opp "lengden " av array-en som vil si at hvis array-en har 10 verdier med at man teller konvensjonelt så vi det si at det er 9 siden en array starter fra 0 istede for 1  
const random = Math.floor(Math.random() * words.length);
console.log(random, words[random]);

// tar det valgt ordet som er i en array og gjør den om til en streng men å ta words[random] og bruker den inde byggde funksjonen toString
const arrayToString = words[random].toString();
console.log("array to string: ",arrayToString)


const lengdeOrd = arrayToString.length;
console.log("lengde ord: ",lengdeOrd)



// funkjson til å sjekke om inputen fra brukeren er lik med det korekte ordet
function chekLetterCorect (){
    // henter det riktige ordet 
    const corectWord = arrayToString;
    // tar inputen fra brukeren og konverterer den til små bokstaver  (hva vil .value si? er det bare et flag du setter på for å si at dette er en verdi)
    const userInput = guess_From_Player_Input.value.toLowerCase();


        // sjekker om brukerens input er enkeltbokstav eller et helt ord
        if (userInput.length === 1) {
            // hvis det er enkeltbokstav så vil inputen bli sjekket opp mot corectWord med includes som vil is at hvis inpuen er en verdi som er i corectWord
            if (corectWord.includes(userInput)) {
                // hvis den stemmer så legges inputen inn i en array som hetter trueArray
                trueArray.push(userInput);
            } // hvis den ikke stemmer så legges den inputverdien inn i en array som brukes til å vise forsøk som ikke var korekt
            else {
                falseArray.push(userInput);
            }
        } // hvis inputen er lenger enn 1 og bruker input er lik corectword så 
        else if (userInput.length > 1 && userInput === corectWord) {
            // hvis ordene er like så deles ordet opp til induviduelle bokstaver og legges til i array-en trueArray
            trueArray = userInput.split('');
        }// hvis ordene ikke er like så skal det leges til i array-en falseArray
         else {
            falseArray.push(userInput);
        }

    
    // fjerner verdiene i input feltet
    guess_From_Player_Input.value = "";

    // en funksjon som oppdaterer array-ene 
    updateArrays();
    // trigrer funksjoinen som oppdaterer rett ord hvis ikke den er der så vil den ikke opdaternår det er en rett bokstav
    generateUnderline();

    gameChecker();

    winner();

}

// funsjon som brukes til å oppdatere dataene i array-ene
function updateArrays() {
    // legg til svare inn i listen med innertHTML inn i en ol tart array-en falseArray og bruker .map til å lage en li med hver verdi i array-en og .join til å ta helle map og resultatet og lager den/de til en en streng som blir lagt inn i listen 
    data_List_Of_Wrong_Leters.innerHTML = "<ol>" + falseArray.map(item => `<li>${item}</li>`).join("") + "</ol>";
  }

// her er en eventlistner som over ser hendelser på siden og kjører de relevante funksjoene
user_Input_Guess.addEventListener('submit', e => {
    e.preventDefault(); // her blir de som er defult funksjonder i html "skrud av som enter til å starte siden på nytt"
    chekLetterCorect(); // kaller på funksjonen som sjekker og bhandler input fra bruker
  });

// Funksjon for å generere understreker i korrekt svar
function generateUnderline() {
    // lagger en tom string som resultatet av korekt inputten fra brukeren legges til 
    let string = "";

    // en for løkke som går gjenom hver tegn i det korekte ordet, der char tar verdien fra stringen arrayToString hvis ikke skal understreken beholdes
    for (let char of arrayToString) {
        // hvis verdien fra trueArray er i strengen char så
        if (trueArray.includes(char)) {
            // hvis bokstaven er i char, så legges bokstaven til i strengen der resulltatet er lagret
            string += char;
        }
        // hvis den ikke er lik så skal det behodes en understrek, den er det for at der bokstaven ikke matcher så skal det være en understrek for å vise hvor den rette bokstaven er i ordet
        else {
            string += "_";
        }
    }
    console.log("Generert streng:", string);
    // oppdaterer h1 baser på oppbygingen av string som vil si at den viser helle ordet men der som ikke bokstaven er rett så vises en understrek i sted
    korekt_Svar_Teks.innerHTML = "<h1>" + string + "</h1>";

}

generateUnderline();


function gameChecker(){
    let antallFeilForsøk = falseArray.length;
    console.log("antallfeilforsøk",antallFeilForsøk)
    if(antallFeilForsøk >= 7 && (confirm("game over klik ok for å starte spilet på nytt"))){
        document.getElementById("guessFromPlayer").disabled = true;
            location.reload();
    }else{

    }
}

gameChecker();




function winner(){
    // lagger en tom string som resultatet av de korekte inputten fra brukeren skal legges inn i 
    //uten understrek for å kunne regne ut lengden på de korekte bokstaven brukeren har skrevet
    let stringWinner = "";
    
    // en for løkke som går gjenom hver tegn i det korekte ordet, der par tar verdien fra stringen arrayToString og
    // legger de på rekke 
    for (let par of arrayToString) {
        // hvis verdien fra trueArray er i strengen par så legges de til i variabelen
        if (trueArray.includes(par)) {
            // hvis bokstaven er i par, så legges bokstaven til i strengen der resulltatet er lagret 
            // foreksempel hvis ordet er book og brukern ha gjettet b og k så er verdien til variablen bk
            stringWinner += par;
        }
        
    }    
    // variable som sta verdien fra for løkken ovenfor og teller opp hvor mange bokstaver det er i variablen stringWinner
    const lengdeWinner = stringWinner.length;

    // if stat ment som samen ligner antall bokstaver med det brukern har skrevet inn
    // opp mot lengde ord som har verdien av ordet som er valgt
    if (lengdeWinner === lengdeOrd)
    // en timer eller time out som gjør det som i navnet utsetter mesage boxen 
    // sånn at den siste bokstaven som bruker skriver inn kan bli vis og så kommer mesage boksen
    setTimeout(function () {
            if (confirm("Winner du har vunnet gratulerer klikk på ok for å spile på nytt")){
                document.getElementById("guessFromPlayer").disabled = true;
                location.reload();
            }
        }, 100);
        
    console.log("Generert streng winner:", stringWinner);
    console.log("lengde Winner : ",lengdeWinner)
}

winner();































// user_Input_Guess .addEventListener('submit', e =>{
//     e.preventDefault()
//     const guessFromUserInput = guess_From_Player_Input.value
//     if(guessFromUserInput == null || guessFromUserInput === '') return
//     // const list_of_Input = createList(guessFromUserInput)
//     // guess_From_Player_Input.value = null
//     // list_of_Inputs.push(list_of_Input)
// } )

// empty arra
    // const inputArray = [];
    // // get the input elements
    // const getInput = document.getElementById("guessFromPlayer");
    // // Get the values of the input elements
    // const valueInput = getInput.value;

    // const checking_letter = valueInput.search(list_of_Input);

    
    // let text = "";
    // let i;
    // for (i = 0;i)
    // document.getElementById("list-of-wrong-leters").innerHTML = getInput;

    // console.log(getInput)
    // let checking_letter = arrayToString.search(/guess_From_Player_Input/)
    
    // if () {

    // }
    // else() {

    // }
    // if wrong then list"array" of wrong guess name: feil_Svar   document.getElementById("data_List_Of_Wrong_Leters").innerHTML = feil_Svar; https://www.w3schools.com/js/tryit.asp?filename=tryjs_form_action
    // const checking_letter = text.search(list_of_Input);
    
    


// let list_of_Inputs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY))|| []


// function corectAnser () {
//  korektSvarTeks.innerText = `ja`    
// }

// ta inputen fra gjet ordet og sjekke den opp mot det korekte ordet 
// hvis corect then mesage alert corect an

// https://www.w3schools.com/js/js_string_methods.asp
// https://www.w3schools.com/js/js_string_search.asp 

// først velg et tilfeldig ord fra variabelen words done
// dele opp ordet til induviduelle bokstaver 
// 
// 
// 
// 