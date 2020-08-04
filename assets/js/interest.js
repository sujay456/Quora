
    // 'Technology':false,'Movies':false,'Health':false,'Food':false,'Science':false,'Music':false,'Books':false,'Buisness':false,'Psycology':false,'History':false,'Cooking':false,'Sports':false,'Design':false,'Writing':false,'Economics':false,'Mathematics':false,'Politics':false,'Journalism':false
    // An array to store all the interest 
let interest={};
let language={};



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
                $('#interest').addClass('moveleft');
                $('#moving-bar').css('width','60%');
                setTimeout(function()
                {
                    $('#interest').remove();
                },100)
                $('#language').removeClass('hide');

            },
            error:function(err)
            {
                console.log(err.responseText);
            }
        });

    });
}

var selectedLang=function()
{
    console.log(event.target.value);
    
    if(language[event.target.value]==undefined)
    {
        language[event.target.value]=true;
    }
    else
    {
        delete language[event.target.value];
    }
    console.log(language);

}

var SubmitLanguage=function()
{
    let form =$('#continue-button-lan form');

    form.submit(function(e)
    {
        // console.log('prevented');
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/language/save',
            data:language,
            success:function(data)
            {
                console.log(data);
                // redirecting
                $('#moving-bar').css({
                    'width':'100%',
                    'backgroundColor':'#0d802a'
                });
            
                setTimeout(function(){
                window.location.href='/user/home';

                },600);
            }
            ,error:function(err)
            {
                console.log(err.responseText);
            }
        });
    });
}




// Calling of the functions
SubmitInterest();
SubmitLanguage();