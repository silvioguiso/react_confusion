import * as ActionTypes from './ActionTypes'

export const Comments = (
    state = {
        errMsg: null,
        comments: []
    }
    , action) => {
        switch(action.type){
            case ActionTypes.ADD_COMMENTS:
                return {...state, errMsg: null, comments: action.payload};

            case ActionTypes.COMMENTS_FAILED:
                return {...state, errMsg: action.payload, comments: []}

            case ActionTypes.ADD_COMMENT:
                var comment = action.payload;
                //We add the comment to the state which we have set to COMMENTS.
                return {...state, comments: state.comments.concat(comment)};

            default:
                return state;
        }
}