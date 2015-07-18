/* clockFace.js */

'use strict';

const COLOR = '#fc5';

function drawFace(ctx, radius) {
  return ctx.circle().radius(radius).stroke(COLOR);
}
