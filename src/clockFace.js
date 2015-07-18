/* clockFace.js */

'use strict';

const COLOR = '#fc5';

function drawFace (ctx, radius, cx, cy) {
  let ring = ctx.circle()
    .radius(radius)
    .stroke({width: 2, color: COLOR})
    .fill('none')
    .translate(cx, cy);

  for (let d = 0; d < 60; ++d) {
    let length = d % 5 ? 6 : 12;
    ctx.line(0, 0, 0, length)
      .move(cx, cy - radius)
      .rotate(d * 6, cx, cy)
      .stroke({width: 2, color: COLOR});
  }

  return ring;
}

export default drawFace;
