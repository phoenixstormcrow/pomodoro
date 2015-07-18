(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/* clock.js */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _clockHand = require('./clockHand');

var _clockHand2 = _interopRequireDefault(_clockHand);

var _clockFace = require('./clockFace');

var _clockFace2 = _interopRequireDefault(_clockFace);

var MINUTE = 60 * 1000,
    HOUR = 60 * MINUTE;

var handle = undefined;

function animate(hands, cx, cy) {
  // performance.now() let's us track the time
  // even when tab not visible.
  var start = performance.now();

  function step() {
    hands.forEach(function (h) {
      h.move(start, cx, cy);
    });
    handle = requestAnimationFrame(step);
  }

  handle = requestAnimationFrame(step);
}

function clock(element) {
  var w = undefined,
      h = undefined,
      r = undefined,
      O = undefined,
      midnight = undefined,
      context = SVG(element.id);

  function initialize() {
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
  var clockFace = _clockFace2['default'].apply(undefined, [context, r].concat(_toConsumableArray(O)));

  // draw hands -- 3rd arg polygon coords
  var minuteHand = (0, _clockHand2['default'])(context, HOUR, [O[0] - 0.024 * r, O[1] - 0.02 * r].concat(_toConsumableArray(midnight))),
      secondHand = (0, _clockHand2['default'])(context, MINUTE, [O[0] - 0.008 * r, O[1] - 0.004 * r].concat(_toConsumableArray(midnight)));

  function start() {
    animate.apply(undefined, [[minuteHand, secondHand]].concat(_toConsumableArray(O)));
  }

  function stop() {
    cancelAnimationFrame(handle);
    handle = null;
  }

  // set up events
  context.on('dblclick', function () {
    if (handle) stop();else start();
  });

  return {
    context: context,
    start: start,
    stop: stop
  };
}

global.clock = clock;
exports['default'] = clock;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./clockFace":2,"./clockHand":3}],2:[function(require,module,exports){
/* clockFace.js */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var COLOR = '#fc5';

function drawFace(ctx, radius, cx, cy) {
  return ctx.circle().radius(radius).stroke({ width: 2, color: COLOR }).fill('none').translate(cx, cy);;
}

exports['default'] = drawFace;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
/* hand.js
   clock hand logic and drawing
*/

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createHand;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var COLOR = '#fc5';

function polygonStr() {
  // because this is what .polygon takes :|
  var a = [];
  for (var i = 0; i < 6; i += 2) {
    a.push([arguments[i], arguments[i + 1]].join(','));
  }
  return a.join(' ');
}

function drawHand(ctx, coords) {
  return ctx.polygon(polygonStr.apply(undefined, _toConsumableArray(coords))).stroke(COLOR).fill(COLOR);
}

function moveHand(hand, period, startTime, cx, cy) {
  var time = performance.now(),
      delta = (time - startTime) % period,
      angle = delta / period * 360;

  hand.rotate(angle, cx, cy);
}

function createHand(ctx, period, coords) {
  var hand = drawHand(ctx, coords),
      move = moveHand.bind(null, hand, period);
  return { hand: hand, move: move };
}

module.exports = exports['default'];

},{}],4:[function(require,module,exports){
(function (global){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _clock = require('./clock');

var _clock2 = _interopRequireDefault(_clock);

var c = (0, _clock2['default'])(document.getElementById('clock'));

global.clock = c;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./clock":1}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9waG9lbml4L2ZjYy96aXBsaW5lcy9wb21vZG9yby9zcmMvY2xvY2suanMiLCIvaG9tZS9waG9lbml4L2ZjYy96aXBsaW5lcy9wb21vZG9yby9zcmMvY2xvY2tGYWNlLmpzIiwiL2hvbWUvcGhvZW5peC9mY2MvemlwbGluZXMvcG9tb2Rvcm8vc3JjL2Nsb2NrSGFuZC5qcyIsIi9ob21lL3Bob2VuaXgvZmNjL3ppcGxpbmVzL3BvbW9kb3JvL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0VBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozt5QkFFSSxhQUFhOzs7O3lCQUNiLGFBQWE7Ozs7QUFFOUIsSUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDbEIsSUFBSSxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUM7O0FBRXpCLElBQUksTUFBTSxZQUFBLENBQUM7O0FBRVgsU0FBUyxPQUFPLENBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7OztBQUcvQixNQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7O0FBRTlCLFdBQVMsSUFBSSxHQUFJO0FBQ2YsU0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUN6QixPQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDdkIsQ0FBQyxDQUFDO0FBQ0gsVUFBTSxHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ3RDOztBQUVELFFBQU0sR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN0Qzs7QUFFRCxTQUFTLEtBQUssQ0FBRSxPQUFPLEVBQUU7QUFDdkIsTUFBSSxDQUFDLFlBQUE7TUFBRSxDQUFDLFlBQUE7TUFBRSxDQUFDLFlBQUE7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QUFJLEVBQUosSUFBSSxFQUFFLElBQUksRUFBSixJQUFJLEVBQUUsQ0FBQztDQUN2Qjs7Ozs7O0FDbkNELFlBQVksQ0FBQzs7OztxQkFFSyxTQUFTOzs7O0FBRTNCLElBQUksQ0FBQyxHQUFHLHdCQUFNLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7QUFFaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogY2xvY2suanMgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaGFuZCBmcm9tICcuL2Nsb2NrSGFuZCc7XG5pbXBvcnQgZmFjZSBmcm9tICcuL2Nsb2NrRmFjZSc7XG5cbmNvbnN0IE1JTlVURSA9IDYwICogMTAwMCxcbiAgICAgIEhPVVIgPSA2MCAqIE1JTlVURTtcblxubGV0IGhhbmRsZTtcblxuZnVuY3Rpb24gYW5pbWF0ZSAoaGFuZHMsIGN4LCBjeSkge1xuICAvLyBwZXJmb3JtYW5jZS5ub3coKSBsZXQncyB1cyB0cmFjayB0aGUgdGltZVxuICAvLyBldmVuIHdoZW4gdGFiIG5vdCB2aXNpYmxlLlxuICBsZXQgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICBmdW5jdGlvbiBzdGVwICgpIHtcbiAgICBoYW5kcy5mb3JFYWNoKGZ1bmN0aW9uIChoKSB7XG4gICAgICBoLm1vdmUoc3RhcnQsIGN4LCBjeSk7XG4gICAgfSk7XG4gICAgaGFuZGxlID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICB9XG5cbiAgaGFuZGxlID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xufVxuXG5mdW5jdGlvbiBjbG9jayAoZWxlbWVudCkge1xuICBsZXQgdywgaCwgciwgTywgbWlkbmlnaHQsXG4gICAgICBjb250ZXh0ID0gU1ZHKGVsZW1lbnQuaWQpO1xuXG4gIGZ1bmN0aW9uIGluaXRpYWxpemUgKCkge1xuICAgIHcgPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIGggPSBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICByID0gTWF0aC5taW4odywgaCkgLyAyIC0gMTA7XG4gICAgTyA9IFt3IC8gMiwgaCAvIDJdO1xuICAgIG1pZG5pZ2h0ID0gW09bMF0sIE9bMV0sIE9bMF0sIE9bMV0gLSByXTtcbiAgICBjb250ZXh0LnNwb2YoKTtcbiAgfVxuXG4gIC8vIGluaXRpYWxpemUgdmFyaWFibGVzXG4gIFNWRy5vbih3aW5kb3csICdyZXNpemUnLCBpbml0aWFsaXplKTtcbiAgaW5pdGlhbGl6ZSgpO1xuXG4gIC8vIGRyYXcgZmFjZVxuICBsZXQgY2xvY2tGYWNlID0gZmFjZShjb250ZXh0LCByLCAuLi5PKTtcblxuICAvLyBkcmF3IGhhbmRzIC0tIDNyZCBhcmcgcG9seWdvbiBjb29yZHNcbiAgbGV0IG1pbnV0ZUhhbmQgPSBoYW5kKGNvbnRleHQsIEhPVVIsIFtPWzBdIC0gMC4wMjQgKiByLCBPWzFdIC0gMC4wMiAqIHIsIC4uLm1pZG5pZ2h0XSksXG4gICAgICBzZWNvbmRIYW5kID0gaGFuZChjb250ZXh0LCBNSU5VVEUsIFtPWzBdIC0gMC4wMDggKiByLCBPWzFdIC0gMC4wMDQgKiByLCAuLi5taWRuaWdodF0pO1xuXG4gIGZ1bmN0aW9uIHN0YXJ0ICgpIHtcbiAgICBhbmltYXRlKFttaW51dGVIYW5kLCBzZWNvbmRIYW5kXSwgLi4uTyk7XG4gIH1cblxuICBmdW5jdGlvbiBzdG9wICgpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUpO1xuICAgIGhhbmRsZSA9IG51bGw7XG4gIH1cblxuICAvLyBzZXQgdXAgZXZlbnRzXG4gIGNvbnRleHQub24oJ2RibGNsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGlmIChoYW5kbGUpIHN0b3AoKTtcbiAgICBlbHNlIHN0YXJ0KCk7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgY29udGV4dCxcbiAgICBzdGFydCxcbiAgICBzdG9wXG4gIH07XG59XG5cbmdsb2JhbC5jbG9jayA9IGNsb2NrO1xuZXhwb3J0IGRlZmF1bHQgY2xvY2s7XG4iLCIvKiBjbG9ja0ZhY2UuanMgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBDT0xPUiA9ICcjZmM1JztcblxuZnVuY3Rpb24gZHJhd0ZhY2UoY3R4LCByYWRpdXMsIGN4LCBjeSkge1xuICByZXR1cm4gY3R4LmNpcmNsZSgpXG4gICAgLnJhZGl1cyhyYWRpdXMpXG4gICAgLnN0cm9rZSh7d2lkdGg6IDIsIGNvbG9yOiBDT0xPUn0pXG4gICAgLmZpbGwoJ25vbmUnKVxuICAgIC50cmFuc2xhdGUoY3gsIGN5KTs7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRyYXdGYWNlO1xuIiwiLyogaGFuZC5qc1xuICAgY2xvY2sgaGFuZCBsb2dpYyBhbmQgZHJhd2luZ1xuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBDT0xPUiA9ICcjZmM1JztcblxuZnVuY3Rpb24gcG9seWdvblN0ciAoLi4uY29vcmRzKSB7XG4gIC8vIGJlY2F1c2UgdGhpcyBpcyB3aGF0IC5wb2x5Z29uIHRha2VzIDp8XG4gIGxldCBhID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSArPSAyKSB7XG4gICAgYS5wdXNoKFtjb29yZHNbaV0sIGNvb3Jkc1tpICsgMV1dLmpvaW4oJywnKSk7XG4gIH1cbiAgcmV0dXJuIGEuam9pbignICcpO1xufVxuXG5mdW5jdGlvbiBkcmF3SGFuZCAoY3R4LCBjb29yZHMpIHtcbiAgcmV0dXJuIGN0eC5wb2x5Z29uKHBvbHlnb25TdHIoLi4uY29vcmRzKSlcbiAgICAuc3Ryb2tlKENPTE9SKS5maWxsKENPTE9SKTtcbn1cblxuZnVuY3Rpb24gbW92ZUhhbmQgKGhhbmQsIHBlcmlvZCwgc3RhcnRUaW1lLCBjeCwgY3kpIHtcbiAgbGV0IHRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKSxcbiAgICAgIGRlbHRhID0gKHRpbWUgLSBzdGFydFRpbWUpICUgcGVyaW9kLFxuICAgICAgYW5nbGUgPSAoZGVsdGEgLyBwZXJpb2QpICogMzYwO1xuXG4gIGhhbmQucm90YXRlKGFuZ2xlLCBjeCwgY3kpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUhhbmQgKGN0eCwgcGVyaW9kLCBjb29yZHMpIHtcbiAgbGV0IGhhbmQgPSBkcmF3SGFuZChjdHgsIGNvb3JkcyksXG4gICAgICBtb3ZlID0gbW92ZUhhbmQuYmluZChudWxsLCBoYW5kLCBwZXJpb2QpO1xuICByZXR1cm4geyBoYW5kLCBtb3ZlIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBjbG9jayBmcm9tICcuL2Nsb2NrJztcblxubGV0IGMgPSBjbG9jayhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvY2snKSk7XG5cbmdsb2JhbC5jbG9jayA9IGM7XG4iXX0=
