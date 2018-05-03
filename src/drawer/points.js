import { canvas, getContext, center, Point } from "../canvas";
import { calculate } from "circumcenter-calculator";
import combinations from 'ml-combinations';

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
  if(points.length < 3) {
    return;
  }
  
  const circumcenterCtx = getContext(CIRCUMCENTER_CONTEXT);
  const combinationsIterator = combinations(3, points.length, {mode: 'index'});
  
  for(let combination of combinationsIterator) {
    drawPointFromContext(
      circumcenterCtx,
      calculate(
        points[combination[0]],
        points[combination[1]],
        points[combination[2]]
      ),
      opacity
    );
  }
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
