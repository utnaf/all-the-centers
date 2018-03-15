export const ADD_POINT = "add_point";

export function addPoint(point) {
  return {
    type: ADD_POINT,
    payload: { point }
  };
}
