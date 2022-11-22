$(document).ready(function() {
  $("#tweet-text").keyup(function(e) {
    const maxLength = 140;
    const strLength = e.target.value.length
    const charRemaining = (maxLength - strLength)
  if (charRemaining < 0) {
    document.querySelector(".counter").classList.add("red-count")
  }else {
    document.querySelector(".counter").classList.remove("red-count")
  }
document.querySelector(".counter").textContent = charRemaining
})
});

//Don't submit but also don't clear...(so don't refresh page?)
