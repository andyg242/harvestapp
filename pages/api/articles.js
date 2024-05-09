import axios from "axios"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { forwardRef } from "react";
import formidable from "formidable";
import * as Yup from "yup";

const formSchema = Yup.object({
  Title: Yup.string().required("Title is Requried"),
  Slug: Yup.string().required("Slug is Requried"),
  Description: Yup.string().required("Description is Requried"),
  Body: Yup.string().required("Body is Requried"),
});

// async function saveFormData(formfields, graphURL, headers) {
//   const reqbody = {
//     "fields": formfields
//   }
//   const graphendpointURL = graphURL + `/items)`;
//   const graphres = await fetch(graphendpointURL, {
//     Method: 'POST',
//     Headers: headers,
//     Body: reqbody,
//     Cache: 'default'
//   });
//   //const graphres = await fetch(graphendpointURL, { headers });
//   const graphpostaddresp = await graphres.json();
//   console.log(graphpostaddresp.error);
//   if (graphpostaddresp.error){
//     if (graphpostaddresp.error.code === 'InvalidAuthenticationToken') {
//       res.send({
//         error: "Your session has timed out, please log in again.",
//       })
//     }
//     else {
//       res.send({
//         error: "Sorry but there was an error retrieving.",
//       })
//     }
//   }
// }

async function validateFromData(fields, files) {
  try {
    await formSchema.validate({ ...fields, ...files });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function getFormFields(req) {
  const form = formidable({ multiples: true });
  const formData = new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject("error");
      }
      resolve({ fields, files });
    });
  });
  const { fields, files } = await formData;
  const formFields = {
    "Title": fields.title[0].trimLeft(),
    "Slug": fields.slug[0].trimLeft(),
    "Description": fields.description[0].trimLeft(),
    "Body": fields.body[0].trimLeft(),
    "PublishDate": ""
  }
  return formFields;
}

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions)
  const slug = req.url.split("slug=")[1];
  const graphPoststURL = `${process.env.GRAPH_HOST}/v1.0/sites/${process.env.SHAREPOINT_SITE}/lists/posts`;
  const graphItemsURL = graphPoststURL + `/items`;
  if (session) {
    const httpHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + session.accessToken
    };
    // console.log(graphItemsURL);
    // console.log(httpHeaders);
    if (req.method === 'POST') {
      let isValidRequest=false;
      let formFields={};
      // const headers = { 'Authorization': 'Bearer ' + session.accessToken }; // auth header with bearer token
      try {
        formFields = await getFormFields(req);
        isValidRequest = await validateFromData(formFields, null);
      }
      catch (e) {
        res.status(500).send({ status: "error validating form" });
        console.log(e);
        return;
      }
      if (isValidRequest) {
        let date = new Date();
        var publishDate= (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
        formFields.PublishDate = publishDate;
        const reqbody = {
          "fields": formFields
        }
        console.log(reqbody);
        // console.log(graphItemsURL);
        // console.log(httpHeaders);
        // console.log(JSON.stringify(reqbody));
        try {
          const response = await axios.post(graphItemsURL,
              JSON.stringify(reqbody),
              {
                  headers: httpHeaders
              }
          );
          console.log(response?.data);
          // console.log(response?.accessToken);
          //console.log(JSON.stringify(response));
          res.send({
            status: "post saved"
          })
        }
        catch (err) {
            console.log(err.response);
            if (!err?.response) {
              res.status(400).send({
                error: "No Server Response",
              })
            } else if (err.response?.code === 'InvalidAuthenticationToken') {
              res.status(401).send({
                error: "Your session has timed out, please log in again.",
              })
            } else {
              res.status(500).send({
                error: "Error Saving Entry",
              })
            }
        }
      }
    }
    else {
      const headers = { 'Authorization': 'Bearer ' + session.accessToken }; // auth header with bearer token
      const graphItemsQueryURL = graphItemsURL + `?expand=fields(select=Title,Description,Body,Slug)`;
      const graphres = await fetch(graphItemsQueryURL, { headers });
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
  }
  else {
    res.send({
      error: "Your session has timed out, please log in again.",
    })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};