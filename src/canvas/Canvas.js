import { each } from "lodash";
import { calculate } from "circumcenter-calculator";
import SimpleGridDrawer from "../lib/GridDrawers/Simple";

export default class Canvas {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = null;

    if (!this.canvas) {
      throw `Element with id ${id} doesn't exists`;
    }
  }

  drawGrid() {
    this.gridDrawer = new SimpleGridDrawer(this.canvas);
    this.gridDrawer.draw();
  }

  drawPoint(point) {
    this.gridDrawer.drawPoint(point);
  }
}
