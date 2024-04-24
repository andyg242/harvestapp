import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { forwardRef } from "react";

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions)
  const slug = req.url.split("slug=")[1];

  if (session) {
    const headers = { 'Authorization': 'Bearer ' + session.accessToken }; // auth header with bearer token
    const graphendpointURL = `${process.env.GRAPH_HOST}/v1.0/sites/${process.env.SHAREPOINT_SITE}/lists/posts/items?expand=fields(select=Title,Description,Body,Slug)`;
    const graphres = await fetch(graphendpointURL, { headers });
    const graphposts = await graphres.json();
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
      if (typeof slug === 'string' && slug.length > 2) {
        let post = {
          title: "",
          slug: "",
          filePath: "",
          description: "",
          body: ""
        };
        graphposts.value.forEach(function(graphpost) {
          if (graphpost.fields.Slug === slug) {
            post = {
              title: graphpost.fields.Title,
              slug: graphpost.fields.Slug,
              filePath: graphpost.webUrl,
              description: graphpost.fields.Description,
              body: graphpost.fields.Body
            } 
          }
        });
      
        res.send({
          content:
            post
        })
      }
      else {
        let posts = [];
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
  }
  else {
    res.send({
      error: "Your session has timed out, please log in again.",
    })
  }
}