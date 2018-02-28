import { each } from "lodash";
import { calculate } from "circumcenter-calculator";

export default class Canvas {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.context = null;

    if (!this.canvas) {
      throw `Element with id ${id} doesn't exists`;
    }
  }

  drawPoints(points) {
    this.clear();
    each(points, point => {
      this.drawPoint(point);
    });

    if (points.length === 3) {
      this.drawMidPoint(calculate(points[0], points[1], points[2]));
    }
  }

  drawMidPoint(point) {
    const context = this.getNewContext("rgba(255,0,0,0.6)");
    context.beginPath();
    context.arc(point.x, point.y, 4, 0, 2 * Math.PI, true);
    context.fill();
  }

  drawPoint(point) {
    const context = this.getContext();
    context.beginPath();
    context.arc(point.x, point.y, 4, 0, 2 * Math.PI, true);
    context.fill();
  }

  clear() {
    this.getContext().clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getContext() {
    if (this.context === null) {
      this.context = this.getNewContext();
    }

    return this.context;
  }

  getNewContext(fillStyle = "rgba(0,0,0,0.6)") {
    const ctx =  this.canvas.getContext("2d");
    ctx.fillStyle = fillStyle;

    return ctx;
  }
}
