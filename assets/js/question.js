// const e = require("express");

// const { UpdateComment } = require("../../controller/commentController");

function follow() {
  // console.log('hello',event.target);
  let parents = $(event.target).parentsUntil("div.not-answered");

  let button = $(parents[parents.length - 1]);

  // console.log($(' .follow',button));
  let follow = $(" .follow", button)[0];
  console.log(follow);
  let link = $(follow).attr("link");
  console.log(link);
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

function showOptions() {
  $(".options-for-question").toggleClass("display");

  event.stopPropagation();
}
function showOptionsA() {
  console.log("hi");
  $(".options-for-answer").toggleClass("display");
  event.stopPropagation();
}

$(document).click(function () {
  // console.log('clicked');
  $(".options-for-question").addClass("display");
  $(".options-for-answer").addClass("display");
  $(".options-for-comment").addClass("display");
});
function showAnswerTab() {
  // console.log(event);

  let parents = $(event.target).parentsUntil("div#questions-for-you");

  // console.log(parents);
  $(" .asking_to_answer_container", $(parents[parents.length - 1])).toggleClass(
    "display"
  );
  $(" .textarea-for-answering", $(parents[parents.length - 1])).toggleClass(
    "display"
  );
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

  let parentsInput = $(event.target).parentsUntil("div.not-answered");

  let textarea = $(" .input div", $(parentsInput[parentsInput.length - 1]));
  // console.log(textarea)
  htmlLink = $(`<a href=http://${link}>${link}</a>`);

  // console.log(htmlLink[0]);

  textarea[0].append(htmlLink[0]);
  // console.log(textarea[0].innerText);

  $(parents[parents.length - 1]).css("top", "-43px");
}

function blue() {
  let parentFar = $(event.target).parentsUntil(".not-answered");
  console.log(parentFar);
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
  let parents = $(event.target).parentsUntil(".not-answered");
  // console.log(parents);

  let inputForm = $(" .input", $(parents[parents.length - 1]));

  // console.log($(' .textArea',inputForm));
  let answer = $(" .textArea", inputForm)[0];

  console.log(answer.innerText);
  // return;
  if (answer.innerText == "") {
    // console.log('true',answer.innerText);
    // there should be a pop-up that the answer is empty

    console.log($(".pop-up span"));
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
      data: { answer: answer.innerText, editable: editable },
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

function toggleCommentSectionO() {
  let parents = $(event.target).parentsUntil("#other-user-answer");
  $(" .comments-container", $(parents[parents.length - 1])).toggleClass(
    "display"
  );
}

function toggleCommentSection() {
  let parents = $(event.target).parentsUntil("#question-container");

  // console.log(parents);

  $(" .comments-container", $(parents[parents.length - 1])).toggleClass(
    "display"
  );
}

function showOptionsComment() {
  console.log("Hello");
  let parents = $(event.target).parentsUntil(".comments-container");

  // console.log(parents);

  $(" .options-for-comment", $(parents[parents.length - 1])).toggleClass(
    "display"
  );
  event.stopPropagation();
}
function commentDomUser(comment, showTime) {
  return $(`
            <div class="comment animate__animated animate__fadeIn" id="comment-${
              comment._id
            }">

                <img src="${comment.user.avatar}" alt="" height="40px">
                <a href="/profile?id=${comment.user._id}">
                <span class="bold">${comment.user.name}</span>
              </a>
                <small>${showTime}</small>
                <p class="content">${comment.comment}</p>
                <div class="update-container display">
                    <input type="text" value="${
                      comment.comment
                    }" name="updatedComment" required>
                    <div class="button">
                        <button onclick="hideUpdateContainer();" class="cancel">Cancel</button>
                        <button class="update" onclick="EditComment();" c_id=${
                          comment._id
                        } >Update</button>
                    </div>
                </div>
                <div class="controls">
                    <button class="upvote" onclick="upvoteComment();" idComment="${
                      comment._id
                    }">
                            <i class="far fa-thumbs-up fa-lg grey first"></i>
                            <div class="number_of_like">
                                <div class="outer-cage initial">
                                    <div class="grey">${
                                      comment.like.length
                                    }</div>
                                    <div class="grey">${
                                      comment.like.length + 1
                                    }</div>
                                </div>
                            </div>
                    </button>
                    <i class="fas fa-ellipsis-h fa-lg more" onclick="showOptionsComment();" ></i>
                </div>
                
                <div class="options-for-comment background-white animate__animated animate__pulse animate__faster display" >
                    <div class="style" onclick="DeleteComment();" a_id="${
                      comment.answer
                    }" c_id="${comment._id}">
                        <span a_id="${comment.answer}" c_id="${
    comment._id
  }">Delete Comment</span>
                    </div>
                    
                    <div class="style" onclick="hideUpdateContainer()">
                        <span>Edit Comment</span>
                    </div>
                </div>
                
    
            </div>
`);
}

function calcTime(c) {
  let showTime;
  let currentDate = new Date();
  let date = new Date(c.createdAt);
  if (currentDate.getFullYear() - date.getFullYear() != 0) {
    showTime = currentDate.getFullYear() - date.getFullYear() + " year ago";
  } else if (currentDate.getMonth() - date.getMonth() != 0) {
    showTime = currentDate.getMonth() - date.getMonth() + " month ago";
  } else if (currentDate.getDate() - date.getDate() != 0) {
    showTime = currentDate.getDate() - date.getDate() + " day ago";
  } else if (currentDate.getHours() - date.getHours() != 0) {
    showTime = currentDate.getHours() - date.getHours() + " hour ago";
  } else {
    showTime = currentDate.getMinutes() - date.getMinutes() + " minutes ago";
  }

  return showTime;
}
// for submitting the comment
function commentSubmitUser() {
  // console.log(event.target);

  let parents = $(event.target).parentsUntil("#user-anwser");
  console.log(parents);

  // return;

  let comment = $(" input", $(parents[parents.length - 1]))[0].value;
  // console.log(comment);
  if (comment == "") {
    $(".pop-up span")[0].innerText = "Comment can not be blank";
    $(".pop-up").addClass("top");
    setTimeout(function () {
      $(".pop-up").removeClass("top");
    }, 2000);

    return;
  }
  $(" .comments-container", $(parents[parents.length - 1])).removeClass(
    "display"
  );

  let id_answer = $(" input", $(parents[parents.length - 1])).attr("id");
  // console.log(id_answer);

  $.ajax({
    type: "post",
    url: `/comment/create?id=${id_answer}`,
    data: { comment: comment },
    success: function (data) {
      console.log(data);
      $(" input", $(parents[parents.length - 1]))[0].value = "";
      // console.log(data.data.comment);
      let showTimes = calcTime(data.data.comment);
      let commentDoms = commentDomUser(data.data.comment, showTimes);

      $(" .comments-container", $(parents[parents.length - 1])).prepend(
        commentDoms
      );
    },
    error: function (err) {
      console.log(err.responseText);
    },
  });
}

function commentSubmitOther() {
  let parents = $(event.target).parentsUntil(".answers_another_user");

  // console.log(parents);

  let comment = $(" input", $(parents[parents.length - 1]))[0].value;
  // console.log(comment);

  // return;
  if (comment == "") {
    $(".pop-up span")[0].innerText = "Comment can not be blank";
    $(".pop-up").addClass("top");
    setTimeout(function () {
      $(".pop-up").removeClass("top");
    }, 2000);

    return;
  }
  $(" .comments-container", $(parents[parents.length - 1])).removeClass(
    "display"
  );

  let id_answer = $(" input", $(parents[parents.length - 1])).attr("id");

  // console.log(id_answer);

  $.ajax({
    type: "post",
    url: `/comment/create?id=${id_answer}`,
    data: { comment: comment },
    success: function (data) {
      console.log(data);
      $(" input", $(parents[parents.length - 1]))[0].value = "";
      console.log(data.data.comment);
      let showTimes = calcTime(data.data.comment);
      let commentDoms = commentDomUser(data.data.comment, showTimes);

      $(" .comments-container", $(parents[parents.length - 1])).prepend(
        commentDoms
      );
    },
    error: function (err) {
      console.log(err.responseText);
    },
  });
}

function dislikeComment(button) {
  $(" i,div", button).toggleClass("grey red animate__bounceIn");
}
function dislikeAnswer(button) {
  $(" .down,div", button).toggleClass("grey red animate__bounceIn");
}

function like(button) {
  $(" i,div", button).toggleClass("blue grey animate__bounceIn");
  $(" .outer-cage", button).toggleClass("upanddown initial");
}

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

function upvoteComment() {
  // console.log('hi',event.target);

  let parents = $(event.target).parentsUntil(".controls");

  // console.log(parents);

  let parentLike = $(event.target).parentsUntil(".comment");

  // console.log($(' .dislike i',$(parentLike[parentLike.length-1])));

  let dislikeButton = $(" .dislike", $(parentLike[parentLike.length - 1]));

  $(" i,div", $(parents[parents.length - 1])).toggleClass(
    "blue grey animate__bounceIn"
  );
  $(" .outer-cage", $(parents[parents.length - 1])).toggleClass(
    "upanddown initial"
  );

  let id = $(parents[parents.length - 1]).attr("idComment");
  // console.log(id);

  $.ajax({
    type: "post",
    url: `/like/create?id=${id}`,
    data: { type: "Comment" },
    success: function (data) {
      if (data.removedDislike) {
        // dislikeButton.trigger('click');
        dislikeComment(dislikeButton);
      }
      console.log(data);
    },
    error: function (err) {
      console.log(err.responseText);
    },
  });
}

// for downvoting the question
function downvoteAnswer() {
  // console.log(event.target);

  let parents = $(event.target).parentsUntil("span");

  // console.log(parents);

  let parentLike = $(event.target).parentsUntil(".answer");

  // console.log($(' .like i',$(parentLike[parentLike.length-1])));

  let likeButton = $(" .like", $(parentLike[parentLike.length - 1]));
  $(" .down,div", $(parents[parents.length - 1])).toggleClass(
    "grey red animate__bounceIn"
  );

  let id = $(parents[parents.length - 1]).attr("idAnswer");

  // console.log(id);

  $.ajax({
    type: "post",
    url: `/dislike/toggle?id=${id}`,
    data: { type: "Answer" },
    success: function (data) {
      console.log(data);

      if (data.removedLike) {
        // console.log('hi');
        // likeButton.trigger('click');
        like(likeButton);
      }
    },
    error: function (err) {
      console.log("Error");
    },
  });
}

function downvoteComment() {
  let parents = $(event.target).parentsUntil(".controls");

  let parentLike = $(event.target).parentsUntil(".comment");

  // console.log(parents);
  // console.log($(' .like i',$(parentLike[parentLike.length-1])));

  let likeButton = $(" .like", $(parentLike[parentLike.length - 1]));
  $(" i,div", $(parents[parents.length - 1])).toggleClass(
    "grey red animate__bounceIn"
  );

  let id = $(parents[parents.length - 1]).attr("idComment");
  // console.log(id);

  $.ajax({
    type: "post",
    url: `/dislike/toggle?id=${id}`,
    data: { type: "Comment" },
    success: function (data) {
      console.log(data);
      if (data.removedLike) {
        // console.log('hi',likeButton);
        // likeButton.trigger('click');
        like(likeButton);
      }
    },
    error: function (err) {
      console.log(err.responseText);
    },
  });
}

// Are you sure you wish to delete this answer? This action can be undone.

// Are you sure you want to delete this comment?

function DeleteComment() {
  let CommentDomParent = $(event.target).parentsUntil(".comments-container");

  // let CommentDom=$(' .comment',$(CommentDomParent[CommentDomParent-1]));

  console.log(CommentDomParent);

  let a_id = $(event.target).attr("a_id");
  let c_id = $(event.target).attr("c_id");

  console.log(a_id, c_id);
  // return;
  $.ajax({
    type: "get",
    url: `/comment/delete?a_id=${a_id}&c_id=${c_id}`,
    success: function (data) {
      console.log(data);
      $(`#comment-${c_id}`).addClass("animate__animated animate__zoomOut");
      setTimeout(function () {
        $(`#comment-${c_id}`).remove();
      }, 600);
    },
    error: function (err) {
      console.log(err.responseText);
    },
  });
}

function deleteAnswer() {
  let a_id = $(event.target).attr("a_id");

  console.log(a_id);

  $.ajax({
    type: "get",
    url: `/answers/delete?a_id=${a_id}`,
    success: function (data) {
      console.log(data);
      $("#user-anwser").addClass("animate__animated animate__fadeOut");
      setTimeout(function () {
        $("#user-anwser").remove();
        $(".deleted-answer-message").removeClass("display");
      }, 600);
    },
    error: function (err) {
      console.log(err.responseText);
    },
  });
}

function EditAnswer() {
  let parents = $(event.target).parentsUntil("#user-anwser");

  // console.log(parents);

  $(parents[parents.length - 1]).addClass("display");

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
function hideUpdateContainer() {
  let parent = $(event.target).parentsUntil(".comments-container");

  $(" .content", $(parent[parent.length - 1])).toggleClass("display");
  $(" .update-container", $(parent[parent.length - 1])).toggleClass("display");
}
function EditComment() {
  let parent = $(event.target).parentsUntil(".comments-container");

  let updateComment = $(
    " .update-container input",
    parent[parent.length - 1]
  )[0].value;
  console.log(updateComment);

  let id = $(event.target).attr("c_id");

  console.log(id);
  // return;
  $.ajax({
    type: "post",
    url: `/comment/update?id=${id}`,
    data: { editedComment: updateComment },
    success: function (data) {
      $(" .content", $(parent[parent.length - 1])).removeClass("display");
      $(" .content", $(parent[parent.length - 1]))[0].innerText = updateComment;
      $(" .update-container", $(parent[parent.length - 1])).addClass("display");
      console.log(data);
    },
    error: function (err) {
      console.log(err.responseText);
    },
  });
}
