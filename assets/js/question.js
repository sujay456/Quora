// const e = require("express");

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

function showOptions(){

    $('.options-for-question').toggleClass('display');

    event.stopPropagation();

}

$(document).click(function(){
   // console.log('clicked');
   $('.options-for-question').addClass('display');
});