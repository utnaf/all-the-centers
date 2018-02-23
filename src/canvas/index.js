import { lifecycle } from "melody-hoc";
import { createComponent, RECEIVE_PROPS } from "melody-component";
import template from "./index.twig";
import Canvas from "./Canvas";

const defaultState = { points: [] };
let canvas = null;

const stateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_PROPS:
      canvas && canvas.drawPoints(action.payload.points);
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
  }
});

export default enhance(createComponent(template, stateReducer));
