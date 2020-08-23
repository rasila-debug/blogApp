export default (state= {},action)=>{
    switch(action.type){
        case 'LOGIN':
            return{
                uid:action.uid,
                userName:action.userName
            };
        case 'LOGOUT':
            return{};
        default:
            return state;
    }
};