/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
//Tweet Object
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];
////////////////////////////////////////////////////////////////////////////////////
// create a JavaScript function that will generate the DOM structure for a tweet, given a tweet object.

//create tweet element
const createTweetElement = (data) => {
let $tweet = $(`<article>
<header>
  <div class="left">
    <img ${data.user.avatars} />
    <a>${data.user.name}</a>
  </div>
  <a class="right">${data.user.handle}</a>
</header>
<p>${data.content.text}</p>
<footer>
  <time class="left">${data.created_at}</time>
  <div>
    <i class="fa-solid fa-flag"></i>
    <i class="fa-sharp fa-solid fa-repeat"></i>
    <i class="fa-solid fa-heart"></i>
  </div>
</footer>
</article>`);
return $tweet;
};

//render tweets
const renderTweets = (tweets) => {
  for (let index in tweets) {
    const render = createTweetElement(tweets[index])
  $('#tweets-container').append(render);
  }
}

renderTweets(data);
///////////////////////////////////////////////////////////////////////////////////