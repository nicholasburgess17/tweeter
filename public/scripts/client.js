const loadTweets = () => {
  $.ajax("/tweets", { method: "GET" }).then(function (tweets) {
    console.log("Success: ", tweets);
  });
};

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
    const render = createTweetElement(tweets[index]);
    $("#tweets-container").append(render);
  }
};
$(document).ready(() => {
  renderTweets(data);
  $("#target").submit(function (event) {
    event.preventDefault();
    console.log($(this).serialize());
    loadTweets();
  });
});
