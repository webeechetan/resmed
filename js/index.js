function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}    
    
    /*----------------------------------------------------------------
=======
/*----------------------------------------------------------------
>>>>>>> 05690c9f58f91c38b47316b2864443fbc0ead1a5
                        Initilize tooltip
    ------------------------------------------------------------------ */

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    let background_music;

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
        play_game_start_sound();
        setTimeout(() => {
            background_music = play_background_sound();
        }, 1500);
    });


    /*----------------------------------------------------------------
                        draggabe zone
    ------------------------------------------------------------------ */
    $(".draggable_icon").draggable({
        revert:true,
        start : function(event,ui){
            ui.helper.removeClass('box_icon');
            ui.helper.addClass('drag_start');
            play_drag_sound();
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
            play_drop_sound();
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
        }
        
    });
    if(can_submit){
        return true;
    }
    toastr.warning("<span class='rem-text'>Remember!</span> <br/> 4 mandatory activities denoted with a red highlight must be filled in order to submit.");
    play_error_sound();
    return false;
}


/*----------------------------------------------------------------
                        Sounds Functions 
------------------------------------------------------------------ */



function play_drag_sound(){
    var audio = new Audio('audio/drag.wav');
    audio.play();
}

function play_drop_sound(){
    var audio = new Audio('audio/drop.wav');
    audio.play();
}

function play_winning_sound(){
    var audio = new Audio('audio/winner.wav');
    audio.play();
}

function play_thankyou_sound(){
    var audio = new Audio('audio/thank-you.wav');
    audio.play();   
}

function play_background_sound(option){
    var audio = new Audio('audio/background.mp3');
    audio.play();
    audio.volume = 0.4;
    return audio;
}

function play_error_sound(){
    var audio = new Audio('audio/error.wav');
    audio.play();
}

function play_game_start_sound(){
    var audio = new Audio('audio/game-start.wav');
    audio.play();
}

function play_clapping_sound(){
    var audio = new Audio('audio/clapping.wav');
    audio.play();
}




/*----------------------------------------------------------------
                        Submit shedule 
------------------------------------------------------------------ */
function submit_shedule(){
    /// return if validation fails
    if(!validate()){
         return false;
    }
    let green = 0;
    let yellow = 0;
    let red = 0;
    let activities = [];
    let total_fill_ups = 0;
    let dropped_items = $(".dropped_items");
    dropped_items.each(function(i){
        let task = $(dropped_items[i]).find('img');
        let time = $(dropped_items[i]).parent().find('.timings');
        let slot = {time:time.attr('data-time'),task:task.attr('data-task')};
        activities.push(slot)
    })
    for(x of activities){
        if(x.task != undefined){
            total_fill_ups++;
        }
    }
    for(x of activities){

        // bedtime
        if(x.task == 'bedtime'){
            if(x.time == '9pm'){
                green++;
            }else if(x.time == '8pm' || x.time == '10pm'){
                yellow++;
            }else if(x.time == "6px" || x.time == "7pm" || x.time == "12pm" || x.time == "2am" || x.time == "4am"){
                red++;
            }
        }

        // party
        if(x.task == 'party'){
            if(x.time == '6pm' || x.time == '7pm' || x.time == '8pm'){
                yellow++;
            }else if(x.time == "9pm" || x.time == "10pm" || x.time == "12pm" || x.time == "2am" || x.time == "4am"){
                red++;
            }
        }

        // party
        if(x.task == 'exercise'){
            if(x.time == '6pm' || x.time == '7pm'){
                green++;
            }else if(x.time == '8pm'){
                yellow++;
            }else if(x.time == "9pm" || x.time == "10pm" || x.time == "12pm" || x.time == "2am" || x.time == "4am"){
                red++;
            }
        }

        // tv-OTT
        if(x.task == 'tv-ott'){
            if(x.time == '6pm' || x.time == '7pm'){
                green++;
            }else if(x.time == '8pm'){
                yellow++;
            }else if(x.time == "9pm" || x.time == "10pm" || x.time == "12pm" || x.time == "2am" || x.time == "4am"){
                red++;
            }
        }

        // sleep
        if(x.task == 'sleep'){
            if(x.time == '9pm' || x.time == '10pm'){
                green++;
            }else if(x.time == '8pm'){
                yellow++;
            }else if(x.time=="6pm" || x.time == "7pm" || x.time == "12pm" || x.time == "2am" || x.time == "4am"){
                red++;
            }
        }

        // dinner
        if(x.task == 'dinner'){
            if(x.time == '7pm' || x.time == '8pm'){
                green++;
            }else if(x.time == '8pm'){
                yellow++;
            }else if(x.time=="6pm" || x.time == "9pm" || x.time == "10pm" || x.time == "12pm" || x.time == "2am" || x.time == "4am"){
                red++;
            }
        }

        // tea
        if(x.task == 'tea'){
            if(x.time == '6pm'){
                green++;
            }else if(x.time == '7pm'){
                yellow++;
            }else if(x.time =="8pm" || x.time == "9pm" || x.time == "10pm" || x.time == "12pm" || x.time == "2am" || x.time == "4am"){
                red++;
            }
        }

        // walk
        if(x.task == 'walk'){
            if(x.time == '6pm' || x.time == '8pm'){
                green++;
            }else if(x.time == '7pm' || x.time == '9pm'){
                yellow++;
            }else if(x.time == "10pm" || x.time == "12pm" || x.time == "2am" || x.time == "4am"){
                red++;
            }
        }

    }

    ///Logic Part

    $(".section_three").removeClass('d-none');
    $(".section_two").addClass('d-none');

    if(green==total_fill_ups){
        $(".three_star").removeClass('d-none');
        $(".two_star").addClass('d-none');
        $(".one_star").addClass('d-none');
    }else if(yellow > red || green > red){
        $(".two_star").removeClass('d-none');
        $(".one_star").addClass('d-none');
        $(".one_three").addClass('d-none');
    }else{
        $(".one_star").removeClass('d-none');
        $(".two_star").addClass('d-none');
        $(".three_star").addClass('d-none');
    }

    background_music.pause();
    play_clapping_sound();
}


/*----------------------------------------------------------------
                Handling Subscribe Us Form Submit
------------------------------------------------------------------ */

$("#subscribe_us_form").submit(function(event){
    event.preventDefault();
    $(".subscribe_msg").removeClass('d-none');
    let email = $("#subscribe_email").val();

    //check here if email is exist in your databse or not

    let email_already_exist = true;

    if(email_already_exist){
        $(".subscribe_msg").html('Coupon code already has sended to your email');
    }else{
        $(".subscribe_msg").html('Your 40% coupon has been sended to your email.');
    }

    setTimeout(function(){
        $(".subscribe_msg").hide('slow');
    },3000);
    setTimeout(function(){
        $('#disc-pop').modal('hide');
    },4000);

    play_thankyou_sound();
})


/*----------------------------------------------------------------
                Handling booking  Form Submit
------------------------------------------------------------------ */

$(".main-form").submit(function(event){
    event.preventDefault();
    $("#full_name").val('');
    $("#email").val('');
    $("#contact").val('');
    $(".book_msg").removeClass('d-none')
    $(".book_msg").html('Your 40% coupon has been sended to your email.');
    setTimeout(function(){
        $(".book_msg").hide('slow');   
    },3000)
})


