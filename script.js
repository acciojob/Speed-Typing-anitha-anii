//your JS code here. If required.
const QUOTE_URL = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById('quoteDisplay');
const timerElement = document.getElementById('timer');
const quoteInput = document.getElementById('quoteInput');
let timer;

quoteInput.addEventListener('input',()=>{
    // fetchedQuote in an array of span;
    const quoteArray = quoteDisplayElement.querySelectorAll('span');

    // spliting the user input characted into an array;
    const userInputChars = quoteInput.value.split('');

    let isCorrect=true;

    quoteArray.forEach((charSpan,index)=>{
        const character = userInputChars[index]; // user input character;
        if(character === null){
            charSpan.classList.remove('correct'); // css
            charSpan.classList.remove('incorrect');
            isCorrect = false;
        } else if(character===charSpan.innerText){
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
            // isCorrect=true;
        } else { // chatacter is there and it's not matching
            charSpan.classList.remove('correct');
            charSpan.classList.add('incorrect');
            isCorrect=false;
        }
    })

    if(quoteArray.length=== userInputChars.length && isCorrect){
        clearInterval(timer);
        setTimeout(renderQuote,3000);
    }
})

function getRandomQuote() {
  return fetch(QUOTE_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderQuote(){
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = "";
    // quoteDisplayElement.innerHTML = quote; //1st method
    quote.split('').forEach(char =>{ // 2nd method
        const characterElement = document.createElement('span');
        characterElement.innerText=char;
        quoteDisplayElement.append(characterElement);
    })
    quoteInput.value = null;
    // once my quote is rendered. -> timer should start;
    startTimerFn();
}

let startTime;

function startTimerFn(){
    timerElement.innerText=0;
    startTime = new Date(); // startTime
    timer=setInterval(()=>{
        timerElement.innerText = Math.floor((new Date() - startTime) / 1000); //1,2,3
    },1000);
}

renderQuote();
// input character === quoteDisplayElement.innerHTML