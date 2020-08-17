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
function showOptionsA()
{
    console.log('hi');
    $('.options-for-answer').toggleClass('display');
    event.stopPropagation();

}

$(document).click(function(){
   // console.log('clicked');
   $('.options-for-question').addClass('display');
   $('.options-for-answer').addClass('display');
    $('.options-for-comment').addClass('display');
});
function showAnswerTab()
{
    // console.log(event);

    let parents=$(event.target).parentsUntil('div#questions-for-you');

    // console.log(parents);
    $(' .asking_to_answer_container',$(parents[parents.length-1])).toggleClass('display');
    $(' .textarea-for-answering',$(parents[parents.length-1])).toggleClass('display');
    
}

function show1nav(){

  
    let parents=$(event.target).parentsUntil('div.controls');
    $(parents[parents.length-1]).css('top','0px');

}

function show2nav()
{
    
    
    let parents=$(event.target).parentsUntil('div.controls');
    console.log(parents);

    let link=$(' input',$(parents[0]))[0].value;
    console.log(link);

    // For appending the link to the text area

    let parentsInput=$(event.target).parentsUntil('div.not-answered');

    let textarea=$(' .input div',$(parentsInput[parentsInput.length-1]));
    // console.log(textarea)
    htmlLink=$(`<a href=http://${link}>${link}</a>`);

    // console.log(htmlLink[0]);

    textarea[0].append(htmlLink[0]);
    // console.log(textarea[0].innerText);

    $(parents[parents.length-1]).css('top','-43px');
}

function blue()
{
        let parentFar=$(event.target).parentsUntil('.not-answered');
        console.log(parentFar);
        let input= $(' .input div',parentFar[parentFar.length-1]);
    if($(event.target).children().length==0)
    {
        $(event.target).toggleClass('active');
        let parents=$(event.target).parentsUntil('.primary_controls');
        let inputType=$(' input',parents[0]);
       
        if(inputType[0].value=='bold')
        {
            
            input.toggleClass('bold');
            
        }
        else
        {
            input.toggleClass('italic');
        }
        
    }   
    else
    {
        $(' i',$(event.target)).toggleClass('active');
        let inputType=$(' input',$(event.target));

        

        if(inputType[0].value=='bold')
        {
            
            input.toggleClass('bold');
            
        }
        else
        {
            input.toggleClass('italic');
        }

    }
    // let parents=$(event.target).parentsUntil('.primary_controls');
    
    

    // console.log(event.target);

}

// For submitting answer
function submit(){
    console.log(event.target);

    let parents=$(event.target).parentsUntil('.not-answered');
    console.log(parents);

    let inputForm=$(' .input',$(parents[parents.length-1]));
    
    // console.log($(' .textArea',inputForm));
    let answer=$(' .textArea',inputForm)[0];

    if(answer.innerText=='')
    {
        // console.log('true',answer.innerText);
        // there should be a pop-up that the answer is empty

        console.log($('.pop-up span'));
        $('.pop-up span')[0].innerText="Answer can not be blank";
        $('.pop-up').addClass('top');
        setTimeout(function(){
        $('.pop-up').removeClass('top');
        },2000);
    }
    else
    {
        console.log(answer.textContent);
        console.log($(event.target).attr('link'));

        let questionId=$(event.target).attr('id');

        $.ajax({
            type:'post',
            url:$(event.target).attr('link'),
            data:{answer:answer.innerText},
            success:function(data)
            {
                console.log(data);
                window.location.href=`/question/display?id=${questionId}`
            },
            error:function(err)
            {
                console.log(err);
                $('.pop-up span')[0].innerText=err.responseJSON.message;
                $('.pop-up').addClass('top');
                setTimeout(function(){
                $('.pop-up').removeClass('top');
                },2000);                
            }
        });
    }
}


function toggleCommentSection()
{
    let parents=$(event.target).parentsUntil('#question-container');

    console.log(parents);

    $(' .comments-container',$(parents[parents.length-1])).toggleClass('display');
}

function showOptionsComment()
{
    console.log('Hello');
    let parents=$(event.target).parentsUntil('.comments-container');

    console.log(parents);

    $(' .options-for-comment',$(parents[parents.length-1])).toggleClass('display');
    event.stopPropagation();
}
function commentDomUser(comment,showTime)
{

    return $(`
            <div class="comment animate__animated animate__fadeIn">

                <img src="/uploads/user/avatar/Default.jpg" alt="" width="45px">
                <span class="bold">${comment.user.name}</span>
                <small>${showTime}</small>
                <p>${comment.comment}</p>

                <div class="controls">
                    <button class="upvote" onclick="upvoteComment();" idComment="${comment._id}">
                            <i class="far fa-thumbs-up fa-lg grey first"></i>
                            <div class="number_of_like">
                                <div class="outer-cage initial">
                                    <div class="grey">${comment.like.length}</div>
                                    <div class="grey">${comment.like.length+1}</div>
                                </div>
                            </div>
                    </button>
                </div>
                <i class="fas fa-ellipsis-h fa-lg more" onclick="showOptionsComment();" ></i>
                <div class="options-for-comment background-white animate__animated animate__pulse animate__faster display" >
                    <div class="style">
                        <span>Delete Comment</span>
                    </div>
                    
                    <div class="style">
                        <span>Edit Comment</span>
                    </div>
                </div>
                
    
            </div>
`);
}

