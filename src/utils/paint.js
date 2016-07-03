import 'lib/hidpiCanvas';
import $ from 'jquery';

import {BROWSER} from 'utils/helper';

// polyfill 提供了这个方法用来获取设备的 pixel ratio
let getPixelRatio = function(context) {
    let backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;

    return (window.devicePixelRatio || 1) / backingStore;
};

let InitialPaint = function () {
    let last = [];
    let ctx, touchdown, i, color, size, width, height;
    
    // locals
    let body = document.body
        , $canvas = document.querySelector('.paint-canvas')
        , $size = document.querySelector('.paint-game .size')
        , $color = document.querySelector('.paint-game .color')
        , $clear = $('.paint-game .console .clear')
        , $game = document.querySelector('.paint-game');

    // globals
    ctx = $canvas.getContext('2d');
    let ratio = getPixelRatio(ctx);

    width = $canvas.getAttribute('width') * ratio;
    height = $canvas.getAttribute('height') * ratio;

    // get the starting size
    size = 2; //$size.options[$size.selectedIndex].value;
    color = '#3b3b3b'; //$color.options[$color.selectedIndex].value.toLowerCase();

    // typical draw event for desktop
    $canvas.onmousemove = function (e) {
        move(e);
    };

    // $size.addEventListener('change', function (e) {
    //     size = $size.options[$size.selectedIndex].value
    //     touchdown = false
    // }, false)

    // $color.addEventListener('change', function (e) {
    //     color = $color.options[$color.selectedIndex].value.toLowerCase()
    //     touchdown = false
    // }, false)

    $clear.click(function (e) {
        clearScreen()
        touchdown = false
        clearLast()
    })

    window.onmouseup = function (e) {
        touchdown = false
        clearLast()
    };

    window.onmousedown = function (e) {
        touchdown = true;
    };

    // iOS

    // hide the toolbar in iOS
    setTimeout(function () {
        window.scrollTo(0, 1);
    }, 100);

    $canvas.ontouchstart = function (e) {
        touchdown = false
        clearLast()
    }

    // iOS alternative to mouse move
    $canvas.ontouchmove = function (e) {
        move(e);
    };

    function paint(msg) {
        drawCircle(msg.circle, msg.sessionId);
    }

    function message(msg) {

        if (msg.buffer) {
            msg.buffer.forEach(paint);
        }
    };

    function reset(msg) {
        delete last[msg.sessionId];
    }

    function clearScreen() {
        ctx.clearRect(0, 0, width, height);
        if(BROWSER.isAndorid) {             // 刷新 Android 系统的 canvas 元素，以解决 Android 4.0 到 5.0 以下系统的 clearRect 方法，在某一条件下不生效问题。
            $canvas.style.opacity = 0.99;
            setTimeout(function() {
                $canvas.style.opacity = 1;
            }, 1);
        }
    }

    function clearLast() {
        delete last['me']
    }

    function move(e) {

        let x, y

        if (!touchdown && !e.targetTouches) return

        if (touchdown) {
            x = e.clientX + window.scrollX
            y = e.clientY + window.scrollY
        } else {
            x = e.targetTouches[0].clientX
            y = e.targetTouches[0].clientY
        }

        x -= $canvas.offsetLeft;
        y -= $canvas.offsetTop;

        let circle = {
            x: x,
            y: y,
            color: color,
            size: size
        }

        drawCircle(circle)

    };

    function drawCircle(circle, sessionId) {

        sessionId = sessionId || 'me';

        ctx.strokeStyle = circle.color
        ctx.fillStyle = circle.color;
        ctx.lineWidth = circle.size;
        ctx.lineCap = 'round';

        ctx.beginPath()
        if (last[sessionId]) {
            ctx.moveTo(last[sessionId].x, last[sessionId].y)
            ctx.lineTo(circle.x, circle.y)
            ctx.stroke()
        } else {
            ctx.moveTo(circle.x, circle.y);
            ctx.arc(circle.x, circle.y, circle.size / 2, 0, Math.PI * 2, true);
            ctx.fill();
        }
        ctx.closePath();

        last[sessionId] = circle;

    };
};

function preventDrag(e){
    e.preventDefault();
}

/**
 *  prevents dragging the page in iOS
 */
export function preventDraggingPage(endPrevent) {
    let $body = document.querySelector('body');
    if(endPrevent)
        $body.ontouchmove= function(){};
    else
        $body.ontouchmove= preventDrag;
}


export default InitialPaint;