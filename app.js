const newQuoteBtn = document.querySelector('.new-quote');
const endpoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';
const spinner = document.querySelector('.spinner');
const twitterBtn = document.querySelector('.twitter');
newQuoteBtn.addEventListener('click', getQuote);




async function getQuote() {
    spinner.classList.remove('hidden');
    newQuoteBtn.disabled = true;
    try {
        const response = await fetch(endpoint)

        if(!response.ok) {
            throw Error(response.statusText);
        }

        const json = await response.json();
        displayQuote(json.message);
        setTweetButton(json.message);

    } catch(err) {
        console.log(err);
        alert('Failerd to fetch new quote');
    } finally {
        newQuoteBtn.disabled = false;
        spinner.classList.add('hidden');
    }
}


function displayQuote(quote) {
    const quoteText = document.querySelector('.quotes__text');
    quoteText.textContent = quote;
}

function setTweetButton(quote) {
    twitterBtn.setAttribute('href', `https://twitter.com/share?text=${quote} - Donald Trump`);
}
