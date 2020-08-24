import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { UNSPLASH, unsplashReducer } from '../features/ImageGrid/slice';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        [UNSPLASH]: unsplashReducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
