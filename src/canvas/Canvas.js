import { each } from "lodash";

export default class Canvas {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.context = null;

    if(!this.canvas) {
      throw `Element with id ${id} doesn't exists`;
    }
  }

  drawPoints(points) {
    this.clear();
    each(points,(point) => {
      this.drawPoint(point)
    })
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
    if(this.context === null) {
      this.context = this.canvas.getContext('2d');
      this.context.fillStyle = 'rgba(0,0,0,0.6)';
    }

    return this.context;
  }
}