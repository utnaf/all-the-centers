import Point from "./Point";
import { SCALE } from "../drawer";

let canvasObject = null;
let centerObject = null;
let contexts = new Map();

function canvas() {
  if (canvasObject === null) {
    canvasObject = document.getElementById("canvas");
    if (!canvasObject) {
      throw `No element with id "canvas"`;
    }

    canvasObject.width = window.innerWidth;
    canvasObject.height = window.innerHeight;
  }

  return canvasObject;
}

function center() {
  if (centerObject === null) {
    centerObject = new Point(
      parseInt(Math.round(canvas().width / 2)) - 1,
      parseInt(Math.round(canvas().height / 2)) - 1
    );
  }

  return centerObject;
}

function getContext(contextName = "default") {
  if (!contexts.has(contextName)) {
    contexts.set(contextName, canvas().getContext("2d"));
  }

  return contexts.get(contextName);
}

function adaptPoint(point) {
  const x = (point.x - center().x) / SCALE;
  const y = (center().y - point.y) / SCALE;

  return new Point(x, y);
}

export { canvas, center, getContext, Point, adaptPoint };
