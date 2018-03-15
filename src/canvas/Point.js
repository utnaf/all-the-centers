import { Point } from "circumcenter-calculator";

export default class extends Point {
  constructor(x, y) {
    super(x, y);
    this.isDrawn = false;
  }
}
