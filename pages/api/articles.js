import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { forwardRef } from "react"

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    //console.log("hi from articles")
    const headers = { 'Authorization': 'Bearer ' + session.accessToken }; // auth header with bearer token
    const graphendpointURL = `${process.env.GRAPH_HOST}/v1.0/sites/${process.env.SHAREPOINT_SITE}/lists/posts/items?expand=fields(select=Title,Description,Body,Slug)`;
    //const graphendpointURL = `${process.env.GRAPH_HOST}/v1.0/sites/root`;
    //console.log(graphendpointURL);
    //console.log(headers);
    const graphres = await fetch(graphendpointURL, { headers });
    const graphposts = await graphres.json();
    //console.log(graphposts);
    if (graphposts.error){
      if (graphposts.error.code === 'InvalidAuthenticationToken') {
        res.send({
          error: "Your session has timed out, please log in again.",
        })
      }
      else {
        res.send({
          error: "Sorry but there was an error retrieving.",
        })
      }
    }
    else {
      let posts = [
        {
          title: "Test Title",
          slug: "test",
          filePath:"sdfsfsfsdfsf121",
          description: "Test Description",
          date: "4/17/2024"
        },
        {
          title: "Another Title",
          slug: "test2",
          filePath:"sdfsfsfsdfsf4564",
          description: "Another Description",
          date: "4/17/2024"
        },
      ];
      let urls = [];
        graphposts.value.forEach(function(graphpost) {
        let newpost = {
          title: graphpost.fields.Title,
          slug: graphpost.fields.Slug,
          filePath: graphpost.webUrl,
          description: graphpost.fields.Description,
          body: graphpost.fields.Body
        } 
        posts.push(newpost);
      });
      res.send({
        content:
          posts
      })
    }
  }
  else {
    res.send({
      error: "Your session has timed out, please log in again.",
    })
  }
}