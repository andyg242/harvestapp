export const getGlobalData = () => {
    const blogName = process.env.BLOG_NAME
      ? decodeURI(process.env.BLOG_NAME)
      : 'Harvest';
    const blogTitle = process.env.BLOG_TITLE
      ? decodeURI(process.env.BLOG_TITLE)
      : 'Harvest: A tiny blog app';
    const blogDescription = process.env.BLOG_DESCRIPTION
      ? decodeURI(process.env.BLOG_DESCRIPTION)
      : 'This is Harvest, a tiny blogging app that uses NextJS and Mongo';
    const footerText = process.env.BLOG_FOOTER_TEXT
      ? decodeURI(process.env.BLOG_FOOTER_TEXT)
      : 'All rights reserved.';
  
    return {
      blogName,
      blogTitle,
      blogDescription,
      footerText,
    };
};
  