import * as ActionTypes from './ActionTypes';


export const Posts = (state = {
    isLoading: true,
    errMess: null,
    dishes: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_POSTS:
            return { ...state, isLoading: false, errMess: null, posts: action.payload };

        case ActionTypes.POSTS_LOADING:
            return { ...state, isLoading: true, errMess: null, posts: [] }

        case ActionTypes.POSTS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};