let navTab = window.location.pathname.split("/");

// console.log(navTab);
navTab = navTab[navTab.length - 1];

// console.log(navTab);
if (navTab == "profile") {
  navTab = "Answer";
}
// console.log(navTab);

$(".tabs").addClass("display");

$(`.${navTab}-container`).removeClass("display");

$(".nav-items").removeClass("redNav Border");
$(`.${navTab}`).addClass("redNav Border");

$(".nav-items").click(function (event) {
  // console.log(event.target, $(event.target).attr("userid"));
  // console.log("hi");

  // console.log(
  //   `/profile${$(event.target).attr("link")}?id=${$(event.target).attr(
  //     "userid"
  //   )}`
  // );
  // return;
  $.ajax({
    type: "get",
    url: `/profile${$(event.target).attr("link")}?id=${$(event.target).attr(
      "userid"
    )}`,
    success: function (data) {
      // console.log("Succesfull");
      window.location.replace(
        `/profile${$(event.target).attr("link")}?id=${$(event.target).attr(
          "userid"
        )}`
      );
    },
    error: function (err) {
      console.log(err.responseText);
    },
  });
});

// optimization related to profile pic
console.log($("#profile-pic"));

function fileSubmit() {
  console.log("File added");
  // console.log(event.target.value);
  $("#black").removeClass("display");
  $("#black").css("opacity", "0.8");

  $(".avatar-preview").removeClass("display");
  var output = document.getElementById("output");

  output.src = URL.createObjectURL(event.target.files[0]);
  console.log(output.src);
  output.onload = function () {
    URL.revokeObjectURL(output.src); // free memory
  };
}
function removePreview() {
  $(".avatar-preview").addClass("display");
}
function submitAvatar() {
  $("#avatarForm").trigger("submit");
}

function showOptionsA() {
  console.log("hi");
  let parents = $(event.target).parentsUntil(".Answer-container");

  $(" .options-for-answer", $(parents[parents.length - 1])).toggleClass(
    "display"
  );
  event.stopPropagation();
}

function deleteAnswer() {
  let a_id = $(event.target).attr("a_id");

  console.log(a_id);

  $.ajax({
    type: "get",
    url: `/answers/delete?a_id=${a_id}`,
    success: function (data) {
      console.log(data);
      $(`#answer-${a_id}`).addClass("animate__animated animate__zoomOut");
      setTimeout(function () {
        $(`#answer-${a_id}`).remove();
      }, 600);
      $(".number_of_answer")[0].innerText =
        parseInt($(".number_of_answer")[0].innerText) - 1 + " Answers";
    },
    error: function (err) {
      console.log(err.responseText);
    },
  });
}

function EditAnswer() {
  let parents = $(event.target).parentsUntil(".Answer-container");

  console.log($(parents[parents.length - 1]));
  $(" .question-answer .answerLink", $(parents[parents.length - 1])).addClass(
    "display"
  );
  //   return;
  $(".Editable-Answer .textarea-for-answering").removeClass("display");

  // console.log();
  const answer = $(event.target).attr("answer");

  $(".Editable-Answer .textarea-for-answering .textArea").append(answer);
  $(".Editable-Answer .textarea-for-answering .footer button").attr(
    "edit",
    "true"
  );
  console.log(
    $(".Editable-Answer .textarea-for-answering .footer button").attr("edit")
  );
}
$(document).click(function () {
  // console.log('clicked');
  // $('.options-for-question').addClass('display');
  $(".options-for-answer").addClass("display");
  $(".avatar-preview").addClass("display");

  //  $('.options-for-comment').addClass('display');
});

function follow() {
  // console.log('hello',event.target);
  let parents = $(event.target).parentsUntil("div.not-answered");

  let button = $(parents[parents.length - 1]);

  // console.log($(' .follow',button));
  let follow = $(" .follow", button)[0];
  // console.log(follow);
  let link = $(follow).attr("link");
  // console.log(link);
  $(" i", $(follow)).toggleClass("blue grey");
  $(" span", $(follow)).toggleClass("blue grey");

  $(" .outer-cage", $(follow)).toggleClass("upanddown initial");
  setTimeout(function () {
    $(" i", $(follow)).css("transform", "scale(1)");
  }, 100);
  $(" i", $(follow)).css("transform", "scale(1.2)");

  //Now there will be a ajax call to store the number of follow to a question

  $.ajax({
    type: "get",
    url: link,
    success: function (data) {
      console.log(data);
    },
    error: function (err) {
      console.log(err.responseText);
    },
  });
}
var self;
function showOptions() {
  self = event.path[2];

  // console.log(self);

  // this is because if anyother options are opened then i want to close that
  $(".options-for-question").addClass("display");

  // this is to toggleclass on the clicked menu
  // console.log('this ran');
  $(" .options-for-question", self).toggleClass("display");

  event.stopPropagation();
}
function show1nav() {
  let parents = $(event.target).parentsUntil("div.controls");
  $(parents[parents.length - 1]).css("top", "0px");
}

