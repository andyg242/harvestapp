import axios from "axios"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { forwardRef } from "react";
import formidable from "formidable";
import { getPosts } from '../../utils/mdx-utils';
import * as Yup from "yup";

const formSchema = Yup.object({
  Title: Yup.string().required("Title is Requried"),
  Slug: Yup.string().required("Slug is Requried"),
  Description: Yup.string().required("Description is Requried"),
  Body: Yup.string().required("Body is Requried"),
});

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
  //console.log(session);
  const slug = req.url.split("slug=")[1];
  
  if (req.method === 'POST' && session) {
    const httpHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + session.accessToken
    };

    //console.log(httpHeaders);

    let isValidRequest=false;
    let formFields={};
    // const headers = { 'Authorization': 'Bearer ' + session.accessToken }; // auth header with bearer token
    try {
      formFields = await getFormFields(req);
      isValidRequest = await validateFromData(formFields, null);
    }
    catch (e) {
      res.status(500).send({ status: "error validating form" });
      //console.log(e);
      return;
    }
    if (isValidRequest) {
      let date = new Date();
      var publishDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
      formFields.PublishDate = publishDate;
      const reqbody = {
        "fields": formFields
      }

      try {

        res.send({
          status: "post saved"
        })
      } catch (err) {
        //console.log(err.response);
        if (!err ? .response) {
          res.status(400).send({
            error: "No Server Response",
          })
        } else if (err.response ? .code === 'InvalidAuthenticationToken') {
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
  else if (req.method === 'GET' && process.env.DATA_MODE === "local") {
    const markdownPosts = getPosts();

    if (typeof slug === 'string' && slug.length > 2) {
      let post = {
        title: "",
        slug: "",
        filePath: "",
        description: "",
        body: ""
      };
      markdownPosts.forEach(function(mdpost) {
        if (mdpost.data.slug === slug) {
          post = {
            title: mdpost.data.title,
            slug: mdpost.data.slug,
            description: mdpost.data.description,
            filePath: mdpost.filePath,
            body: mdpost.content,
            featuredimage: mdpost.data.featuredimage
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
      markdownPosts.forEach(function(mdpost) {
        //console.log(mdpost);
        let newpost = {
          title: mdpost.data.title,
          description: mdpost.data.description,
          filePath: mdpost.filePath,
          body: mdpost.content,
          slug: mdpost.data.slug,
          featuredimage: mdpost.data.featuredimage
        } 
        //console.log(newpost);
        posts.push(newpost);
      });
  
      res.send({
          content:
          posts
      });
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