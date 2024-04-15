# Harvest CMS Client for Sharepoint

This client uses NextJS, Authentication to Azure Active Directory and Microsoft Graph API to provide a headless CMS experience for Sharepoint Lists




Repos and Tutorials Used

- [NextAuth, for SSO Authentication](https://next-auth.js.org/)

- [Netlify Next.js Blog Template designed by Bejamas](https://user-images.githubusercontent.com/43764894/223762618-62742b4e-9424-44a7-8e85-9f7e4e19db54.png)

- [NextJS 13 / React Single Sign-On](https://blog.designly.biz/nextjs-13-react-single-sign-on-sso-authentication-via-azure-active-directory)

- [Microsoft Tutorials, Audio/Video Calling from a Custom App into a Teams Meeting](https://microsoft.github.io/MicrosoftCloud/tutorials/docs/ACS-to-Teams-Meeting/)

- [Building Javascript Apps with Microsoft Graph](https://learn.microsoft.com/en-us/graph/tutorials/javascript?tabs=aad)


### Setting Up Locally

If you're doing it locally, start with clicking the [use this template](https://github.com/netlify-templates/nextjs-blog-theme/generate) button on GitHub. This will create a new repository with this template's files on your GitHub account. Once that is done, clone your new repository and navigate to it in your terminal.

From there, you can install the project's dependencies by running:

```shell
yarn install
```

Finally, you can run your project locally with:

```shell
yarn run dev
```

Open your browser and visit <http://localhost:3000>, your project should be running!

## Configuring the blog

The config is based on environment variables to make it easy to integrate with any Jamstack platform, like Netlify.

Here are the variables you can edit:
| Variable | Description | Options
| --- | --- | --- |
| `BLOG_NAME` | the name of your blog, displayed below the avatar ||
| `BLOG_TITLE` | the main header (`h1`) on the home page ||
| `BLOG_FOOTER_TEXT`| the text in the footer ||
| `BLOG_THEME` | the theme to pass to Tailwind | default |
| `BLOG_FONT_HEADINGS` | the font-family for all HTML headings, from `h1` to `h6`| sans-serif (default), serif, monospace|
| `BLOG_FONT_PARAGRAPHS` | the font-family for all other HTML elements | sans-serif (default), serif, monospace|

