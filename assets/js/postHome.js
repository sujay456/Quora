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

$(document).click(function () {
  // console.log('clicked');
  $(".options-for-question").addClass("display");
});

// for transisitioning between  1 and 2
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

  let parentsInput = $(event.target).parentsUntil("div.not-answered");

  let textarea = $(" .input div", $(parentsInput[parentsInput.length - 1]));
  // console.log(textarea)
  htmlLink = $(`<a href=http://${link}>${link}</a>`);

  // console.log(htmlLink[0]);

  textarea[0].append(htmlLink[0]);
  // console.log(textarea[0].innerText);

  $(parents[parents.length - 1]).css("top", "-43px");
}

// for making the bold and italic work

function blue() {
  let parentFar = $(event.target).parentsUntil(".not-answered");
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

function showAnswerTab() {
  // console.log(event);

  let parents = $(event.target).parentsUntil("div#questions-for-you");

  // console.log(parents);

  $(" .textarea-for-answering", $(parents[parents.length - 1])).toggleClass(
    "display"
  );
}

// follow

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

//for submitting the answer

function submit() {
  // console.log(event.target);

  let parents = $(event.target).parentsUntil(".not-answered");
  // console.log(parents);

  let inputForm = $(" .input", $(parents[parents.length - 1]));

  // console.log($(' .textArea',inputForm));
  let answer = $(" .textArea", inputForm)[0];

  if (answer.innerText == "") {
    // console.log('true',answer.innerText);
    // there should be a pop-up that the answer is empty

    // console.log($('.pop-up span'));
    $(".pop-up span")[0].innerText = "Answer can not be blank";
    $(".pop-up").addClass("top");
    setTimeout(function () {
      $(".pop-up").removeClass("top");
    }, 2000);
  } else {
    // console.log(answer.textContent);
    // console.log($(event.target).attr('link'));

    let questionId = $(event.target).attr("id");

    $.ajax({
      type: "post",
      url: $(event.target).attr("link"),
      data: { answer: answer.innerText },
      success: function (data) {
        console.log(data);
        window.location.href = `/question/display?id=${questionId}`;
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

// for liking the answer

function upvoteAnswer() {
  // console.log(event.target);
  let parents = $(event.target).parentsUntil(".controls");
  // event.stopPropagation();
  // console.log('event target',parents);
  let parentLike = $(event.target).parentsUntil(".answer");

  // console.log('buttons',$(' .dislike i',$(parentLike[parentLike.length-1])));

  let dislikeButton = $(" .dislike", $(parentLike[parentLike.length - 1]));
  $(" i,div", $(parents[parents.length - 1])).toggleClass(
    "blue grey animate__bounceIn"
  );
  $(" .outer-cage", $(parents[parents.length - 1])).toggleClass(
    "upanddown initial"
  );

  let id = $(parents[parents.length - 1]).attr("idAnswer");
  // console.log(id);

  $.ajax({
    type: "post",
    url: `/like/create?id=${id}`,
    data: { type: "Answer" },
    success: function (data) {
      console.log(data);
      if (data.removedDislike) {
        dislikeAnswer(dislikeButton);
      }
    },
    error: function (err) {
      console.log(err.responseText);
    },
  });
}

function questionPage() {
  let q_id = $(event.target).attr("questionID");
  window.location.href = `/question/display?id=${q_id}`;
}

/*


*/
