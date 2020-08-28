let navTab= window.location.pathname.split('/');

navTab=navTab[navTab.length-1];

console.log(navTab);
if(navTab=='')
{
    navTab='Answer'
}
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
            window.location.href=`/profile${$(event.target).attr('link')}`
        },
        error:function(err)
        {
            console.log(err.responseText);
        }
    })
})