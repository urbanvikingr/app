import * as types from '../actions/action_types';

const initialState = {};

export default function dashboard(state = initialState, action = {}) {
  switch (action.type) {
    case types.DASHBOARD_SET_WEEK:
      return {
        ...state,
        week: action.week
      };
    case types.AUTH_CLEAR: 
      return {
        ...initialState
      };
    case types.DASHBOARD_INIT_WEEK:
    case types.DASHBOARD_PREV_WEEK:
    case types.DASHBOARD_NEXT_WEEK:
    default:
      return state;
  }
}
