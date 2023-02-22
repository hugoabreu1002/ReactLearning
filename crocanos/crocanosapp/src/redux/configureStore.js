import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Items } from './items';
import { Posts } from './posts';
import { Features } from './features';
import { Comments } from './comments';
import { Leaders } from './leaders';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            posts: Posts,
            items: Items,
            features: Features,
            dishes: Dishes,
            comments: Comments,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}