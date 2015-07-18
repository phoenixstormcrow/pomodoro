/* hand.js
   clock hand logic and drawing
*/

'use strict';

const COLOR = '#fc5';

function polygonStr (...coords) {
  // because this is what .polygon takes :|
  let a = [];
  for (let i = 0; i < 6; i += 2) {
    a.push([coords[i], coords[i + 1]].join(','));
  }
  return a.join(' ');
}

function drawHand (ctx, coords) {
  return ctx.polygon(polygonStr(...coords))
    .stroke(COLOR).fill({color: COLOR, opacity: 0.5});
}

function moveHand (hand, period, startTime, cx, cy) {
  let time = performance.now(),
      delta = (time - startTime) % period,
      angle = (delta / period) * 360;

  hand.rotate(angle, cx, cy);
}


export default function createHand (ctx, period, coords) {
  let hand = drawHand(ctx, coords),
      move = moveHand.bind(null, hand, period);
  return { hand, move };
}
