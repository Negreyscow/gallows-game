function createSprite(selector){
    var $el = $(selector);
    var current = 1;
    var last = 9;
    $el.addClass("frame" + current);

    var moveFrame = function(from , to){
        $el.removeClass(from)
           .addClass(to);
           debugger;
    }

    var nextFrame = function(){
        if (hasNext()) moveFrame("frame"+current, "frame"+(++current));
    };

    var hasNext = function(){
        return current + 1 <= last;
    }

    var reset = function(){
        moveFrame("frame"+current, "frame1");
        current = 1;
    }

    var isFinished = function(){
        return !hasNext();
    }

    return {
        nextFrame: nextFrame, reset: reset, isFinished: isFinished
    };
}