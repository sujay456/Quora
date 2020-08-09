var self;
function showOptions(){

     self=event.path[2];

    // console.log(self);
    
    // this is because if anyother options are opened then i want to close that 
    $('.options-for-question').addClass('display');


    // this is to toggleclass on the clicked menu
    $(' .options-for-question',self).toggleClass('display');

    event.stopPropagation();

}

$(document).click(function(){
    // console.log('clicked');
    $('.options-for-question').addClass('display');
});


// for transisitioning between  1 and 2
function show1nav(){

  
    let parents=$(event.target).parentsUntil('div.controls');
    $(parents[parents.length-1]).css('top','0px');

}

function show2nav()
{
    
    
    let parents=$(event.target).parentsUntil('div.controls');

    $(parents[parents.length-1]).css('top','-43px');
}

// for making the bold and italic work

function blue()
{
    $(event.target).toggleClass('active');
}




function showAnswerTab()
{
    console.log(event);

    let parents=$(event.target).parentsUntil('div#questions-for-you');

    console.log(parents);

    $(' .textarea-for-answering',$(parents[parents.length-1])).toggleClass('display');
    
}