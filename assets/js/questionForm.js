
// $('#main-questions-container').click(function(e){


//     $('#question-form').removeClass('display');
//     $('body').removeClass('original');
//     $('body').addClass('transparent-Black');
//     $('main').addClass('transparent-Black');
//     $('#header-container').addClass('transparent-Black');
    
//     e.stopPropagation();
// });
function displayForm()
{
    $('#question-form').removeClass('display');
    $('#black').removeClass('display');
    $('#black').css('opacity','0.8');
    
   
    
    event.stopPropagation();
}


// This is stopPro so that if this is clicked document should be get  clicked
$('#question-form').click(function(e){
    console.log($('#add'),$(e.target));
    let question=$('#form-question input')[0].value;
    if($(e.target)[0]==$('#add')[0] ){
        console.log('ok');
        if(question=='')
        {
            // to do something bad
            
            e.stopPropagation();
        }
        else
        {
            $.ajax({
                type:'post',
                url:'/question/create',
                data:{question:question},
                success:function(data){
                    $('#form-question form')[0].reset();
                    $('.pop-up span')[0].innerText="Answer Posted";
                    $('.pop-up').addClass('top green-popup');
                    setTimeout(function(){
                    $('.pop-up').removeClass('top');
                    },2000);
                },
                error:function(err)
                {
                    console.log(err.responseText);
                }
            });
        }
    }
    else if( $(e.target)[0]==$('#cancel')[0] )
    {
        $('#question-form').addClass('display');
    }
    else
    {
        e.stopPropagation();
    }
});

$(document).click(function(e){
    // console.log('document clicked');
    $('#question-form').addClass('display');
   
    $('#black').css('opacity','0');
    $('#black').addClass('display');
    

    e.stopPropagation();
    $('body').addClass('original');
    

});


// For the question submission

