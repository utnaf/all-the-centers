import { canvas, getContext, center, Point } from "../canvas";
import { calculate } from "circumcenter-calculator";
import combinations from "../util";

export const SCALE = 10;

const POINTS_CONTEXT = "points";
const CIRCUMCENTER_CONTEXT = "points";

function drawPointFromContext(ctx, point, diameter = 3) {
  const actualX = center().x + point.x * SCALE;
  const actualY = center().y - point.y * SCALE;

  if (actualX > canvas().width || actualY > canvas().height) {
    throw `Point ${point.toString()} out of border`;
  }

  ctx.beginPath();
  ctx.arc(actualX, actualY, diameter, 0, 2 * Math.PI, true);
  ctx.fill();

  return point;
}

function drawCircumcenters(points, opacity = 9) {
  const centers = combinations(points).map(points => {
    return calculate(...points);
  });

  return centers.length > 2 ? drawCircumcenters(centers, ++opacity) : [];
}

export function drawPoints(points) {
  const pointCtx = getContext(POINTS_CONTEXT);

  points.forEach(point => {
    if (!point.isDrawn) {
      pointCtx.fillStyle = "green";
      drawPointFromContext(pointCtx, point, 4);
      point.isDrawn = true;
    }
  });

  drawCircumcenters(points);
}
