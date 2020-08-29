let navTab= window.location.pathname.split('/');


console.log(navTab);
navTab=navTab[navTab.length-1];

// console.log(navTab);
if(navTab=='profile')
{
    navTab='Answer'
}
console.log(navTab);

$('.tabs').addClass('display');

$(`.${navTab}-container`).removeClass('display');

$('.nav-items').removeClass('redNav Border');
$(`.${navTab}`).addClass('redNav Border');


$('.nav-items').click(function(event)
{
    console.log(event.target);
    console.log('hi');

    console.log(`/profile${$(event.target).attr('link')}`);
    // return ;
    $.ajax({
        type:'get',
        url:`/profile${$(event.target).attr('link')}`,
        success:function(data)
        {
            console.log('Succesfull');
            window.location.replace(`/profile${$(event.target).attr('link')}`)
            
        },
        error:function(err)
        {
            console.log(err.responseText);
        }
    })
});

function showOptionsA()
{
    console.log('hi');
    $('.options-for-answer').toggleClass('display');
    event.stopPropagation();

}

function deleteAnswer()
{
    let a_id=$(event.target).attr('a_id');
    
    console.log(a_id);

    $.ajax({
        type:'get',
        url:`/answers/delete?a_id=${a_id}`,
        success:function(data)
        {
            console.log(data);
            $('#user-anwser').addClass('animate__animated animate__fadeOut');
            setTimeout(function(){
                $('#user-anwser').remove();
                $('.deleted-answer-message').removeClass('display');
            },600);
           
        },
        error:function(err)
        {
            console.log(err.responseText);
        }    
    });
}

function EditAnswer()
{
    let parents=$(event.target).parentsUntil('#user-anwser');

    // console.log(parents);

    $(parents[parents.length-1]).addClass('display');

    $('.Editable-Answer .textarea-for-answering').removeClass('display');

    // console.log();
    const answer=$(event.target).attr('answer');

    $('.Editable-Answer .textarea-for-answering .textArea').append(answer);
    $('.Editable-Answer .textarea-for-answering .footer button').attr('edit','true');
    console.log($('.Editable-Answer .textarea-for-answering .footer button').attr('edit'));

}
$(document).click(function(){
    // console.log('clicked');
    // $('.options-for-question').addClass('display');
    $('.options-for-answer').addClass('display');
    //  $('.options-for-comment').addClass('display');
 });

 function follow(){
    // console.log('hello',event.target);
    let parents=$(event.target).parentsUntil('div.not-answered');
  
    let button=$(parents[parents.length-1]);

    // console.log($(' .follow',button));
    let follow=$(' .follow',button)[0];
    console.log(follow);
    let link=$(follow).attr('link');
    console.log(link);
    $(' i',$(follow)).toggleClass('blue grey');
    $(' span',$(follow)).toggleClass('blue grey');

    $(' .outer-cage',$(follow)).toggleClass('upanddown initial');
    setTimeout(function(){    
        $(' i',$(follow)).css('transform','scale(1)');
    },100);
    $(' i',$(follow)).css('transform','scale(1.2)');
    
    
    
    //Now there will be a ajax call to store the number of follow to a question 

    $.ajax({
        type:'get',
        url:link,
        success:function(data)
        {
            console.log(data);
        },
        error:function(err)
        {
            console.log(err.responseText);
        }

    });
}
var self;
function showOptions(){

     self=event.path[2];

    // console.log(self);
    
    // this is because if anyother options are opened then i want to close that 
    $('.options-for-question').addClass('display');


    // this is to toggleclass on the clicked menu
    // console.log('this ran');
    $(' .options-for-question',self).toggleClass('display');

    event.stopPropagation();

}