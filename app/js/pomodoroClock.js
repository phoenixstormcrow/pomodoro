(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/* clock.js */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _hand = require('./hand');

var _hand2 = _interopRequireDefault(_hand);

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
      O = undefined,
      midnight = undefined,
      context = SVG(element.id);

  function initialize() {
    w = element.clientWidth;
    h = element.clientHeight;
    O = [w / 2, h / 2];
    midnight = [O[0], O[1] + 10, O[0], 0];
    context.spof();
  }

  // initialize variables
  SVG.on(window, 'resize', initialize);
  initialize();

  // draw hands
  var minuteHand = (0, _hand2['default'])(context, HOUR, [O[0] - 6, O[1] - 5].concat(_toConsumableArray(midnight))),
      secondHand = (0, _hand2['default'])(context, MINUTE, [O[0] - 2, O[1] - 1].concat(_toConsumableArray(midnight)));

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

},{"./hand":2}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
(function (global){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _clock = require('./clock');

var _clock2 = _interopRequireDefault(_clock);

var c = (0, _clock2['default'])(document.getElementById('clock'));

global.clock = c;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./clock":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9waG9lbml4L2ZjYy96aXBsaW5lcy9wb21vZG9yby9zcmMvY2xvY2suanMiLCIvaG9tZS9waG9lbml4L2ZjYy96aXBsaW5lcy9wb21vZG9yby9zcmMvaGFuZC5qcyIsIi9ob21lL3Bob2VuaXgvZmNjL3ppcGxpbmVzL3BvbW9kb3JvL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0VBLFlBQVksQ0FBQzs7Ozs7Ozs7OztvQkFFSSxRQUFROzs7O0FBRXpCLElBQU0sTUFBTSxHQUFHLEVBQUUsR0FBRyxJQUFJO0lBQ2xCLElBQUksR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDOztBQUVYLFNBQVMsT0FBTyxDQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFOzs7QUFHL0IsTUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDOztBQUU5QixXQUFTLElBQUksR0FBSTtBQUNmLFNBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDekIsT0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZCLENBQUMsQ0FBQztBQUNILFVBQU0sR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUN0Qzs7QUFFRCxRQUFNLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDdEM7O0FBRUQsU0FBUyxLQUFLLENBQUUsT0FBTyxFQUFFO0FBQ3ZCLE1BQUksQ0FBQyxZQUFBO01BQUUsQ0FBQyxZQUFBO01BQUUsQ0FBQyxZQUFBO01BQUUsUUFBUSxZQUFBO01BQ2pCLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztBQUU5QixX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QUFHLE1BQU0sR0FBSSxHQUFHLENBQUM7O0FBRW5DLE1BQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztDQUM1Qjs7QUFHYyxTQUFTLFVBQVUsQ0FBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUN2RCxNQUFJLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQztNQUM1QixJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzdDLFNBQU8sRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLElBQUksRUFBSixJQUFJLEVBQUUsQ0FBQztDQUN2Qjs7Ozs7O0FDbkNELFlBQVksQ0FBQzs7OztxQkFFSyxTQUFTOzs7O0FBRTNCLElBQUksQ0FBQyxHQUFHLHdCQUFNLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7QUFFaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogY2xvY2suanMgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaGFuZCBmcm9tICcuL2hhbmQnO1xuXG5jb25zdCBNSU5VVEUgPSA2MCAqIDEwMDAsXG4gICAgICBIT1VSID0gNjAgKiBNSU5VVEU7XG5cbmxldCBoYW5kbGU7XG5cbmZ1bmN0aW9uIGFuaW1hdGUgKGhhbmRzLCBjeCwgY3kpIHtcbiAgLy8gcGVyZm9ybWFuY2Uubm93KCkgbGV0J3MgdXMgdHJhY2sgdGhlIHRpbWVcbiAgLy8gZXZlbiB3aGVuIHRhYiBub3QgdmlzaWJsZS5cbiAgbGV0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgZnVuY3Rpb24gc3RlcCAoKSB7XG4gICAgaGFuZHMuZm9yRWFjaChmdW5jdGlvbiAoaCkge1xuICAgICAgaC5tb3ZlKHN0YXJ0LCBjeCwgY3kpO1xuICAgIH0pO1xuICAgIGhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgfVxuXG4gIGhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbn1cblxuZnVuY3Rpb24gY2xvY2sgKGVsZW1lbnQpIHtcbiAgbGV0IHcsIGgsIE8sIG1pZG5pZ2h0LFxuICAgICAgY29udGV4dCA9IFNWRyhlbGVtZW50LmlkKTtcblxuICBmdW5jdGlvbiBpbml0aWFsaXplICgpIHtcbiAgICB3ID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBoID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgTyA9IFt3IC8gMiwgaCAvIDJdO1xuICAgIG1pZG5pZ2h0ID0gW09bMF0sIE9bMV0gKyAxMCwgT1swXSwgMF07XG4gICAgY29udGV4dC5zcG9mKCk7XG4gIH1cblxuICAvLyBpbml0aWFsaXplIHZhcmlhYmxlc1xuICBTVkcub24od2luZG93LCAncmVzaXplJywgaW5pdGlhbGl6ZSk7XG4gIGluaXRpYWxpemUoKTtcblxuICAvLyBkcmF3IGhhbmRzXG4gIGxldCBtaW51dGVIYW5kID0gaGFuZChjb250ZXh0LCBIT1VSLCBbT1swXSAtIDYsIE9bMV0gLSA1LCAuLi5taWRuaWdodF0pLFxuICAgICAgc2Vjb25kSGFuZCA9IGhhbmQoY29udGV4dCwgTUlOVVRFLCBbT1swXSAtIDIsIE9bMV0gLSAxLCAuLi5taWRuaWdodF0pO1xuXG4gIGZ1bmN0aW9uIHN0YXJ0ICgpIHtcbiAgICBhbmltYXRlKFttaW51dGVIYW5kLCBzZWNvbmRIYW5kXSwgLi4uTyk7XG4gIH1cblxuICBmdW5jdGlvbiBzdG9wICgpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUpO1xuICAgIGhhbmRsZSA9IG51bGw7XG4gIH1cblxuICAvLyBzZXQgdXAgZXZlbnRzXG4gIGNvbnRleHQub24oJ2RibGNsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGlmIChoYW5kbGUpIHN0b3AoKTtcbiAgICBlbHNlIHN0YXJ0KCk7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgY29udGV4dCxcbiAgICBzdGFydCxcbiAgICBzdG9wXG4gIH07XG59XG5cbmdsb2JhbC5jbG9jayA9IGNsb2NrO1xuZXhwb3J0IGRlZmF1bHQgY2xvY2s7XG4iLCIvKiBoYW5kLmpzXG4gICBjbG9jayBoYW5kIGxvZ2ljIGFuZCBkcmF3aW5nXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IENPTE9SID0gJyNmYzUnO1xuXG5mdW5jdGlvbiBwb2x5Z29uU3RyICguLi5jb29yZHMpIHtcbiAgLy8gYmVjYXVzZSB0aGlzIGlzIHdoYXQgLnBvbHlnb24gdGFrZXMgOnxcbiAgbGV0IGEgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpICs9IDIpIHtcbiAgICBhLnB1c2goW2Nvb3Jkc1tpXSwgY29vcmRzW2kgKyAxXV0uam9pbignLCcpKTtcbiAgfVxuICByZXR1cm4gYS5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIGRyYXdIYW5kIChjdHgsIGNvb3Jkcykge1xuICByZXR1cm4gY3R4LnBvbHlnb24ocG9seWdvblN0ciguLi5jb29yZHMpKVxuICAgIC5zdHJva2UoQ09MT1IpLmZpbGwoQ09MT1IpO1xufVxuXG5mdW5jdGlvbiBtb3ZlSGFuZCAoaGFuZCwgcGVyaW9kLCBzdGFydFRpbWUsIGN4LCBjeSkge1xuICBsZXQgdGltZSA9IHBlcmZvcm1hbmNlLm5vdygpLFxuICAgICAgZGVsdGEgPSAodGltZSAtIHN0YXJ0VGltZSkgJSBwZXJpb2QsXG4gICAgICBhbmdsZSA9IChkZWx0YSAvIHBlcmlvZCkgKiAzNjA7XG5cbiAgaGFuZC5yb3RhdGUoYW5nbGUsIGN4LCBjeSk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlSGFuZCAoY3R4LCBwZXJpb2QsIGNvb3Jkcykge1xuICBsZXQgaGFuZCA9IGRyYXdIYW5kKGN0eCwgY29vcmRzKSxcbiAgICAgIG1vdmUgPSBtb3ZlSGFuZC5iaW5kKG51bGwsIGhhbmQsIHBlcmlvZCk7XG4gIHJldHVybiB7IGhhbmQsIG1vdmUgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGNsb2NrIGZyb20gJy4vY2xvY2snO1xuXG5sZXQgYyA9IGNsb2NrKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9jaycpKTtcblxuZ2xvYmFsLmNsb2NrID0gYztcbiJdfQ==
