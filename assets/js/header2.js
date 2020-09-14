// console.log('Hello');

var activeOne;
var path = window.location.pathname;
if (path == "/user/home" || path == "/") {
  activeOne = ".home-tab";
} else if (path == "/answers") {
  activeOne = ".answer-tab";
} else if (path == "/notification") {
  activeOne = ".notification";
}

$(`${activeOne}`).addClass("redBorder");
$(`${activeOne} span`).addClass("redFont");

$("#navigation form").click(function (e) {
  console.log(e);

  $.ajax({
    type: "get",
    url: e.currentTarget.attributes[0].value,
    success: function () {
      window.location.href = e.currentTarget.attributes[0].value;
    },
    error: function (err) {
      console.log(err.responseText);
    },
  });
});

// For the nav bar to appear
$(".profile").click(function (e) {
  console.log("hello");
  console.log(e.target);
  $(" .nav-bar", this).toggleClass("display");
  $(".lang-nav-container").addClass("display");

  e.stopPropagation();
});

// console.log($('main'));
$(".languages").click(function (e) {
  $(" .lang-nav-container", this).toggleClass("display");
  $(".nav-bar").addClass("display");

  e.stopPropagation();
});

$(".nav-bar").click(function (e) {
  e.stopPropagation();
});
$(".lang-nav-container").click(function (e) {
  e.stopPropagation();
});

$(document).click(function () {
  // console.log('document Clicked');
  $(".nav-bar").addClass("display");
  $(".lang-nav-container").addClass("display");
  $("#test").removeClass("moveX");
  $("#test").addClass("initialX");
  $(".messageBox-container").css("visibility", "hidden");
});

function show() {
  console.log("hi");
  $("#test").toggleClass("moveX");
  $("#test").toggleClass("initialX");
  event.stopPropagation();
}

function profilepage() {
  console.log("Hi profile clicked", event.target);

  window.location.href = `/profile?id=${$(event.target).attr("userid")}`;
}
// just a small bug regarding the test div
window.addEventListener("resize", function () {
  // console.log(window.innerWidth);

  if (window.innerWidth > 1000) {
    $("#test").addClass("display");
  } else {
    $("#test").removeClass("display");
  }
});

function message() {
  $(".messageBox-container").css("visibility", "visible");
  init();
  $("#black").removeClass("display");
  $("#black").css("opacity", "0.8");
}
