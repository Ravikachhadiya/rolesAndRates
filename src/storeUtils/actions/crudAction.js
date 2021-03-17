import * as commonAction from './commonActions';
import { postData, getData, deleteData, putData } from '../httpUtil';
import { MAKE_NULL, RESET, RESET_ALL } from './actionType'

export function postAll(entity, data, entityName) {
    return function (dispatch) {
        return postData(entity, data).then((response) => {
            // console.log(response)
            dispatch(commonAction.fetch(entityName, response));
        })
    };
}

export function getAll(entity, entityName) {
    return function (dispatch) {
        return getData(entity).then((response) => {
            // console.log(response.data);
            dispatch(commonAction.fetch(entityName, response));
        })
    };
}

export function deleteAll(entity, entityName) {
    return function (dispatch) {
        return deleteData(entity).then((response) => {
            // console.log(response.data)
            dispatch(commonAction.fetch(entityName, response));
        });
    }
}

export function putAll(entity, data, entityName) {
    //console.log(data);
    return function (dispatch) {
        return putData(entity, data).then((response) => {
            // console.log(response.data)
            dispatch(commonAction.fetch(entityName, response));
        });
    }
}

export const makeReduxNull = (entity, value) => {
    return function (dispatch) {
        return dispatch({ type: MAKE_NULL, entity: entity, data: value })
    }
}

export const reset = (entity) => {
    return function (dispatch) {
        return dispatch({ type: RESET, entity: entity })
    }
}

export const resetAll = (entity) => {
    return function (dispatch) {
        return dispatch({ type: RESET_ALL, entity: entity })
    }
}