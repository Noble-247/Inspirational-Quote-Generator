// loading Animation
const spinner = document.querySelector("#js-spinner");

//New Quote button
const newQuoteButton = document.querySelector("#js-new-quote");

//Tweet button
const twitterButton = document.querySelector("#js-tweet");

//API url
const endpoint = "https://api.quotable.io/random";

//Get new quote event
newQuoteButton.addEventListener("click", getQuote);

// Get new quote function/API call
async function getQuote() {
  //remove the hidden class from the spinner
  spinner.classList.remove("hidden");
  //disable the quote button
  newQuoteButton.disabled = true;

  // The `try` block executes the statements within it as usual. If an exception is thrown, the statements defined in the `catch` block will be executed.
  try {
    const response = await fetch(endpoint);
    // if the response is not 200 ok ....

    if (!response.ok) {
      // ...throw an error. This causes control flow
      // to skip to the `catch` block below.
      throw Error(response.statusText);
    }

    const data = await response.json();
    console.log(`${data.content} —${data.author}`);
    displayQuote(
      `${data.content} <br/> <cite style="display:block;margin-top:10px; font-size: 18px;">—${data.author}</cite>`
    );
    setTweetButton(`${data.content} —${data.author}`);
  } catch (err) {
    console.log(err);
    const errorText = document.querySelector("#js-quote-text");
    errorText.textContent = `${err}, Check your internet connectivity;`;
    errorText.style.color = "red";
  } finally {
    //enable the quote button
    newQuoteButton.disabled = false;
    //add the hidden class back again
    spinner.classList.add("hidden");
  }
}

//Function to display quote
function displayQuote(quote) {
  const quoteText = document.querySelector("#js-quote-text");
  quoteText.innerHTML = quote;
}

//function to tweet quotes
function setTweetButton(quote) {
  twitterButton.setAttribute(
    "href",
    `https://twitter.com/share?text=${quote} - Donald Trump`
  );
}

getQuote();
