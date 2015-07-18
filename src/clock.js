/* clock.js */

'use strict';

import hand from './clockHand';

const MINUTE = 60 * 1000,
      HOUR = 60 * MINUTE;

let handle;

function animate (hands, cx, cy) {
  // performance.now() let's us track the time
  // even when tab not visible.
  let start = performance.now();

  function step () {
    hands.forEach(function (h) {
      h.move(start, cx, cy);
    });
    handle = requestAnimationFrame(step);
  }

  handle = requestAnimationFrame(step);
}

function clock (element) {
  let w, h, O, midnight,
      context = SVG(element.id);

  function initialize () {
    w = element.clientWidth;
    h = element.clientHeight;
    O = [w / 2, h / 2];
    midnight = [O[0], O[1], O[0], 0];
    context.spof();
  }

  // initialize variables
  SVG.on(window, 'resize', initialize);
  initialize();

  // draw hands
  let minuteHand = hand(context, HOUR, [O[0] - 6, O[1] - 5, ...midnight]),
      secondHand = hand(context, MINUTE, [O[0] - 2, O[1] - 1, ...midnight]);

  function start () {
    animate([minuteHand, secondHand], ...O);
  }

  function stop () {
    cancelAnimationFrame(handle);
    handle = null;
  }

  // set up events
  context.on('dblclick', function () {
    if (handle) stop();
    else start();
  });

  return {
    context,
    start,
    stop
  };
}

global.clock = clock;
export default clock;
