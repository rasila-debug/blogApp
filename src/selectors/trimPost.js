import Parse from 'html-react-parser';

export default(blogBody) =>{
    
   const str= Parse(blogBody,{ trim: true });
  
    if(str.length <=2){
        return str;
    }  
    
   let i=0;
    const arr = str.map((el) =>{  
          if(i <=3){
              i++;
          
            return el.props.children;;
          }
       
    })
   
    return arr;
}