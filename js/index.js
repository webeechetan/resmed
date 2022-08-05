    /*----------------------------------------------------------------
                        Initilize tooltip
    ------------------------------------------------------------------ */

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

$(document).ready(function() {
    /*----------------------------------------------------------------
                        Hiding section two on page load
    ------------------------------------------------------------------ */
    $(".section_two").addClass('d-none');
    $(".section_three").addClass('d-none');
    


    /*----------------------------------------------------------------
        Hiding section one and showing section two on play btn click
    ------------------------------------------------------------------ */
    $(".play_game_btn").click(function(e){
        $(".section_one").addClass('d-none');
        $(".section_two").removeClass('d-none');
    });


    /*----------------------------------------------------------------
                        draggabe zone
    ------------------------------------------------------------------ */
    $(".draggable_icon").draggable({
        revert:true,
        start : function(event,ui){
            ui.helper.removeClass('box_icon');
            ui.helper.addClass('drag_start');
        },
        stop : function(event,ui){
            ui.helper.removeClass('drag_start');
            ui.helper.addClass('box_icon');
        }
    });



    /*----------------------------------------------------------------
                        droppable zone
    ------------------------------------------------------------------ */
    $(".droppable_icon").droppable({
        accept: ".draggable_icon",
        classes: {
            "ui-droppable-active": "highlight_droppable",
            "ui-droppable-hover": "dragged_item_hover"
          },
        drop: function( event, ui ) {
            ui.draggable.draggable({disabled: true});
            let dropped_item = $(this).find(".dropped_items");
            $(this).find("img").remove();
            $(this).droppable( 'disable' );
            let value = ui.draggable.html();
            ui.draggable.attr('data-submit',"true");
            dropped_item.html(value);
            ui.draggable.removeClass("box_icon required");
            ui.draggable.addClass("dragged_done");
        }
      });
});

/*----------------------------------------------------------------
                        Validation  
------------------------------------------------------------------ */

function validate(){
    let exercises = $(".draggable_icon");
    let can_submit = true;
    let error_list = "";
    exercises.each(function(i){
        let submit = $(exercises[i]).attr('data-submit');
        let task = $(exercises[i]).attr('data-task');
        if(submit=="false" && (task=='bedtime' || task=='sleep' || task == 'dinner' || task=='walk')){
            can_submit = false;
            $(exercises[i]).addClass('required');
            if(i==0){
                error_list += task;
            }else{
                error_list += ", "+task;
            }
        }
        
    });
    error_list += " is required";
    if(can_submit){
        return true;
    }
    toastr.warning(error_list)
    return false;
}


/*----------------------------------------------------------------
                        Submit shedule 
------------------------------------------------------------------ */
function submit_shedule(){
    if(!validate()){
         return false;
    }
    let green = 0;
    let yellow = 0;
    let red = 0;
    let activities = [];
    let dropped_items = $(".dropped_items");
    dropped_items.each(function(i){
        let task = $(dropped_items[i]).find('img');
        let time = $(dropped_items[i]).parent().find('.timings');
        let slot = {time:time.attr('data-time'),task:task.attr('data-task')};
        activities.push(slot)
    })
    
    for(x of activities){

        // bedtime
        if(x.task == 'bedtime'){
            if(x.time == '9pm'){
                green++;
            }else if(x.time == '8pm' || x.time == '10pm'){
                yellow++;
            }else{
                red++;
            }
        }

        // party
        if(x.task == 'party'){
            if(x.time == '6pm' || x.time == '7pm' || x.time == '8pm'){
                yellow++;
            }else{
                red++;
            }
        }

        // party
        if(x.task == 'exercise'){
            if(x.time == '6pm' || x.time == '7pm'){
                green++;
            }else if(x.time == '8pm'){
                yellow++;
            }else{
                red++;
            }
        }

        // tv-OTT
        if(x.task == 'tv-ott'){
            if(x.time == '6pm' || x.time == '7pm'){
                green++;
            }else if(x.time == '8pm'){
                yellow++;
            }else{
                red++;
            }
        }

        // sleep
        if(x.task == 'tv-ott'){
            if(x.time == '9pm' || x.time == '10pm'){
                green++;
            }else if(x.time == '8pm'){
                yellow++;
            }else{
                red++;
            }
        }

        // dinner
        if(x.task == 'dinner'){
            if(x.time == '7pm'){
                green++;
            }else if(x.time == '8pm'){
                yellow++;
            }else{
                red++;
            }
        }

        // tea
        if(x.task == 'tea'){
            if(x.time == '6pm'){
                green++;
            }else if(x.time == '7pm'){
                yellow++;
            }else{
                red++;
            }
        }

        // walk
        if(x.task == 'walk'){
            if(x.time == '6pm' || x.time == '8pm'){
                green++;
            }else if(x.time == '7pm' || x.time == '9pm'){
                yellow++;
            }else{
                red++;
            }
        }

    }

    $(".section_three").removeClass('d-none');
    $(".section_two").addClass('d-none');

    if(green >= 5){
        $(".three_star").removeClass('d-none');
        $(".two_star").addClass('d-none');
        $(".one_star").addClass('d-none');
    }

    if(yellow >= 5){
        $(".two_star").removeClass('d-none');
        $(".one_star").addClass('d-none');
        $(".three_star").addClass('d-none');
    }

    if(yellow == red ){
        $(".two_star").removeClass('d-none');
        $(".one_star").addClass('d-none');
        $(".one_three").addClass('d-none');
    }

    if(red > yellow){
        $(".one_star").removeClass('d-none');
        $(".two_star").addClass('d-none');
        $(".three_star").addClass('d-none');
    }

    if(yellow == 0 && red == 0 && green == 0){
        $(".one_star").removeClass('d-none');
        $(".two_star").addClass('d-none');
        $(".three_star").addClass('d-none');
    }



    console.log('Red '+red);
    console.log('Yellow '+yellow);
    console.log('Green '+green);
    
}




// submit_shedule()