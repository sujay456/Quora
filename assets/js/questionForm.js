
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
    $('main').addClass('transparent-Black');
    $('#header-container').addClass('transparent-Black');
    
    event.stopPropagation();
}


// This is stopPro so that if this is clicked document should be get  clicked
$('#question-form').click(function(e){
    
    e.stopPropagation();
});

$(document).click(function(e){
    // console.log('document clicked');
    $('#question-form').addClass('display');
    $('main').removeClass('transparent-Black');
    $('#header-container').removeClass('transparent-Black');

    e.stopPropagation();
    $('body').addClass('original');
    $('body').removeClass('transparent-Black');  

});