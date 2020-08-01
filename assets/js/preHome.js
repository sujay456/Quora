
// ***********************************To do************************
// 1.diabling the login button and the sign up button 
var ShowSignup=function()
{
    // console.log($('#signUp'));
    
    let SignUpContainer=$('#login-methods');      //This is the container where i will be prepending the sign up form 
    let socialAuth=$('#social-auth');     //This for removing Social Auth div
    
    
    
    $('#signUp').click(function(e)
    {
        e.preventDefault();
        socialAuth.hide();
        let SignUpForm=$(` 
        <div id="signup-form">
            <h5>Sign up</h5>

            <form action="" method="post">
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
            <a id="socialauth" href="" >Cancel</a>
            <input type="submit" value="Sign Up">

            </form>
         </div>
        `);
        SignUpContainer.prepend(SignUpForm);
        // console.log($('#socialauth'));
        $('#socialauth').click(function(e)
        {
            e.preventDefault();
            $('#signup-form').hide();
            socialAuth.show();

        });
        
    });
    

}



ShowSignup();