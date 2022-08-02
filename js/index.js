$(document).ready(function() {
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
    $(".droppable_icon").droppable({
        accept: ".draggable_icon",
        classes: {
            // "ui-droppable-active": "highlight_droppable",
            "ui-droppable-hover": "dragged_item_hover"
          },
        drop: function( event, ui ) {
            // ui.draggable.draggable({revert:false});
            ui.draggable.draggable({disabled: true});
            let dropped_item = $(this).find(".dropped_items");
            let value = ui.draggable.html();
            dropped_item.html(value);
            ui.draggable.removeClass("box_icon");
            ui.draggable.addClass("dragged_done");
        }
      });
});



function submit_shedule(){
    let marks = 0;
    let min_marks = 40;
    let average_marks = 60;

    let timings = ["06:00","08:00","10:00","12:00"];
    let shedule = [];
    let dropped_items = $(".dropped_items");
    dropped_items.each(function(i){
        shedule.push(dropped_items[i].innerHTML)
    })

    for(x in timings){
        if(timings[x]=="06:00" && shedule[x]=="Wake Up" || shedule[x]=="Exercise"){
            marks = marks + 20;
        }
    }

    if(marks >= 20){
        $(".result_image").attr("src","images/happy.png");
    }else{
        $(".result_image").attr("src","images/sad.jpg");
    }

    
    console.log(marks)
}
// submit_shedule()