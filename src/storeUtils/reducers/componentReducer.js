import * as actionTypes from '../actions/actionType';

let initialState = {
    ratePeriod: { level: 0, isAdd: true, row: 0 },
    lastAction: ''
}

export default function (state = initialState, action) {
    let newState = {};

    switch (action.type) {

        case actionTypes.ADD_RATE_PERIOD:
            newState = Object.assign({}, state);
            newState["ratePeriod"] = action.data;

            return newState

        case actionTypes.UPDATE_ACTION:
            newState = Object.assign({}, state);
            newState['lastAction'] = action.data;

            return newState
        default:
            return state
    }
}