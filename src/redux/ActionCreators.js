import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl'

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

//Thunk that returns function containing an inner function
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(reponse => reponse.json())
        .then(dishes => dispatch(addDishes(dishes)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errMsg) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMsg
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

//COMMENTS
export const fetchComments = () => (dispatch) => {
    
    return fetch(baseUrl + 'comments')
        .then(reponse => reponse.json())
        .then(comments => dispatch(addComments(comments)));
}

export const commentsFailed = (errMsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMsg
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

//PROMOS
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(reponse => reponse.json())
        .then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errMsg) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMsg
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});