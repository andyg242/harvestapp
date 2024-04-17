 
export const getGraphPosts = () => {  
   

  
    let posts = [];
 
        const getPosts = async () =>
        {
            const response = await fetch(`/sites/$process.env.SHAREPOINT_SITE/lists/posts/items?expand=fields(select=Title,Description,Body)'`);
            const apiposts =  await response.json();
            posts = apiposts;
        };
    return posts;             
};

