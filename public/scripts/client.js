//xss prevention 
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
const createTweetElement = (data) => {
  let $tweet = $(`<article>
<header>
  <div class="left">
    <img ${escape(data.user.avatars)} />
    <a>${escape(data.user.name)}</a>
  </div>
  <a class="right">${(data.user.handle)}</a>
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
  $("#target").submit(function (event) {
    event.preventDefault();
    const maxLength = 140;
    const strLength = $(this).find("#tweet-text").val().length;

    if (!strLength) {
      return alert("you must have something to say!");
    } else if (strLength > maxLength) {
      return alert("There are too many characters!");
    } else {
      const tweet = $("#target").serialize();
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: tweet,
      }).then(function (res) {
        loadTweets();
      });
    }
  });
});

//replace alerts with jquery calls that hide or show HTML element

