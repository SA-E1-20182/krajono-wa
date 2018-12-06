import { LOGIN, LOGOUT } from '../constants/action-types.js';

const rootReducer = (state = {currentUser: {}, loggedIn: false}, action) => {
  switch(action.type) {
    case LOGIN:
      return Object.assign({}, state, { 
        currentUser: action.payload.user, 
        loggedIn: true
      });

    case LOGOUT:
      return Object.assign({}, state, { 
        currentUser: {}, 
        loggedIn: false 
      });
      
    default:
      return state;
  }
};

export default rootReducer;