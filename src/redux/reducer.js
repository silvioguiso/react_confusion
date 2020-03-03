//Data
import { DISHES } from '../shared/dishes'
import { PROMOTIONS }  from '../shared/promotions'
import { LEADERS } from '../shared/leaders'
import { COMMENTS } from '../shared/comments'

export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    leaders: LEADERS,
    promotions: PROMOTIONS
};

//the '=' is the es6 way to set a default value when state is undefined
export const Reducer = (state = initialState, action) => {
    return state;
};