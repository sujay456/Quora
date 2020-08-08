
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
    $('body').removeClass('original');
    $('body').addClass('transparent-Black');
    $('main').addClass('maintransparent-Black');
    $('#header-container').addClass('Headertransparent-Black');
    
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
   

    $('main').removeClass('maintransparent-Black');
    $('#header-container').removeClass('Headertransparent-Black');

    e.stopPropagation();
    $('body').addClass('original');
    $('body').removeClass('transparent-Black');  

});


// For the question submission

