import { CREATE_MESSAGE } from "../Actions/Types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
}
