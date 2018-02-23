import { createComponent, RECEIVE_PROPS } from "melody-component";
import { dispatchToState } from "melody-util";
import reduceReducers from "reduce-reducers";
import Point from "../point-list/Point.js";
import {concat, findIndex} from "lodash";

import template from "./index.twig";

export const ADD_POINT = "ADD_POINT";

const defaultState = { points: [] };

const stateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_POINT:
      const point = action.payload;

      if(findIndex(state.points, (o) => { return o.toString() === point.toString(); }) === -1) {
        return {
          ...state,
          points: concat(state.points, point)
        };
      }
      break;
  }

  return state;
};

const dispatchReducer = dispatchToState({
  addPoint(x, y) {
    return { type: ADD_POINT, payload: new Point(x, y) };
  }
});

export default createComponent(
  template,
  reduceReducers(dispatchReducer, stateReducer)
);
