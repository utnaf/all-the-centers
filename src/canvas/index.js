import { lifecycle } from "melody-hoc";
import { createComponent, RECEIVE_PROPS } from "melody-component";
import template from "./index.twig";
import Canvas from "./Canvas";

const defaultState = { points: [] };
let canvas = null;

const stateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_PROPS:
      canvas && canvas.drawPoint(action.payload.points[action.payload.points.length - 1]);
      return {
        ...state,
        ...action.payload
      };
  }

  return state;
};

const enhance = lifecycle({
  componentDidMount() {
    canvas = new Canvas('canvas');
    canvas.drawGrid();
  }
});

export default enhance(createComponent(template, stateReducer));
