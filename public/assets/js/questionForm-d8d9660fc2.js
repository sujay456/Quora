function displayForm(){$("#question-form").removeClass("display"),$("#black").removeClass("display"),$("#black").css("opacity","0.8"),event.stopPropagation()}$("#question-form").click((function(o){console.log($("#add"),$(o.target));let e=$("#form-question input")[0].value;$(o.target)[0]==$("#add")[0]?(console.log("ok"),""==e?o.stopPropagation():$.ajax({type:"post",url:"/question/create",data:{question:e},success:function(o){$("#form-question form")[0].reset(),$(".pop-up span")[0].innerText="Question Posted",$(".pop-up").addClass("top green-popup"),setTimeout((function(){$(".pop-up").removeClass("top")}),2e3)},error:function(o){console.log(o.responseText)}})):$(o.target)[0]==$("#cancel")[0]?$("#question-form").addClass("display"):o.stopPropagation()}));