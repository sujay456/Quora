function clearNotification() {
  let tween = gsap.to("li", {
    duration: 1,
    opacity: 0,
    xPercent: 100,
    stagger: 0.1,
  });

  $.ajax({
    type: "get",
    url: "/notification/deleteAll",
    success: function (data) {
      // console.log(data);
    },
    error: function (err) {
      console.log(err.responseText);
    },
  });
  console.log(tween.duration());
  setTimeout(function () {
    // console.log("uff");
    $("li").remove();
  }, (tween.duration() - 0.5) * 1000);
}
