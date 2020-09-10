// ***********************************To do************************
// 1.diabling the login button and the sign up button

// This function is for submitting the signup form
var signupSubmit = function (form) {
  $(form).submit(function (e) {
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/user/signup",
      data: $(form).serialize(),
      success: function (data) {
        // console.log(data);
        $(form)[0].reset();
        $("#signup-created").removeClass("hide");
        $("#signup-created").addClass("show");
        setTimeout(function () {
          $("#signup-created").removeClass("show");
          $("#signup-created").addClass("hide");
        }, 1800);
      },
      error: function (err) {
        $("#signup-noty").removeClass("hide");
        $("#signup-noty").addClass("show");
        setTimeout(function () {
          $("#signup-noty").removeClass("show");
          $("#signup-noty").addClass("hide");
        }, 1800);
        console.log("error", err.responseText);
      },
    });
  });
};

// Function to add red border to the input if email exists
var CheckingEmail = function () {
  let emailInput = $("#email");

  // console.log(emailInput);

  emailInput.blur(function (e) {
    let email = e.target.value;
    // console.log(email);
    $.ajax({
      type: "post",
      url: "/user/checkemail",
      data: emailInput.serialize(),
      success: function (data) {
        // console.log(data);
        if (data.user) {
          emailInput.addClass("red");
        } else {
          emailInput.removeClass("red");
        }
      },
      error: function (err) {
        console.log("Error", err);
      },
    });
  });
};

// This function for the showing the Sign up form
var ShowSignup = function () {
  // console.log($('#signUp'));

  let SignUpContainer = $("#login-methods"); //This is the container where i will be prepending the sign up form
  let socialAuth = $("#social-auth"); //This for removing Social Auth div

  $("#signUp").click(function (e) {
    e.preventDefault();
    socialAuth.hide();
    let SignUpForm = $(` 
        <div id="signup-form">
            <h5>Sign up</h5>

            <form id="signup-submit" action="/user/signup" method="post">
                <label for="name">First Name</label>
                <input class="small" id="name" type="text" name="name" required>

                <div id="shift"> 
                    <label for="lastName">Last Name</label>
                    <input class="small" id="lastName" type="text" name="lastname" required>
                </div>
    
                <label for="email">Email</label>
                <input id="email" type="email" name="email" required>
                
                <label for="pass">Password</label>
                <input id="pass" type="password" name="password" required>

                
            
            
            <span>By clicking "Sign Up" you indicate that you have read and agree to Quora's <a>Terms of Service</a> and <a href="" >Privacy Policy</a>.</span>
            <a id="socialauthButton" href="" >Cancel</a>
            <input type="submit" value="Sign Up">

            </form>
         </div>
        `);
    SignUpContainer.prepend(SignUpForm);
    // console.log($('#socialauth'));
    CheckingEmail();
    signupSubmit($("#signup-submit"));
    $("#socialauthButton").click(function (e) {
      e.preventDefault();
      $("#signup-form").hide();
      socialAuth.show();
    });
  });
};

var ForResetCheckEmail;
var emailLoginCheck = function () {
  let emailInput = $('#login-form input[type="email"]');
  console.log(emailInput);

  emailInput.blur(function (e) {
    // console.log('blur');
    $.ajax({
      type: "post",
      url: "/user/checkemail",
      data: emailInput.serialize(),
      success: function (data) {
        // console.log(data);
        if (!data.user) {
          ForResetCheckEmail = false;
          $("#warning").removeClass("hide");
        } else {
          ForResetCheckEmail = true;
          $("#warning").addClass("hide");
        }
      },
      error: function (err) {
        console.log("Error", err);
      },
    });
  });
};

function popup(mssg, duration, bckgrndColor) {
  $(".pop-up span")[0].innerText = `${mssg}`;
  $(".pop-up").addClass(`top ${bckgrndColor}`);
  setTimeout(function () {
    $(".pop-up").removeClass(`top ${bckgrndColor}`);
  }, duration);
}

// for resetting the password

function reset() {
  event.preventDefault();
  console.log("Hello reset");
  let emailInput = $('#login-form input[type="email"]');

  if (!emailInput[0].value) {
    let mssg =
      'Please Enter your  email address in the emailbox then click on "Forgot Password" ';
    popup(mssg, 3000, "grey-popup");
  } else if (!ForResetCheckEmail) {
    let mssg = "Please Enter a Valid Email Address";
    popup(mssg, 2000, "grey-popup");
  } else {
    $.ajax({
      type: "get",
      url: `/settings/reset-pass?email=${emailInput[0].value}`,
      success: function (data) {
        let mssg = `Instructions on how to reset your password were sent to ${emailInput[0].value}.`;
        popup(mssg, 3000, "white-popup");
      },
      error: function (err) {
        console.log("Error", err.responseText);
      },
    });
  }
}

// Function calls
ShowSignup();
emailLoginCheck();
