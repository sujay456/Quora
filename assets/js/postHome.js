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
})