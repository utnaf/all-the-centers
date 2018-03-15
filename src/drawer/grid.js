import { center, canvas, getContext } from "../canvas";

const GROSS_SCALE = 100;
const FINE_SCALE = GROSS_SCALE / 2;

const BASE_TONE = "210, 190, 190";
const BASIC_GRID_COLOR = `rgba(${BASE_TONE},0.8)`;
const UNIT_GRID_COLOR = BASIC_GRID_COLOR;
const AXES_COLOR = `rgb(${BASE_TONE})`;

function drawBasicGrid(context) {
  context.lineWidth = 0.5;
  context.strokeStyle = BASIC_GRID_COLOR;
  context.setLineDash([5, 5]);
  context.beginPath();

  for (var x = center().x; x <= canvas().width; x += GROSS_SCALE) {
    context.moveTo(x, 0);
    context.lineTo(x, canvas().height);
  }

  for (var x = center().x; x > 0; x -= GROSS_SCALE) {
    context.moveTo(x, 0);
    context.lineTo(x, canvas().height);
  }

  for (var y = center().y; y <= canvas().height; y += GROSS_SCALE) {
    context.moveTo(0, y);
    context.lineTo(canvas().width, y);
  }

  for (var y = center().y; y > 0; y -= GROSS_SCALE) {
    context.moveTo(0, y);
    context.lineTo(canvas().width, y);
  }

  context.stroke();

  return context;
}

function drawUnitGrid(context) {
  context.lineWidth = 0.5;
  context.strokeStyle = UNIT_GRID_COLOR;
  context.setLineDash([2, 4]);
  context.beginPath();

  for (var x = center().x; x <= canvas().width; x += FINE_SCALE) {
    context.moveTo(x, 0);
    context.lineTo(x, canvas().height);
  }

  for (var x = center().x; x > 0; x -= FINE_SCALE) {
    context.moveTo(x, 0);
    context.lineTo(x, canvas().height);
  }

  for (var y = center().y; y <= canvas().height; y += FINE_SCALE) {
    context.moveTo(0, y);
    context.lineTo(canvas().width, y);
  }

  for (var y = center().y; y > 0; y -= FINE_SCALE) {
    context.moveTo(0, y);
    context.lineTo(canvas().width, y);
  }

  context.stroke();

  return context;
}

function drawAxes(context) {
  context.lineWidth = 2;
  context.strokeStyle = AXES_COLOR;
  context.beginPath();

  context.moveTo(center().x, 0);
  context.lineTo(center().x, canvas().height);

  context.moveTo(0, center().y);
  context.lineTo(canvas().width, center().y);

  context.stroke();

  return context;
}

export default function drawGrid() {
  return drawUnitGrid(drawBasicGrid(drawAxes(getContext())));
}