function calcTime(c)
{
    let showTime;
    let currentDate=new Date();
    let date=new Date(c.createdAt);
    if(currentDate.getFullYear()-date.getFullYear() !=0)
    { 
        showTime=currentDate.getFullYear() -date.getFullYear() +' year ago' 
    }
    else if(currentDate.getMonth() -date.getMonth() !=0)
    { 
        showTime=currentDate.getMonth() -date.getMonth() +' month ago'; 
    }
    else if( currentDate.getDate()-date.getDate()!=0)
    { 
        showTime=currentDate.getDate()-date.getDate()+' day ago' ;
    }
    else if(currentDate.getHours()-date.getHours()!=0)
    { 
        showTime=currentDate.getHours()-date.getHours()+' hour ago';
    }
    else
    { 
        showTime=currentDate.getMinutes()-date.getMinutes()+' minutes ago'; 
    }

    return showTime;
}
// for submitting the comment
function commentSubmitUser(){
    // console.log(event.target);

    let parents=$(event.target).parentsUntil('#user-anwser' );
    console.log(parents);


    // return;
    
    let comment=$(' input',$(parents[parents.length-1]))[0].value;
    // console.log(comment);
    if(comment=='')
    {
        $('.pop-up span')[0].innerText="Comment can not be blank";
        $('.pop-up').addClass('top');
        setTimeout(function(){
        $('.pop-up').removeClass('top');
        },2000);

        return;
    }
    $(' .comments-container',$(parents[parents.length-1])).removeClass('display');

    let id_answer=$(' input',$(parents[parents.length-1])).attr('id');
    // console.log(id_answer);

    $.ajax({
        type:'post',
        url:`/comment/create?id=${id_answer}`,
        data:{comment:comment},
        success:function(data)
        {
            console.log(data);
            $(' input',$(parents[parents.length-1]))[0].value='';
            console.log(data.data.comment);
            let showTimes=calcTime(data.data.comment);
            let commentDoms= commentDomUser(data.data.comment,showTimes);

            $(' .comments-container',$(parents[parents.length-1])).prepend(commentDoms);

        },
        error:function(err)
        {
            console.log(err.responseText);
        }
    });

}

function commentSubmitOther()
{
    let parents=$(event.target).parentsUntil('.answers_another_user');

    console.log(parents);

    let comment=$(' input',$(parents[parents.length-1]))[0].value;
    console.log(comment);

    // return;
    if(comment=='')
    {
        $('.pop-up span')[0].innerText="Comment can not be blank";
        $('.pop-up').addClass('top');
        setTimeout(function(){
        $('.pop-up').removeClass('top');
        },2000);

        return;
    }
    $(' .comments-container',$(parents[parents.length-1])).removeClass('display');


    let id_answer=$(' input',$(parents[parents.length-1])).attr('id');

    console.log(id_answer);

    $.ajax({
        type:'post',
        url:`/comment/create?id=${id_answer}`,
        data:{comment:comment},
        success:function(data)
        {
            console.log(data);
            $(' input',$(parents[parents.length-1]))[0].value='';
            console.log(data.data.comment);
            let showTimes=calcTime(data.data.comment);
            let commentDoms= commentDomUser(data.data.comment,showTimes);

            $(' .comments-container',$(parents[parents.length-1])).prepend(commentDoms);

        },
        error:function(err)
        {
            console.log(err.responseText);
        }
    });


}


function upvoteAnswer()
{
    console.log(event.target);

    let parents=$(event.target).parentsUntil('.controls');

    console.log(parents);
    $(' i,div',$(parents[parents.length-1])).toggleClass('blue grey');
    $(' .outer-cage',$(parents[parents.length-1])).toggleClass('upanddown initial');

    let id =$(parents[parents.length-1]).attr('idAnswer');
    // console.log(id);/

    $.ajax({
        type:'post',
        url:`/like/create?id=${id}`,
        data:{type:'Answer'},
        success:function(data)
        {
            console.log(data);
        },
        error:function(err)
        {
            console.lof(err.responseText);
        }
    });
}

function upvoteComment()
{
    let parents=$(event.target).parentsUntil('.controls');

    console.log(parents);

    $(' i,div',$(parents[parents.length-1])).toggleClass('blue grey');
    $(' .outer-cage',$(parents[parents.length-1])).toggleClass('upanddown initial');

    let id =$(parents[parents.length-1]).attr('idComment');
    console.log(id);

    $.ajax({
        type:'post',
        url:`/like/create?id=${id}`,
        data:{type:'Comment'},
        success:function(data)
        {
            console.log(data);
        },
        error:function(err)
        {
            console.lof(err.responseText);
        }
    });
}