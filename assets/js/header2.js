// console.log('Hello');


var activeOne;
var path=window.location.pathname;    
if(path=='/user/home' || path=='/')
{
    activeOne='#home-tab';
}
else if(path=='/answers')
{
    activeOne='#answer-tab';
}
else if(path=='/notification')
{
    activeOne='#notification';
}


$(`${activeOne}`).addClass('redBorder');
$(`${activeOne} span`).addClass('redFont');

$('#navigation form').click(function(e)
{
    console.log(e);
    
    $.ajax({
        type:'get',
        url:e.currentTarget.attributes[0].value,
        success:function()
        {
            window.location.href=e.currentTarget.attributes[0].value;
        },
        error:function(err)
        {
            console.log(err.responseText);
        }
    });
});


// For the nav bar to appear
$('.profile').click(function(e){

    $(' .nav-bar',this).toggleClass('display');
    e.stopPropagation();
});
// console.log($('main'));
$('.languages').click(function(e){
    $(' .lang-nav-container',this).toggleClass('display');
    e.stopPropagation();

});

$(document).click(function()
{
        $('.nav-bar').addClass('display');
        $('.lang-nav-container').addClass('display');
});

