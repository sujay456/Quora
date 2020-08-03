
    // 'Technology':false,'Movies':false,'Health':false,'Food':false,'Science':false,'Music':false,'Books':false,'Buisness':false,'Psycology':false,'History':false,'Cooking':false,'Sports':false,'Design':false,'Writing':false,'Economics':false,'Mathematics':false,'Politics':false,'Journalism':false
    // An array to store all the interest 
let interest={};




// function rhat will check the interest
var checkbox=function()
{
    
    // console.log('clicked',event.target);
    $(' .checked',event.target).toggleClass('hide');
    $(event.target).toggleClass('scaledown');
    let int=$(' span',event.target)[0].innerHTML;
    // console.log(int);

    if(interest[int]==undefined)
    {
        interest[int]=true;
    }
    else
    {
        delete interest[int];
    }
    let no_of_interest=Object.keys(interest).length;
    // console.log(no_of_interest);
    let left=4-no_of_interest;
    if(left>0)
    {
        $('#button')[0].innerHTML=`Follow ${left} more topics to continue`;
        $('#button')[0].disabled=true;
    }
    else
    {
        
        $('#button')[0].innerHTML="Next";
        $('#button')[0].disabled=false;
    }    

}


// This function to submit the interests of the user
var SubmitInterest=function()
{
    let form=$('#continue-button form');
    
    form.submit(function(e)
    {
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/interest/save',
            data:interest,
            success:function(data)
            {
                console.log(data);
            },
            error:function(err)
            {
                console.log(err.responseText);
            }
        });

    });
}




// Calling of the functions
SubmitInterest();
