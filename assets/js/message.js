function init() {
  gsap.from(".user", {
    y: -50,
    duration: 0.3,
    stagger: 0.09,
    opacity: 0,
    ease: "Power2.Out",
  });
}

console.log();
let container = $(".main");

container.click(() => {
  console.log("Hello", $(event.target)[0] === $(".cancelMessage")[0]);

  console.log($(event.target), $(".cancelMessage"));

  if ($(event.target)[0] === $(".cancelMessage")[0]) {
    $(document).trigger("click");
  }
  event.stopPropagation();
});

function openChat() {
  let userid = $(event.target).attr("userid");
  console.log("user", userid);
  let user;
  $.ajax({
    type: "get",
    url: `/profile/getforchat?id=${userid}`,
    success: function (data) {
      console.log(data);
      user = data.user;
    },
    error: function (err) {
      console.log(err.responseText);
    },
  }).then(() => {
    $(".chatbox").css("transform", "translateY(-100%)");
    $(".list").css("opacity", "0");

    $(".forWhom")[0].innerText = `Message for ${user.name}`;
    console.log(user);
  });
}

function back() {
  $(".chatbox").css("transform", "translateY(0)");
  $(".list").css("opacity", "1");
}
