export default class {
  constructor(canvas) {
    this.canvas = canvas;
    this.boxWidth = document.getElementById("canvas").offsetWidth;
    this.boxHeight = document.getElementById("canvas").offsetHeight;
    this.context = this.canvas.getContext("2d");

    this.midX = parseInt(Math.round(this.boxWidth / 2)) - 1;
    this.midY = parseInt(Math.round(this.boxHeight / 2)) - 1;
  }

  draw() {
    this.drawAxes();
    this.drawBasicGrid();
    this.drawUnitGrid();

    return this.context;
  }

  drawPoint(point) {
    this.context.fillStyle = "green";
    this.simpleDrawPoint(point);
  }

  drawMidPoint(point) {
    this.context.fillStyle = "red";
    this.simpleDrawPoint(point);
  }

  simpleDrawPoint(point) {
    const scale = 10;
    const actualX = this.midX + point.x * scale;
    const actualY = this.midY - point.y * scale;

    if (actualX > this.boxWidth || actualY > this.boxHeight) {
      throw `Point ${point.toString()} out of border`;
    }

    this.context.beginPath();
    this.context.arc(actualX, actualY, 6, 0, 2 * Math.PI, true);
    this.context.fill();
  }

  drawBasicGrid() {
    this.context.lineWidth = 1;
    this.context.strokeStyle = "rgba(210,210,210,0.6)";
    this.context.setLineDash([5, 5]);
    this.context.beginPath();

    for (var x = this.midX; x <= this.boxWidth; x += 100) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.boxHeight);
    }

    for (var x = this.midX; x > 0; x -= 100) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.boxHeight);
    }

    for (var y = this.midY; y <= this.boxHeight; y += 100) {
      this.context.moveTo(0, y);
      this.context.lineTo(this.boxWidth, y);
    }

    for (var y = this.midY; y > 0; y -= 100) {
      this.context.moveTo(0, y);
      this.context.lineTo(this.boxWidth, y);
    }

    this.context.stroke();
  }

  drawUnitGrid() {
    this.context.lineWidth = 1;
    this.context.strokeStyle = "rgba(210,210,210,0.4)";
    this.context.setLineDash([1, 5]);
    this.context.beginPath();

    for (var x = this.midX; x <= this.boxWidth; x += 50) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.boxHeight);
    }

    for (var x = this.midX; x > 0; x -= 50) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.boxHeight);
    }

    for (var y = this.midY; y <= this.boxHeight; y += 50) {
      this.context.moveTo(0, y);
      this.context.lineTo(this.boxWidth, y);
    }

    for (var y = this.midY; y > 0; y -= 50) {
      this.context.moveTo(0, y);
      this.context.lineTo(this.boxWidth, y);
    }

    this.context.stroke();
  }

  drawAxes() {
    this.context.lineWidth = 2;
    this.context.strokeStyle = "rgb(210,210,210)";
    this.context.beginPath();

    this.context.moveTo(this.midX, 0);
    this.context.lineTo(this.midX, this.boxHeight);

    this.context.moveTo(0, this.midY);
    this.context.lineTo(this.boxWidth, this.midY);

    this.context.stroke();
  }
}
