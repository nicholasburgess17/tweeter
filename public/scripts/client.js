// const { loadTweets } = require("./helpers");
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
const createTweetElement = (data) => {
  let $tweet = $(`<article>
<header>
  <div class="left">
    <img src="${escape(data.user.avatars)}" alt="user avatar" />
    <a>${escape(data.user.name)}</a>
  </div>
  <a class="right">${data.user.handle}</a>
</header>
<p>${escape(data.content.text)}</p>
<footer>
  <time class="left">${escape(timeago.format(data.created_at))}</time>
  <div>
    <i class="fa-solid fa-flag"></i>
    <i class="fa-sharp fa-solid fa-repeat"></i>
    <i class="fa-solid fa-heart"></i>
  </div>
</footer>
</article>`);
  return $tweet;
};
const renderTweets = (tweets) => {
  $("#tweets-container").empty();
  for (let index in tweets) {
    const render = createTweetElement(tweets[index]);
    $("#tweets-container").prepend(render);
  }
};
const loadTweets = () => {
  $.ajax("/tweets", { method: "GET" }).then(function (tweets) {
    renderTweets(tweets);
  });
};
$(document).ready(() => {
  //load tweets on page load
  loadTweets();
  //tweet submission
  $("#target").submit(function (event) {
    event.preventDefault();
    const maxLength = 140;
    const strLength = $(this).find("#tweet-text").val().length;
    //error handling for empty or null tweets
    if (!strLength) {
      $("#error-empty").slideDown(function () {
        $("error-empty").css("display", "inline");
      });
      //error handling for tweets that are too long
    } else if (strLength > maxLength) {
      $("#error-over").slideDown(function () {
        $("error-over").css("display", "inline");
      });
      //successful tweet submission
    } else {
      const tweet = $("#target").serialize();
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: tweet,
      }).then(function (res) {
        //remove error messages if they are showing
        $("#error-over").slideUp(function() {
          $("error-over").css("display", "none");
        });
        $("#error-empty").slideUp(function() {
          $("error-empty").css("display", "none");
        });
    //load new tweets after submission
        loadTweets();
        //reset form
        $("#target").each(function() {
          this.reset();
        });
      });
    }
  });
});
