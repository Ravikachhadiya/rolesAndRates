import * as actionTypes from '../actions/actionType';

let initialState = {
    rolesList: { data: [] },
    roleDetails: { data: [] },
}

export default function (state = initialState, action) {
    let newState = {};

    switch (action.type) {

        case actionTypes.ENTITY_FETCH:
            newState = Object.assign({}, state);
            newState[action.entity] = action.data;

            return newState;

        case actionTypes.MAKE_NULL:
            newState = Object.assign({}, state);
            newState[action.entity] = action.data;
            return newState;

        case actionTypes.RESET:
            newState = Object.assign({}, state);
            newState[action.entity] = { data: [] }
            return newState

        case actionTypes.RESET_ALL:
            newState = Object.assign({}, state);
            newState[action.entity] = {}
            return newState

        default:
            return state
    }
}
