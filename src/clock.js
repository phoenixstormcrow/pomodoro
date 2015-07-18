/* clock.js */

'use strict';

import hand from './clockHand';
import face from './clockFace';

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
  let w, h, r, O, midnight,
      context = SVG(element.id);

  function initialize () {
    w = element.clientWidth;
    h = element.clientHeight;
    r = Math.min(w, h) / 2 - 10;
    O = [w / 2, h / 2];
    midnight = [O[0], O[1], O[0], O[1] - r];
    context.spof();
  }

  // initialize variables
  SVG.on(window, 'resize', initialize);
  initialize();

  // draw face
  /* eslint no-unused-vars:1 */
  let clockFace = face(context, r, ...O);

  // draw hands -- 3rd arg polygon coords
  let minuteHand = hand(context, HOUR, [O[0] - 0.024 * r, O[1] - 0.02 * r, ...midnight]),
      secondHand = hand(context, MINUTE, [O[0] - 0.0024 * r, O[1] - 0.002 * r, ...midnight]);

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
