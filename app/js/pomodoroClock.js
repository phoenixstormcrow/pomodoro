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
    midnight = [O[0], O[1], O[0], 0];
    context.spof();
  }

  // initialize variables
  SVG.on(window, 'resize', initialize);
  initialize();

  // draw hands
  var minuteHand = (0, _clockHand2['default'])(context, HOUR, [O[0] - 6, O[1] - 5].concat(_toConsumableArray(midnight))),
      secondHand = (0, _clockHand2['default'])(context, MINUTE, [O[0] - 2, O[1] - 1].concat(_toConsumableArray(midnight)));

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

},{"./clockHand":2}],2:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9waG9lbml4L2ZjYy96aXBsaW5lcy9wb21vZG9yby9zcmMvY2xvY2suanMiLCIvaG9tZS9waG9lbml4L2ZjYy96aXBsaW5lcy9wb21vZG9yby9zcmMvY2xvY2tIYW5kLmpzIiwiL2hvbWUvcGhvZW5peC9mY2MvemlwbGluZXMvcG9tb2Rvcm8vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDRUEsWUFBWSxDQUFDOzs7Ozs7Ozs7O3lCQUVJLGFBQWE7Ozs7QUFFOUIsSUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDbEIsSUFBSSxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUM7O0FBRXpCLElBQUksTUFBTSxZQUFBLENBQUM7O0FBRVgsU0FBUyxPQUFPLENBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7OztBQUcvQixNQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7O0FBRTlCLFdBQVMsSUFBSSxHQUFJO0FBQ2YsU0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUN6QixPQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDdkIsQ0FBQyxDQUFDO0FBQ0gsVUFBTSxHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ3RDOztBQUVELFFBQU0sR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN0Qzs7QUFFRCxTQUFTLEtBQUssQ0FBRSxPQUFPLEVBQUU7QUFDdkIsTUFBSSxDQUFDLFlBQUE7TUFBRSxDQUFDLFlBQUE7TUFBRSxDQUFDLFlBQUE7TUFBRSxRQUFRLFlBQUE7TUFDakIsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7O0FB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QUFNLEdBQUksR0FBRyxDQUFDOztBQUVuQyxNQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDNUI7O0FBR2MsU0FBUyxVQUFVLENBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDdkQsTUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUM7TUFDNUIsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM3QyxTQUFPLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLENBQUM7Q0FDdkI7Ozs7OztBQ25DRCxZQUFZLENBQUM7Ozs7cUJBRUssU0FBUzs7OztBQUUzQixJQUFJLENBQUMsR0FBRyx3QkFBTSxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O0FBRWhELE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGNsb2NrLmpzICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGhhbmQgZnJvbSAnLi9jbG9ja0hhbmQnO1xuXG5jb25zdCBNSU5VVEUgPSA2MCAqIDEwMDAsXG4gICAgICBIT1VSID0gNjAgKiBNSU5VVEU7XG5cbmxldCBoYW5kbGU7XG5cbmZ1bmN0aW9uIGFuaW1hdGUgKGhhbmRzLCBjeCwgY3kpIHtcbiAgLy8gcGVyZm9ybWFuY2Uubm93KCkgbGV0J3MgdXMgdHJhY2sgdGhlIHRpbWVcbiAgLy8gZXZlbiB3aGVuIHRhYiBub3QgdmlzaWJsZS5cbiAgbGV0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgZnVuY3Rpb24gc3RlcCAoKSB7XG4gICAgaGFuZHMuZm9yRWFjaChmdW5jdGlvbiAoaCkge1xuICAgICAgaC5tb3ZlKHN0YXJ0LCBjeCwgY3kpO1xuICAgIH0pO1xuICAgIGhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgfVxuXG4gIGhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbn1cblxuZnVuY3Rpb24gY2xvY2sgKGVsZW1lbnQpIHtcbiAgbGV0IHcsIGgsIE8sIG1pZG5pZ2h0LFxuICAgICAgY29udGV4dCA9IFNWRyhlbGVtZW50LmlkKTtcblxuICBmdW5jdGlvbiBpbml0aWFsaXplICgpIHtcbiAgICB3ID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBoID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgTyA9IFt3IC8gMiwgaCAvIDJdO1xuICAgIG1pZG5pZ2h0ID0gW09bMF0sIE9bMV0sIE9bMF0sIDBdO1xuICAgIGNvbnRleHQuc3BvZigpO1xuICB9XG5cbiAgLy8gaW5pdGlhbGl6ZSB2YXJpYWJsZXNcbiAgU1ZHLm9uKHdpbmRvdywgJ3Jlc2l6ZScsIGluaXRpYWxpemUpO1xuICBpbml0aWFsaXplKCk7XG5cbiAgLy8gZHJhdyBoYW5kc1xuICBsZXQgbWludXRlSGFuZCA9IGhhbmQoY29udGV4dCwgSE9VUiwgW09bMF0gLSA2LCBPWzFdIC0gNSwgLi4ubWlkbmlnaHRdKSxcbiAgICAgIHNlY29uZEhhbmQgPSBoYW5kKGNvbnRleHQsIE1JTlVURSwgW09bMF0gLSAyLCBPWzFdIC0gMSwgLi4ubWlkbmlnaHRdKTtcblxuICBmdW5jdGlvbiBzdGFydCAoKSB7XG4gICAgYW5pbWF0ZShbbWludXRlSGFuZCwgc2Vjb25kSGFuZF0sIC4uLk8pO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RvcCAoKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlKTtcbiAgICBoYW5kbGUgPSBudWxsO1xuICB9XG5cbiAgLy8gc2V0IHVwIGV2ZW50c1xuICBjb250ZXh0Lm9uKCdkYmxjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoaGFuZGxlKSBzdG9wKCk7XG4gICAgZWxzZSBzdGFydCgpO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIGNvbnRleHQsXG4gICAgc3RhcnQsXG4gICAgc3RvcFxuICB9O1xufVxuXG5nbG9iYWwuY2xvY2sgPSBjbG9jaztcbmV4cG9ydCBkZWZhdWx0IGNsb2NrO1xuIiwiLyogaGFuZC5qc1xuICAgY2xvY2sgaGFuZCBsb2dpYyBhbmQgZHJhd2luZ1xuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBDT0xPUiA9ICcjZmM1JztcblxuZnVuY3Rpb24gcG9seWdvblN0ciAoLi4uY29vcmRzKSB7XG4gIC8vIGJlY2F1c2UgdGhpcyBpcyB3aGF0IC5wb2x5Z29uIHRha2VzIDp8XG4gIGxldCBhID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSArPSAyKSB7XG4gICAgYS5wdXNoKFtjb29yZHNbaV0sIGNvb3Jkc1tpICsgMV1dLmpvaW4oJywnKSk7XG4gIH1cbiAgcmV0dXJuIGEuam9pbignICcpO1xufVxuXG5mdW5jdGlvbiBkcmF3SGFuZCAoY3R4LCBjb29yZHMpIHtcbiAgcmV0dXJuIGN0eC5wb2x5Z29uKHBvbHlnb25TdHIoLi4uY29vcmRzKSlcbiAgICAuc3Ryb2tlKENPTE9SKS5maWxsKENPTE9SKTtcbn1cblxuZnVuY3Rpb24gbW92ZUhhbmQgKGhhbmQsIHBlcmlvZCwgc3RhcnRUaW1lLCBjeCwgY3kpIHtcbiAgbGV0IHRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKSxcbiAgICAgIGRlbHRhID0gKHRpbWUgLSBzdGFydFRpbWUpICUgcGVyaW9kLFxuICAgICAgYW5nbGUgPSAoZGVsdGEgLyBwZXJpb2QpICogMzYwO1xuXG4gIGhhbmQucm90YXRlKGFuZ2xlLCBjeCwgY3kpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUhhbmQgKGN0eCwgcGVyaW9kLCBjb29yZHMpIHtcbiAgbGV0IGhhbmQgPSBkcmF3SGFuZChjdHgsIGNvb3JkcyksXG4gICAgICBtb3ZlID0gbW92ZUhhbmQuYmluZChudWxsLCBoYW5kLCBwZXJpb2QpO1xuICByZXR1cm4geyBoYW5kLCBtb3ZlIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBjbG9jayBmcm9tICcuL2Nsb2NrJztcblxubGV0IGMgPSBjbG9jayhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvY2snKSk7XG5cbmdsb2JhbC5jbG9jayA9IGM7XG4iXX0=
