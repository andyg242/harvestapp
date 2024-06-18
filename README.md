# Harvest - A simple markdown blog

This client uses NextJS, Authentication to Azure Active Directory and Microsoft Graph API to provide a logged in admin experience.


Repos and Tutorials Used

- [NextAuth, for SSO Authentication](https://next-auth.js.org/)

- [Netlify Next.js Blog Template designed by Bejamas](https://user-images.githubusercontent.com/43764894/223762618-62742b4e-9424-44a7-8e85-9f7e4e19db54.png)

- [NextJS 13 / React Single Sign-On](https://blog.designly.biz/nextjs-13-react-single-sign-on-sso-authentication-via-azure-active-directory)

- [Microsoft Tutorials, Audio/Video Calling from a Custom App into a Teams Meeting](https://microsoft.github.io/MicrosoftCloud/tutorials/docs/ACS-to-Teams-Meeting/)

- [Building Javascript Apps with Microsoft Graph](https://learn.microsoft.com/en-us/graph/tutorials/javascript?tabs=aad)

- [Microsoft Graph Permissions Ref](https://learn.microsoft.com/en-us/graph/permissions-reference#all-permissions)

- [Working with Sharepoint List Items in Graph](https://learn.microsoft.com/en-us/graph/api/resources/list?view=graph-rest-1.0)

### Setting Up Locally

If you're doing it locally, start with clicking the [use this template](https://github.com/netlify-templates/nextjs-blog-theme/generate) button on GitHub. This will create a new repository with this template's files on your GitHub account. Once that is done, clone your new repository and navigate to it in your terminal.

From there, you can install the project's dependencies by running:

```shell
npm install
```

Finally, you can run your project locally with:

```shell
npm run dev
```

Open your browser and visit <http://localhost:3000>, your project should be running!

## Configuring the blog

The config is based on environment variables. Create an .env.local file or provide the following process env variables to the app. To configure an app in Azure AD, use [thiese instructions](https://blog.designly.biz/nextjs-13-react-single-sign-on-sso-authentication-via-azure-active-directory).

Here are the variables you can edit:
| Variable | Description | Options
| --- | --- | --- |
| `AZURE_AD_CLIENT_ID` | Client ID of your Azure AD App ||
| `AZURE_AD_CLIENT_SECRET` | Client Secret of your Azure AD App ||
| `AZURE_AD_TENANT_ID` | Tenant ID of your Azure AD App ||
| `NEXTAUTH_SECRET` | Secret string for Azure AD App ||
|`WEB_HOST` | Web hostname for hosted app||
| `BLOG_NAME` | used for page meta ||
| `BLOG_TITLE` | Used for meta and front page h1 ||
| `BLOG_DESCRIPTION`| used for page meta ||

