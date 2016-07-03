import { combineReducers } from 'redux-immutablejs';

import exercise from '_reducers/exercise';
import points from '_reducers/eventTracking';

const exerciseApp = combineReducers({
    exercise,
    points
});

export default exerciseApp;