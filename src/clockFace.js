/* clockFace.js */

'use strict';

const COLOR = '#fc5';

function drawFace(ctx, radius, cx, cy) {
  return ctx.circle()
    .radius(radius)
    .stroke({width: 2, color: COLOR})
    .fill('none')
    .translate(cx, cy);;
}

export default drawFace;
