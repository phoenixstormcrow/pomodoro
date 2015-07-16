/* clock.js */

'use strict';

const minColor = '#fc5',
    secColor = '#fc5',
    min = 60 * 1000,
    hr = 60 * min;

let startTime, elapsedTime;

function polygonStr(...args) {
  let a = [];
  for (let i = 0; i < 6; i += 2) {
    a.push([args[i], args[i+1]].join(','));
  }
  return a.join(' ');
}

function secondHand (ctx, coords) {
  return ctx.line(...coords).stroke(secColor);
}

function minuteHand (ctx, coords) {
  return ctx.polygon(polygonStr(...coords))
    .stroke(minColor).fill(minColor);
}

function animateSecond (elem, cx, cy) {
  elem.animate(min, '-')
    .rotate(360, cx, cy)
    .during(function (pos) {
      elapsedTime = Date.now() - startTime;
      if (pos === 1) {
        console.log(elapsedTime / 1000);
      }
    })
    .loop();
}

function clock(element) {
  let w = element.clientWidth,
      h = element.clientHeight,
      O = [w/2, h/2],
      midnight = [O[0], O[1] + 10, O[0], 0];

  // create an svg child node
  let context = SVG('clock').spof();
  SVG.on(window, 'resize', function () { context.spof(); });

  // draw hands
  let minute = minuteHand(context, [O[0] - 6, O[1] - 5, ...midnight]);
  let second = secondHand(context, midnight);

  // set up events
  context.click(function (evt) {
    console.log(evt.clientX, evt.clientY);
  });

  return {
    svg: context,
    start () {
      startTime = Date.now();
      animateSecond(second, ...O);
      minute.animate(hr, '-').rotate(360, ...O).loop();
    }
  };
}

global.ps = polygonStr;
global.clock = clock;
export default clock;
