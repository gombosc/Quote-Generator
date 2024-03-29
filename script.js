const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    if (!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API
async function getQuote(){
    // Show Loading
    loading()
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
       const response = await fetch(proxyUrl + apiUrl);
       const data = await response.json();
    //    If AUTHOR is blank add Unknown
       if( data.quoteAuthor === ''){
            authorText.innerText = 'Unknown'
       }else{
           authorText.innerText = data.quoteAuthor;
       }
       if(data.quoteText.length > 120){
           quoteText.classList.add('long-quote');
       }else{
           quoteText.classList.remove('long-quote');
       }
    quoteText.innerText = data.quoteText;
       //    Stop Loader, Show Quote
    complete();
   }     
    catch (error){
        getQuote();
        console.log("No quote", error);
   }
}
// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

// On load
getQuote();
