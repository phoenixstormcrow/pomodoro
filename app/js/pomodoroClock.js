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
  /* eslint no-unused-vars:1 */
  var clockFace = _clockFace2['default'].apply(undefined, [context, r].concat(_toConsumableArray(O)));

  // draw hands -- 3rd arg polygon coords
  var minuteHand = (0, _clockHand2['default'])(context, HOUR, [O[0] - 0.024 * r, O[1] - 0.02 * r].concat(_toConsumableArray(midnight))),
      secondHand = (0, _clockHand2['default'])(context, MINUTE, [O[0] - 0.0024 * r, O[1] - 0.002 * r].concat(_toConsumableArray(midnight)));

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
  var ring = ctx.circle().radius(radius).stroke({ width: 2, color: COLOR }).fill('none').translate(cx, cy);

  for (var d = 0; d < 60; ++d) {
    var _length = d % 5 ? 6 : 12;
    ctx.line(0, 0, 0, _length).move(cx, cy - radius).rotate(d * 6, cx, cy).stroke({ width: 2, color: COLOR });
  }

  return ring;
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
  return ctx.polygon(polygonStr.apply(undefined, _toConsumableArray(coords))).stroke(COLOR).fill({ color: COLOR, opacity: 0.5 });
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9waG9lbml4L2ZjYy96aXBsaW5lcy9wb21vZG9yby9zcmMvY2xvY2suanMiLCIvaG9tZS9waG9lbml4L2ZjYy96aXBsaW5lcy9wb21vZG9yby9zcmMvY2xvY2tGYWNlLmpzIiwiL2hvbWUvcGhvZW5peC9mY2MvemlwbGluZXMvcG9tb2Rvcm8vc3JjL2Nsb2NrSGFuZC5qcyIsIi9ob21lL3Bob2VuaXgvZmNjL3ppcGxpbmVzL3BvbW9kb3JvL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0VBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozt5QkFFSSxhQUFhOzs7O3lCQUNiLGFBQWE7Ozs7QUFFOUIsSUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDbEIsSUFBSSxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUM7O0FBRXpCLElBQUksTUFBTSxZQUFBLENBQUM7O0FBRVgsU0FBUyxPQUFPLENBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7OztBQUcvQixNQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7O0FBRTlCLFdBQVMsSUFBSSxHQUFJO0FBQ2YsU0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUN6QixPQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDdkIsQ0FBQyxDQUFDO0FBQ0gsVUFBTSxHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ3RDOztBQUVELFFBQU0sR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN0Qzs7QUFFRCxTQUFTLEtBQUssQ0FBRSxPQUFPLEVBQUU7QUFDdkIsTUFBSSxDQUFDLFlBQUE7TUFBRSxDQUFDLFlBQUE7TUFBRSxDQUFDLFlBQUE7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QUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUNsRCxNQUFJLElBQUksR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO01BQ3hCLEtBQUssR0FBRyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUEsR0FBSSxNQUFNO01BQ25DLEtBQUssR0FBRyxBQUFDLEtBQUssR0FBRyxNQUFNLEdBQUksR0FBRyxDQUFDOztBQUVuQyxNQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDNUI7O0FBR2MsU0FBUyxVQUFVLENBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDdkQsTUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUM7TUFDNUIsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM3QyxTQUFPLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLENBQUM7Q0FDdkI7Ozs7OztBQ25DRCxZQUFZLENBQUM7Ozs7cUJBRUssU0FBUzs7OztBQUUzQixJQUFJLENBQUMsR0FBRyx3QkFBTSxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O0FBRWhELE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGNsb2NrLmpzICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGhhbmQgZnJvbSAnLi9jbG9ja0hhbmQnO1xuaW1wb3J0IGZhY2UgZnJvbSAnLi9jbG9ja0ZhY2UnO1xuXG5jb25zdCBNSU5VVEUgPSA2MCAqIDEwMDAsXG4gICAgICBIT1VSID0gNjAgKiBNSU5VVEU7XG5cbmxldCBoYW5kbGU7XG5cbmZ1bmN0aW9uIGFuaW1hdGUgKGhhbmRzLCBjeCwgY3kpIHtcbiAgLy8gcGVyZm9ybWFuY2Uubm93KCkgbGV0J3MgdXMgdHJhY2sgdGhlIHRpbWVcbiAgLy8gZXZlbiB3aGVuIHRhYiBub3QgdmlzaWJsZS5cbiAgbGV0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgZnVuY3Rpb24gc3RlcCAoKSB7XG4gICAgaGFuZHMuZm9yRWFjaChmdW5jdGlvbiAoaCkge1xuICAgICAgaC5tb3ZlKHN0YXJ0LCBjeCwgY3kpO1xuICAgIH0pO1xuICAgIGhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgfVxuXG4gIGhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbn1cblxuZnVuY3Rpb24gY2xvY2sgKGVsZW1lbnQpIHtcbiAgbGV0IHcsIGgsIHIsIE8sIG1pZG5pZ2h0LFxuICAgICAgY29udGV4dCA9IFNWRyhlbGVtZW50LmlkKTtcblxuICBmdW5jdGlvbiBpbml0aWFsaXplICgpIHtcbiAgICB3ID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBoID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgciA9IE1hdGgubWluKHcsIGgpIC8gMiAtIDEwO1xuICAgIE8gPSBbdyAvIDIsIGggLyAyXTtcbiAgICBtaWRuaWdodCA9IFtPWzBdLCBPWzFdLCBPWzBdLCBPWzFdIC0gcl07XG4gICAgY29udGV4dC5zcG9mKCk7XG4gIH1cblxuICAvLyBpbml0aWFsaXplIHZhcmlhYmxlc1xuICBTVkcub24od2luZG93LCAncmVzaXplJywgaW5pdGlhbGl6ZSk7XG4gIGluaXRpYWxpemUoKTtcblxuICAvLyBkcmF3IGZhY2VcbiAgLyogZXNsaW50IG5vLXVudXNlZC12YXJzOjEgKi9cbiAgbGV0IGNsb2NrRmFjZSA9IGZhY2UoY29udGV4dCwgciwgLi4uTyk7XG5cbiAgLy8gZHJhdyBoYW5kcyAtLSAzcmQgYXJnIHBvbHlnb24gY29vcmRzXG4gIGxldCBtaW51dGVIYW5kID0gaGFuZChjb250ZXh0LCBIT1VSLCBbT1swXSAtIDAuMDI0ICogciwgT1sxXSAtIDAuMDIgKiByLCAuLi5taWRuaWdodF0pLFxuICAgICAgc2Vjb25kSGFuZCA9IGhhbmQoY29udGV4dCwgTUlOVVRFLCBbT1swXSAtIDAuMDAyNCAqIHIsIE9bMV0gLSAwLjAwMiAqIHIsIC4uLm1pZG5pZ2h0XSk7XG5cbiAgZnVuY3Rpb24gc3RhcnQgKCkge1xuICAgIGFuaW1hdGUoW21pbnV0ZUhhbmQsIHNlY29uZEhhbmRdLCAuLi5PKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AgKCkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZSk7XG4gICAgaGFuZGxlID0gbnVsbDtcbiAgfVxuXG4gIC8vIHNldCB1cCBldmVudHNcbiAgY29udGV4dC5vbignZGJsY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGhhbmRsZSkgc3RvcCgpO1xuICAgIGVsc2Ugc3RhcnQoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBjb250ZXh0LFxuICAgIHN0YXJ0LFxuICAgIHN0b3BcbiAgfTtcbn1cblxuZ2xvYmFsLmNsb2NrID0gY2xvY2s7XG5leHBvcnQgZGVmYXVsdCBjbG9jaztcbiIsIi8qIGNsb2NrRmFjZS5qcyAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IENPTE9SID0gJyNmYzUnO1xuXG5mdW5jdGlvbiBkcmF3RmFjZSAoY3R4LCByYWRpdXMsIGN4LCBjeSkge1xuICBsZXQgcmluZyA9IGN0eC5jaXJjbGUoKVxuICAgIC5yYWRpdXMocmFkaXVzKVxuICAgIC5zdHJva2Uoe3dpZHRoOiAyLCBjb2xvcjogQ09MT1J9KVxuICAgIC5maWxsKCdub25lJylcbiAgICAudHJhbnNsYXRlKGN4LCBjeSk7XG5cbiAgZm9yIChsZXQgZCA9IDA7IGQgPCA2MDsgKytkKSB7XG4gICAgbGV0IGxlbmd0aCA9IGQgJSA1ID8gNiA6IDEyO1xuICAgIGN0eC5saW5lKDAsIDAsIDAsIGxlbmd0aClcbiAgICAgIC5tb3ZlKGN4LCBjeSAtIHJhZGl1cylcbiAgICAgIC5yb3RhdGUoZCAqIDYsIGN4LCBjeSlcbiAgICAgIC5zdHJva2Uoe3dpZHRoOiAyLCBjb2xvcjogQ09MT1J9KTtcbiAgfVxuXG4gIHJldHVybiByaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkcmF3RmFjZTtcbiIsIi8qIGhhbmQuanNcbiAgIGNsb2NrIGhhbmQgbG9naWMgYW5kIGRyYXdpbmdcbiovXG5cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgQ09MT1IgPSAnI2ZjNSc7XG5cbmZ1bmN0aW9uIHBvbHlnb25TdHIgKC4uLmNvb3Jkcykge1xuICAvLyBiZWNhdXNlIHRoaXMgaXMgd2hhdCAucG9seWdvbiB0YWtlcyA6fFxuICBsZXQgYSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkgKz0gMikge1xuICAgIGEucHVzaChbY29vcmRzW2ldLCBjb29yZHNbaSArIDFdXS5qb2luKCcsJykpO1xuICB9XG4gIHJldHVybiBhLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gZHJhd0hhbmQgKGN0eCwgY29vcmRzKSB7XG4gIHJldHVybiBjdHgucG9seWdvbihwb2x5Z29uU3RyKC4uLmNvb3JkcykpXG4gICAgLnN0cm9rZShDT0xPUikuZmlsbCh7Y29sb3I6IENPTE9SLCBvcGFjaXR5OiAwLjV9KTtcbn1cblxuZnVuY3Rpb24gbW92ZUhhbmQgKGhhbmQsIHBlcmlvZCwgc3RhcnRUaW1lLCBjeCwgY3kpIHtcbiAgbGV0IHRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKSxcbiAgICAgIGRlbHRhID0gKHRpbWUgLSBzdGFydFRpbWUpICUgcGVyaW9kLFxuICAgICAgYW5nbGUgPSAoZGVsdGEgLyBwZXJpb2QpICogMzYwO1xuXG4gIGhhbmQucm90YXRlKGFuZ2xlLCBjeCwgY3kpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUhhbmQgKGN0eCwgcGVyaW9kLCBjb29yZHMpIHtcbiAgbGV0IGhhbmQgPSBkcmF3SGFuZChjdHgsIGNvb3JkcyksXG4gICAgICBtb3ZlID0gbW92ZUhhbmQuYmluZChudWxsLCBoYW5kLCBwZXJpb2QpO1xuICByZXR1cm4geyBoYW5kLCBtb3ZlIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBjbG9jayBmcm9tICcuL2Nsb2NrJztcblxubGV0IGMgPSBjbG9jayhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvY2snKSk7XG5cbmdsb2JhbC5jbG9jayA9IGM7XG4iXX0=
