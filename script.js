$(function(){

    var stringWrap = $('.string-wrap'),
        positionTop = 0,
        positionBottom =  stringWrap.height(),
        step = ($('.string').outerHeight(true))/2,
        number = positionBottom / step,
        noteArr=[],
        note = $('.note'),
        math = Math,
        timer = $('#timer__select'),
        numberSelect = $('#number__select'),
        submitBtn = $('.settings__button'),
        submitActiveClass = 'settings__button--active',
        timerId,
        select = $('.select');

   for (var i=0; i<number; i++){
       noteArr.push(positionTop);
       positionTop+=step;
   }

    addNotes();

    submitBtn.on('click', function(){
        (submitBtn.hasClass(submitActiveClass)) ? finishNotesAction() : startNotesAction();
    });

    select.on('change', function(){
        finishNotesAction();
        getSettingsValue($(this));
    });

   function getSettingsValue(select){
        return select.val();
    }

    function addNotes(){
        if(note) {
            note.remove();
        }
        var noteNumber = getSettingsValue(numberSelect);
        stringWrap.each(function(){
            for (var k = 0; k<noteNumber; k++){
                $(this).append($('<div>', {
                    class: 'note note--'+ (k)
                }));
            }
        });
        note = $('.note');
        randomizePositioning(noteArr);
    }

    function randomizePositioning(arr){
        note.each(function(){
            var randomIndex = math.floor(math.random() * 15);
            $(this).css('top', arr[randomIndex])
        });
    }

    function finishNotesAction(){
        clearInterval(timerId);
        timerId = 0;
        submitBtn.removeClass(submitActiveClass);
        submitBtn.text('Start!');
    }

    function startNotesAction(){
        addNotes();
        var speed = getSettingsValue(timer) * 1000;
        timerId = setInterval(function(){
            randomizePositioning(noteArr);
        }, speed);
        submitBtn.addClass(submitActiveClass);
        submitBtn.text('Stop!')
    }
});
