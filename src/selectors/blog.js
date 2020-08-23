
export default (blogs,{title='',searchBy='title'})=>{
    return blogs.filter((blog) =>{
        if(searchBy === 'title'){
            const titleMatch =blog.title.toLowerCase().includes(title.toLowerCase().trim());
            return titleMatch;
        }
        else if(searchBy === 'author'){
            const authorMatch = blog.author.toLowerCase().includes(title.toLowerCase().trim());
            return authorMatch;
        }
    })
 
 
}