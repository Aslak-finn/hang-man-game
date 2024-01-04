// henter HTML elementene
const korekt_Svar_Teks = document.querySelector('[data-korekt_svar_teks]')
const guess_From_Player_Input = document.querySelector('[data-guess-from-player]')
const user_Input_Guess = document.querySelector('[data-bruker-input-forsøk]')

// liste for feil svar 
const data_List_Of_Wrong_Leters= document.querySelector('[data-list-of-wrong-leters]')

// forsøk igjen 
const forsøk_Igjen = document.querySelector('[data-antall_forsøk_igjen]')

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
const correctWord = words[random].toString();
console.log("array to string: ", correctWord)


const lengdeOrd = correctWord.length;
console.log("lengde ord: ",lengdeOrd)



// funkjson til å sjekke om inputen fra brukeren er lik med det korekte ordet
function chekLetterCorect (){
    // tar inputen fra brukeren og konverterer den til små bokstaver  trim gjør sånn at bruken kan få godkjent bokstaven hvis der er mellomrom i inputen (hva vil .value si? er det bare et flag du setter på for å si at dette er en verdi)
    const userInput = guess_From_Player_Input.value.toLowerCase().trim()
    // denne gjør sånn at innputen ikke blir behandlet hvis detter bare er mellomrom som brukeren prøver å sende inn
    if(!userInput) return;

        // sjekker om brukerens input er enkeltbokstav eller om inputen er akurat lik som det valgte ordet
        if (userInput.length === 1 && correctWord.includes(userInput) || userInput === correctWord) {
            trueArray.push(userInput);
        }
        else {
            falseArray.push(userInput);
        }

    
    // fjerner verdiene i input feltet
    guess_From_Player_Input.value = "";

    // en funksjon som oppdaterer array-ene 
    updateArrays();


}

// funsjon som brukes til å oppdatere dataene i array-ene
function updateArrays() {
    // lagger variabelen som skal ha svaret basert på input fra brukerne 
    let displayedWord = '';
    // en for løkke som sjekker om truearray har bokstaven som er i det rette ordet 
    for (let letter of correctWord){

        if (trueArray.includes(letter)){
            // hvis det er en match så skla letter legges til i displayWord 
            displayedWord += letter + '';
        }
        else{
            // hvis den ikke matcher så skal de bare ha en understrek
            displayedWord += '_ ';
        }
    }

    // legger inn veridene til displayWord som er byggd opp på inputene fra brukerern bygger opp 
    korekt_Svar_Teks.textContent = displayedWord;
    // legg til svare inn i listen med innertHTML inn i en ol tart array-en falseArray og bruker .map til å lage en li med hver verdi i array-en og .join til å ta helle map og resultatet og lager den/de til en en streng som blir lagt inn i listen 
    let stringToDisplay = [];
    falseArray.map((value,index) => {
        stringToDisplay.push(`${index+1}.${value}<br>`)
    })
    data_List_Of_Wrong_Leters.innerHTML = stringToDisplay.join("");
    const antallForsøk = 10;
    forsøk_Igjen.innerHTML = antallForsøk-falseArray.length;

    if(falseArray.length >= antallForsøk){
        alert("game over klik ok for å starte spilet på nytt");
        location.reload();
    }
    if(trueArray.includes(correctWord) || trueArray.length === correctWord.length) {
        alert("Winner du har vunnet gratulerer klikk på ok for å spile på nytt");
        location.reload();
    }


  }



// her er en eventlistner som over ser hendelser på siden og kjører de relevante funksjoene
user_Input_Guess.addEventListener('submit', e => {
    e.preventDefault(); // her blir de som er defult funksjonder i html "skrud av som enter til å starte siden på nytt"
    chekLetterCorect(); // kaller på funksjonen som sjekker og bhandler input fra bruker
  });

updateArrays();
