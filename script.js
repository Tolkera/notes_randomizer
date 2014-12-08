$(function(){

    "use strict";

  var noteRandomizer = (function(){

        var positionTop = 5,
            positionBottom =  75,
            step = 5,
            number = positionBottom / step,
            noteArr = [],
            note,
            math = Math,
            timer = $('#timer__select'),
            numberSelect = $('#number__select'),
            submitBtn = $('.settings__button'),
            submitActiveClass = 'settings__button--active',
            timerId,
            select = $('.select'),
            randomIndex = 0,
            strings = $('.strings');

      for (var i=0; i<number; i++){
            noteArr.push(positionTop);
            positionTop+=step;
        }

        var randomizeMethods = {
            addNotes: function(){
                if(note) {
                    note.remove();
                }
                var stringWrap = $('.string-wrap'),
                    noteNumber = this.getSettingsValue(numberSelect);

                stringWrap.each(function(){
                    var positionY = 60;
                    for (var k = 0; k<noteNumber; k++){
                        $(this).append("<ellipse class='note' cx='" + positionY + "' cy='5'  rx='7' ry='5' fill='#000' />");
                        positionY +=40;
                    }

                });
                strings.html(strings.html()); //need to refresh the html for the svg to re-render
                this.randomizePositioning(noteArr);
            },

            getSettingsValue: function(select){
                return select.val();
            },

            randomizePositioning: function(arr){
                note = $('.note');

                note.each(function(){
                    randomIndex = math.floor(math.random() * 15);
                    $(this).attr('cy', arr[randomIndex])
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