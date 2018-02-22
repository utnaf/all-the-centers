import { createComponent, RECEIVE_PROPS } from "melody-component";
import { dispatchToState } from "melody-util";
import reduceReducers from "reduce-reducers";

import template from "./index.twig";

export const ADD_POINT = "ADD_POINT";

const defaultState = { points: [] };

const stateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_POINT:
      return {
        ...state,
        points: [
          ...state.points,
          action.payload
        ]
      };
  }

  return state;
};

const dispatchReducer = dispatchToState({
  addPoint(pointName) {
    return { type: ADD_POINT, payload: { name: pointName } };
  }
});

export default createComponent(
  template,
  reduceReducers(dispatchReducer, stateReducer)
);