function show2nav() {
  let parents = $(event.target).parentsUntil("div.controls");
  // console.log(parents);

  let link = $(" input", $(parents[0]))[0].value;
  // console.log(link);

  // For appending the link to the text area

  let parentsInput = $(event.target).parentsUntil("div.Answer-container");

  let textarea = $(" .input div", $(parentsInput[parentsInput.length - 1]));
  // console.log(textarea)
  htmlLink = $(`<a href=http://${link}>${link}</a>`);

  // console.log(htmlLink[0]);

  textarea[0].append(htmlLink[0]);
  // console.log(textarea[0].innerText);

  $(parents[parents.length - 1]).css("top", "-43px");
}

function blue() {
  let parentFar = $(event.target).parentsUntil(".Answer-container");
  // console.log(parentFar);
  let input = $(" .input div", parentFar[parentFar.length - 1]);
  if ($(event.target).children().length == 0) {
    $(event.target).toggleClass("active");
    let parents = $(event.target).parentsUntil(".primary_controls");
    let inputType = $(" input", parents[0]);

    if (inputType[0].value == "bold") {
      input.toggleClass("bold");
    } else {
      input.toggleClass("italic");
    }
  } else {
    $(" i", $(event.target)).toggleClass("active");
    let inputType = $(" input", $(event.target));

    if (inputType[0].value == "bold") {
      input.toggleClass("bold");
    } else {
      input.toggleClass("italic");
    }
  }
  // let parents=$(event.target).parentsUntil('.primary_controls');

  // console.log(event.target);
}

// For submitting answer
function submit() {
  // console.log(event.target);

  let editable = false;

  editable = $(event.target).attr("edit");
  // console.log(editable);
  let parents = $(event.target).parentsUntil(".Answer-container");
  // console.log(parents);

  let inputForm = $(" .input", $(parents[parents.length - 1]));

  // console.log($(" .textArea", inputForm));
  let answer = $(" .textArea", inputForm)[0];

  // console.log(answer.innerText);
  //   return;
  if (answer.innerText == "") {
    // console.log('true',answer.innerText);
    // there should be a pop-up that the answer is empty

    // console.log($(".pop-up span"));
    $(".pop-up span")[0].innerText = "Answer can not be blank";
    $(".pop-up").addClass("top");
    setTimeout(function () {
      $(".pop-up").removeClass("top");
    }, 2000);
  } else {
    // console.log(answer.textContent);
    // console.log($(event.target).attr('link'));
    // return;
    let questionId = $(event.target).attr("id");

    // console.log("hello ajax", questionId);
    // return;

    $.ajax({
      type: "post",
      url: $(event.target).attr("link"),
      data: { answer: answer.innerText, editable: editable },
      success: function (data) {
        console.log(data);
        $(
          " .question-answer .answerLink",
          $(parents[parents.length - 1])
        ).removeClass("display");
        //   return;
        $(
          " .question-answer .answerLink p",
          $(parents[parents.length - 1])
        )[0].innerText = answer.innerText;
        $(".Editable-Answer .textarea-for-answering").addClass("display");
        $(".pop-up span")[0].innerText = "Answer Edited";
        $(".pop-up").addClass("top green");
        setTimeout(function () {
          $(".pop-up").removeClass("top");
        }, 2000);
        // window.location.href = `/question/display?id=${questionId}`;
      },
      error: function (err) {
        console.log(err);
        $(".pop-up span")[0].innerText = err.responseJSON.message;
        $(".pop-up").addClass("top");
        setTimeout(function () {
          $(".pop-up").removeClass("top");
        }, 2000);
      },
    });
  }
}

function followUser() {
  // console.log("Hi");

  let parent = $(event.target).parentsUntil(".user-desc");
  let followingId = $(event.target).attr("userid");

  // console.log(followingId);
  // console.log(parent);
  if (parent.length == 0) {
    parent = $(event.target);
  }
  // return;
  $.ajax({
    type: "get",
    url: `/profile/follow?id=${followingId}`,
    success: function (data) {
      // console.log(data.message);
      $(" i", $(parent[parent.length - 1])).toggleClass(
        "fa-user-plus fa-user-check"
      );
      $(" .status", $(parent[parent.length - 1]))[0].innerText = data.message;
      $(" .number", $(parent[parent.length - 1]))[0].innerText =
        data.following.follower.length;
    },
    error: function (err) {
      console.log(err);
    },
  });
}

for (let b of $(".answerToQuestion")) {
  if ($(b)[0].offsetHeight < 70) {
    $(b).css("boxShadow", "none");
  }
}
