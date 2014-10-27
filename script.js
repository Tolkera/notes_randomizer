$(function(){
   //create a random array of options from 0 to 70

    $.fn.toggleText = function(from, to){
        var elem = $(this),
            elemText = elem.text() == from ? to : from;

        return elem.text(elemText);
    };

   var top = 0,
       bottom =  $('.string-wrap').height(),
       step = ($('.string').outerHeight(true))/2,
       number = bottom / step,
       noteArr=[],
       note = $('.note'),
       math = Math,
       timer = $('.timer__select'),
       timerBtn = $('.timer__button'),
       timerActiveClass = 'timer__button--active',
       speed = timer.val()*1000,
       timerId;

   for (var i=0; i<number; i++){
       noteArr.push(top);
       top+=step;
   }

    randomizePositions(noteArr);

    timerBtn.on('click', function(){
        (timerBtn.hasClass(timerActiveClass)) ? finishNotes() : startNotes();
    });

    timer.on('change', function(){
        speed = timer.val()*1000;
        finishNotes();
    });


    function randomizePositions(arr){
        note.each(function(){
            var randomIndex = math.floor(math.random() * 15);
            $(this).css('top', arr[randomIndex])
        });
    }

    function finishNotes(){
        clearInterval(timerId);
        timerId = 0;
        timerBtn.removeClass(timerActiveClass);
        timerBtn.text('Start!');
    }

    function startNotes(){
        timerId = setInterval(function(){
            randomizePositions(noteArr);
        }, speed);
        timerBtn.addClass(timerActiveClass);
        timerBtn.text('Stop!')
    }
});
