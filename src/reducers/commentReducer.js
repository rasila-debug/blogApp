const commentDefaultState = [];

export default (state = commentDefaultState, action)=>{
 
    switch(action.type){
        case 'ADD_COMMENT':
            return [
              ...state,
                action.comment
            ]
        case 'REMOVE_COMMENT':
           return state.filter(({id}) => id !== action.id)
        case 'LIST_COMMENT':
            return action.comments
        default:
            return state

    }
}


