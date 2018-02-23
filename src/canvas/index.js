import { lifecycle } from "melody-hoc";
import { createComponent, RECEIVE_PROPS } from "melody-component";
import template from "./index.twig";

const defaultState = { points: [] };
let ctx = null;

const stateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_PROPS:
      for(let pointName in action.payload.points) {
        let point = action.payload.points[pointName];
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI, true);
        ctx.fill();
      }
      return {
        ...state,
        ...action.payload
      };
  }

  return state;
};

const enhance = lifecycle({
  componentDidMount() {
    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
  }
});

export default enhance(createComponent(template, stateReducer));
