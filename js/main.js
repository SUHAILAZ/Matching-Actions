$(document).ready(function() {
        count= 0;
        right=0;
        wrong=0;
        total=0;
       
        correct_count=0;
        lng  = "eng";
        alpha=[];
       em=["happy","sad","surprised","disgusted","angry","fear"];
  
      
       
        correct=[1,2,3,4,5,6,7,8,9,10];
        $(".game, #home, #score, .time, #questionscreen, #volume_icon, #payment").hide();
       
        function reset(){
        
                count= 0;
                right=0;
                wrong=0;
                total=0;
                amount=0;
                
                $(".game, #home").hide();
                $("#listing_page,#copyright").show();
                $(".game, #home, #score, .time, #questionscreen, #volume_icon").hide();
                $(".time").TimeCircles().destroy();
                $("#right").html(right);
                $("#wrong").html(wrong);
                $("audio").trigger("pause"); 
                $("#articles").empty();
                $(".images").removeClass("btn-success btn-danger").addClass("btn-default").attr('disabled', false);
                $(".images2").removeAttr("style").css("position","relative").removeClass("btn-success btn-danger");
                if (lng=="mal"){ 
                     $("#quesarea center").html("പ്രവർത്തികളെ യോജിപിക്കൽ");
                }else{
                    $("#quesarea center").html("MATCHING ACTIONS");
                }
             
        }
        
       $(".lan").click(function(){
        
            $("#buttonclick").trigger("play");
            lng = $(this).attr("id");
            $(".lan").addClass("btn-danger").css("opacity","0.5");
    	    $(this).removeClass("btn-danger").addClass("btn-success").css("opacity","1");
            if (lng=="mal"){
            
                $("#quesarea center").html("പ്രവർത്തികളെ യോജിപിക്കൽ");
                $("#level1").html("തുടങ്ങുക");
                $("#option1 b").html("");
                 $("#level2").html("ലെവൽ -2");
                $("#option2 b").html("");
                 $("#level3").html("ലെവൽ -3");
                $("#option3 b").html(" ");
                $("#right_span").html("ശരി ");
                $("#wrong_span").html("തെറ്റ് ");
               
                
            }else{
            
                $("#quesarea center").html("MATCHING ACTIONS");
               $("#level1").html("START");
                $("#option1 b").html("");
                 $("#level2").html("LEVEL -2");
                $("#option2 b").html("");
                 $("#level3").html("LEVEL -3");
                $("#option3 b").html("");
                $("#right_span").html("Right");
                $("#wrong_span").html("Wrong");
                
            }
           
        });
        
        function randOrd(){
				return (Math.round(Math.random())-0.5);
  		}
         
        $(".level").click(function(){
             correct_count=0;
             right=0;
             wrong=0;      
             $("#buttonclick").trigger("play");
             levelId = $(this).attr('id');
             order=$(this).data("order");
             $("#listing_page,#copyright").hide();
             $("#home, .time, #volume_icon, #score, #questionscreen").fadeIn();
             $(".time").TimeCircles({time: {Days: {show: false},Hours: {show: false}}}).start();
             $("#container_level"+order).fadeIn();
            
             data=$.getJSON("JSON/"+lng+"/level"+order+".json", function(){
                           quest= data.responseJSON.actions;
                           quest.sort(randOrd);
                                
                           
                             if (order=="1"){
                                        $("#questaudio").attr("src","sounds/"+lng+"/level1.ogg").trigger("play");
                                        questions();  
                                        dragdrop();  
                                           
                             }
               });    
                     
        });
      
        function questions(){
                            if (lng == "eng"){
                                    $("#questionscreen").html("Question- " +(count+3)+"/"+quest.length);
                                     $("#quesarea center").text("Drag and drop to match the actions.");
                             }else{
                                    $("#questionscreen").html("ചോദ്യം- " +(count+3)+"/"+quest.length);
                                     $("#quesarea center").text("ശരിയായ  പ്രവർത്തികളെ  ചിത്രത്തിന് താഴെ വലിച്ചിടുക.");
                             } 
                            descparray=[];
                            $(".drag").removeAttr("style").removeClass("btn-success btn-danger").addClass("btn-info").prev().show();   ;
                            
                            for (i=0; i<3; i++){
                                ans=quest[count].ans;
                                descp=quest[count].descp
                                descparray.push({"descp":descp,"ans":ans});
                                $("#pic"+(i+1)).attr("src","images/level1/"+quest[count].img+".jpg");
                                $("#drop"+(i+1)).attr("data-drop",ans);
                                 count++;
                              } 
                             descparray.sort(randOrd);
                              for(i=0;i<descparray.length;i++){ 
                                $("#act"+(i+1)).html(descparray[i].descp).attr("data-drag",descparray[i].ans);
                                
                              }
                             
        }
        
        function dragdrop(){
                            $(".drag").draggable({revert:"invalid",containment:"#container_level1"});
                             $(".drag").draggable('enable').css("position","relative");
                            $(".drop").droppable({accept:".drag",tolerance:'intersect',drop: function (event, ui) {
                                    
	                                dragvar= ui.draggable.attr("data-drag");
	                                dropvar= $(this).attr("data-drop");
	                                if (dragvar==dropvar){
                                        ui.draggable.removeClass("btn-info").addClass("btn-success").prev().hide();   
                                        right++;
                                        
                                        $("#right").html(right);
                                        $("#correctclip").trigger("play");
                                       
                                        
                                        ui.draggable.position({
			                                my: "center",
			                                at: "center",
			                                of: $(this)
			                              });
                                          ui.draggable.draggable( 'option', 'revert', false ).draggable("disable");       
                                          if(right%3==0){
                                              
                                             $("#correctaudio").attr("src", "sounds/correct" + correct[(correct_count + 1)] + ".ogg").trigger("play");
                                          correct_count++;
                                          }                    
                                                        
                                    }else{
                                        ui.draggable.addClass("btn-danger");
                                        ui.draggable.draggable( 'option', 'revert', true );
                                        setTimeout(function(){
                                             ui.draggable.removeClass("btn-danger");
                                        },500);
                                        wrong++;
                                        $("#wrong").html(wrong);
                                        $("#wrongclip").trigger("play");
                                    }
                                
                            
                            }
                            });

        }
      
     
               
          $('#correctaudio').on('ended', function() {
          
              
                    if (count<quest.length ){
                           
                                questions();  
                                 dragdrop();
                       }else{
                       
                        $("#completed").trigger("play");
           			    $(".time").TimeCircles().stop();
           			    accuracy= Math.round((right/(right+wrong))*100);
           			    alert("LEVEL COMPLETED\n Accuracy-"+accuracy+"%");
           			    reset();
                       
                       }
                        
               
	     });
	  
        $(".option img").click( function(){
                audio=$(this).next().attr("data-drag");
                $("#ansaudio").attr("src","sounds/"+lng+"/"+audio+".ogg").trigger("play");
        
        });
		
		
        $("#volume_icon").click(function(){	
               $("#questaudio").trigger("play");
               
		});
		
  	
       
	
        $("#home").click(function() {
        
                $("#buttonclick").trigger("play");  
                reset();
        });
        
});
