import { combineReducers } from 'redux';

// Import custom components
import componentReducer from './componentReducer';
import crudReducer from './crudReducer';

const rootReducer = combineReducers({
    comp: componentReducer,
    crud: crudReducer,
});

export default rootReducer;