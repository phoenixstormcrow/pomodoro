(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/* clock.js */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var minColor = '#fc5',
    secColor = '#fc5',
    min = 60 * 1000,
    hr = 60 * min;

var startTime = undefined,
    elapsedTime = undefined;

function polygonStr() {
  var a = [];
  for (var i = 0; i < 6; i += 2) {
    a.push([arguments[i], arguments[i + 1]].join(','));
  }
  return a.join(' ');
}

function secondHand(ctx, coords) {
  return ctx.line.apply(ctx, _toConsumableArray(coords)).stroke(secColor);
}

function minuteHand(ctx, coords) {
  return ctx.polygon(polygonStr.apply(undefined, _toConsumableArray(coords))).stroke(minColor).fill(minColor);
}

function animateSecond(elem, cx, cy) {
  elem.animate(min, '-').rotate(360, cx, cy).during(function (pos) {
    elapsedTime = Date.now() - startTime;
    if (pos === 1) {
      console.log(elapsedTime / 1000);
    }
  }).loop();
}

function clock(element) {
  var w = element.clientWidth,
      h = element.clientHeight,
      O = [w / 2, h / 2],
      midnight = [O[0], O[1] + 10, O[0], 0];

  // create an svg child node
  var context = SVG('clock').spof();
  SVG.on(window, 'resize', function () {
    context.spof();
  });

  // draw hands
  var minute = minuteHand(context, [O[0] - 6, O[1] - 5].concat(midnight));
  var second = secondHand(context, midnight);

  // set up events
  context.click(function (evt) {
    console.log(evt.clientX, evt.clientY);
  });

  return {
    svg: context,
    start: function start() {
      var _minute$animate;

      startTime = Date.now();
      animateSecond.apply(undefined, [second].concat(O));
      (_minute$animate = minute.animate(hr, '-')).rotate.apply(_minute$animate, [360].concat(O)).loop();
    }
  };
}

global.ps = polygonStr;
global.clock = clock;
exports['default'] = clock;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _clock = require('./clock');

var _clock2 = _interopRequireDefault(_clock);

var c = (0, _clock2['default'])(document.getElementById('clock'));

global.clock = c;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./clock":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9waG9lbml4L2ZjYy96aXBsaW5lcy9wb21vZG9yby9zcmMvY2xvY2suanMiLCIvaG9tZS9waG9lbml4L2ZjYy96aXBsaW5lcy9wb21vZG9yby9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUNFQSxZQUFZLENBQUM7Ozs7Ozs7O0FBRWIsSUFBTSxRQUFRLEdBQUcsTUFBTTtJQUNuQixRQUFRLEdBQUcsTUFBTTtJQUNqQixHQUFHLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDZixFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQzs7QUFFbEIsSUFBSSxTQUFTLFlBQUE7SUFBRSxXQUFXLFlBQUEsQ0FBQzs7QUFFM0IsU0FBUyxVQUFVLEdBQVU7QUFDM0IsTUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ1gsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzdCLEtBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFLLENBQUMsQ0FBQyxFQUFFLFVBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7R0FDeEM7QUFDRCxTQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDcEI7O0FBRUQsU0FBUyxVQUFVLENBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUNoQyxTQUFPLEdBQUcsQ0FBQyxJQUFJLE1BQUEsQ0FBUixHQUFHLHFCQUFTLE1BQU0sRUFBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUM3Qzs7QUFFRCxTQUFTLFVBQVUsQ0FBRSxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQ2hDLFNBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLHFDQUFJLE1BQU0sRUFBQyxDQUFDLENBQ3RDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDcEM7O0FBRUQsU0FBUyxhQUFhLENBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDcEMsTUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQ25CLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUNuQixNQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDckIsZUFBVyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUM7QUFDckMsUUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFO0FBQ2IsYUFBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDakM7R0FDRixDQUFDLENBQ0QsSUFBSSxFQUFFLENBQUM7Q0FDWDs7QUFFRCxTQUFTLEtBQUssQ0FBQyxPQUFPLEVBQUU7QUFDdEIsTUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFdBQVc7TUFDdkIsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxZQUFZO01BQ3hCLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQztNQUNkLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O0FBRzFDLE1BQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNsQyxLQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsWUFBWTtBQUFFLFdBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztHQUFFLENBQUMsQ0FBQzs7O0FBRzFELE1BQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFLLFFBQVEsRUFBRSxDQUFDO0FBQ3BFLE1BQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7OztBQUczQyxTQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQzNCLFdBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDdkMsQ0FBQyxDQUFDOztBQUVILFNBQU87QUFDTCxPQUFHLEVBQUUsT0FBTztBQUNaLFNBQUssRUFBQyxpQkFBRzs7O0FBQ1AsZUFBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN2QixtQkFBYSxtQkFBQyxNQUFNLFNBQUssQ0FBQyxFQUFDLENBQUM7QUFDNUIseUJBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUMsTUFBTSxNQUFBLG1CQUFDLEdBQUcsU0FBSyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNsRDtHQUNGLENBQUM7Q0FDSDs7QUFFRCxNQUFNLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQztBQUN2QixNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztxQkFDTixLQUFLOzs7Ozs7Ozs7OztxQkN2RUYsU0FBUzs7OztBQUUzQixJQUFJLENBQUMsR0FBRyx3QkFBTSxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O0FBRWhELE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGNsb2NrLmpzICovXG5cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgbWluQ29sb3IgPSAnI2ZjNScsXG4gICAgc2VjQ29sb3IgPSAnI2ZjNScsXG4gICAgbWluID0gNjAgKiAxMDAwLFxuICAgIGhyID0gNjAgKiBtaW47XG5cbmxldCBzdGFydFRpbWUsIGVsYXBzZWRUaW1lO1xuXG5mdW5jdGlvbiBwb2x5Z29uU3RyKC4uLmFyZ3MpIHtcbiAgbGV0IGEgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpICs9IDIpIHtcbiAgICBhLnB1c2goW2FyZ3NbaV0sIGFyZ3NbaSsxXV0uam9pbignLCcpKTtcbiAgfVxuICByZXR1cm4gYS5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIHNlY29uZEhhbmQgKGN0eCwgY29vcmRzKSB7XG4gIHJldHVybiBjdHgubGluZSguLi5jb29yZHMpLnN0cm9rZShzZWNDb2xvcik7XG59XG5cbmZ1bmN0aW9uIG1pbnV0ZUhhbmQgKGN0eCwgY29vcmRzKSB7XG4gIHJldHVybiBjdHgucG9seWdvbihwb2x5Z29uU3RyKC4uLmNvb3JkcykpXG4gICAgLnN0cm9rZShtaW5Db2xvcikuZmlsbChtaW5Db2xvcik7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGVTZWNvbmQgKGVsZW0sIGN4LCBjeSkge1xuICBlbGVtLmFuaW1hdGUobWluLCAnLScpXG4gICAgLnJvdGF0ZSgzNjAsIGN4LCBjeSlcbiAgICAuZHVyaW5nKGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIGVsYXBzZWRUaW1lID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcbiAgICAgIGlmIChwb3MgPT09IDEpIHtcbiAgICAgICAgY29uc29sZS5sb2coZWxhcHNlZFRpbWUgLyAxMDAwKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5sb29wKCk7XG59XG5cbmZ1bmN0aW9uIGNsb2NrKGVsZW1lbnQpIHtcbiAgbGV0IHcgPSBlbGVtZW50LmNsaWVudFdpZHRoLFxuICAgICAgaCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0LFxuICAgICAgTyA9IFt3LzIsIGgvMl0sXG4gICAgICBtaWRuaWdodCA9IFtPWzBdLCBPWzFdICsgMTAsIE9bMF0sIDBdO1xuXG4gIC8vIGNyZWF0ZSBhbiBzdmcgY2hpbGQgbm9kZVxuICBsZXQgY29udGV4dCA9IFNWRygnY2xvY2snKS5zcG9mKCk7XG4gIFNWRy5vbih3aW5kb3csICdyZXNpemUnLCBmdW5jdGlvbiAoKSB7IGNvbnRleHQuc3BvZigpOyB9KTtcblxuICAvLyBkcmF3IGhhbmRzXG4gIGxldCBtaW51dGUgPSBtaW51dGVIYW5kKGNvbnRleHQsIFtPWzBdIC0gNiwgT1sxXSAtIDUsIC4uLm1pZG5pZ2h0XSk7XG4gIGxldCBzZWNvbmQgPSBzZWNvbmRIYW5kKGNvbnRleHQsIG1pZG5pZ2h0KTtcblxuICAvLyBzZXQgdXAgZXZlbnRzXG4gIGNvbnRleHQuY2xpY2soZnVuY3Rpb24gKGV2dCkge1xuICAgIGNvbnNvbGUubG9nKGV2dC5jbGllbnRYLCBldnQuY2xpZW50WSk7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgc3ZnOiBjb250ZXh0LFxuICAgIHN0YXJ0ICgpIHtcbiAgICAgIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICBhbmltYXRlU2Vjb25kKHNlY29uZCwgLi4uTyk7XG4gICAgICBtaW51dGUuYW5pbWF0ZShociwgJy0nKS5yb3RhdGUoMzYwLCAuLi5PKS5sb29wKCk7XG4gICAgfVxuICB9O1xufVxuXG5nbG9iYWwucHMgPSBwb2x5Z29uU3RyO1xuZ2xvYmFsLmNsb2NrID0gY2xvY2s7XG5leHBvcnQgZGVmYXVsdCBjbG9jaztcbiIsImltcG9ydCBjbG9jayBmcm9tICcuL2Nsb2NrJztcblxubGV0IGMgPSBjbG9jayhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvY2snKSk7XG5cbmdsb2JhbC5jbG9jayA9IGM7XG4iXX0=
