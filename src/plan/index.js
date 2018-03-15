import { createComponent, RECEIVE_PROPS } from "melody-component";
import { lifecycle, bindEvents, compose } from "melody-hoc";
import template from "./index.twig";
import { drawGrid, drawPoints } from "../drawer";
import { ADD_POINT, addPoint } from "./actions";
import { adaptPoint, Point } from "../canvas";
import { concat } from "lodash";

const reducer = (state = { points: []}, {type, payload}) => {
  switch (type) {
    case RECEIVE_PROPS:
      return {
        ...state,
        ...payload
      }
    case ADD_POINT:
      const points = concat(state.points, [adaptPoint(payload.point)]);
      drawPoints(points);
      return {
        ...state,
        points
      };
    default:
      return state;
  }
};

const clickEvent = bindEvents({
  canvasPlan: {
    click(event, { dispatch }) {
      dispatch(addPoint(new Point(event.x, event.y)));
    }
  }
});

const lifeCycle = lifecycle({
  componentDidMount() {
    drawGrid();
  }
});

const enhancers = compose(lifeCycle, clickEvent);
const component = createComponent(template, reducer);

export default enhancers(component);
