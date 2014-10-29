$(function(){

    "use strict";

  var noteRandomizer = (function(){

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
            select = $('.select'),
             randomIndex = 0;


        for (var i=0; i<number; i++){
            noteArr.push(positionTop);
            positionTop+=step;
        }

        var randomizeMethods = {
            addNotes: function(){
                if(note) {
                    note.remove();
                }
                var noteNumber = this.getSettingsValue(numberSelect);
                stringWrap.each(function(){
                    for (var k = 0; k<noteNumber; k++){
                        $(this).append($('<div>', {
                            class: 'note note--'+ (k)
                        }));
                    }
                });
                note = $('.note');
                this.randomizePositioning(noteArr);
            },

            getSettingsValue: function(select){
                return select.val();
            },

            randomizePositioning: function(arr){
                note.each(function(){
                    randomIndex = math.floor(math.random() * 15);
                    $(this).css('top', arr[randomIndex])
                });
            },

            finishNotesAction: function(){
                clearInterval(timerId);
                timerId = 0;
                submitBtn.removeClass(submitActiveClass);
                submitBtn.text('Start!');
            },

            startNotesAction: function(){
                this.addNotes();
                var self = this;
                var speed = this.getSettingsValue(timer) * 1000;
                timerId = setInterval(function(){
                    self.randomizePositioning(noteArr);
                }, speed);
                submitBtn.addClass(submitActiveClass);
                submitBtn.text('Stop!')
            }

        };

        return function() {
            randomizeMethods.addNotes();

            submitBtn.on('click', function(){
                (submitBtn.hasClass(submitActiveClass)) ? randomizeMethods.finishNotesAction() : randomizeMethods.startNotesAction();
            });

            select.on('change', function(){
                randomizeMethods.finishNotesAction();
                randomizeMethods.getSettingsValue($(this));
            });
        }

    })();

    noteRandomizer();
});
