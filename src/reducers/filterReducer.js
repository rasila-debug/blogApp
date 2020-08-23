

const filterReducerDefaultState ={
    title:'',
    searchBy:'title'
}
export default (state = filterReducerDefaultState,filter)=>{
    switch(filter.type){ 
        case 'SET_TITLE_FILTER':
            return{
                ...state,
                title:filter.title
            }    
        case 'SEARCH_BY_TITLE':
            return{
                ...state,               
                searchBy:'title'
            }
        case 'SEARCH_BY_AUTHOR':
            return{
                ...state,               
                searchBy:'author'
            }
        default:
            return state;
    }
}