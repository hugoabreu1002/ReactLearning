import * as ActionTypes from './ActionTypes';


export const Features = (state = {
    isLoading: true,
    errMess: null,
    features: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FEATURES:
            return { ...state, isLoading: false, errMess: null, features: action.payload };

        case ActionTypes.FEATURES_LOADING:
            return { ...state, isLoading: true, errMess: null, features: [] }

        case ActionTypes.FEATURES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};