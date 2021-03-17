import { ADD_RATE_PERIOD, UPDATE_ACTION } from "./actionType"

export const addRatePeriod = (value) => {
    return function (dispatch) {
        return dispatch({ type: ADD_RATE_PERIOD, data: value })
    }
}

export const updateAction = (value) => {
    return function (dispatch) {
        return dispatch({ type: UPDATE_ACTION, data: value })
    }
}