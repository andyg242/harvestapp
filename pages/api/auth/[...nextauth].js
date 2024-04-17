import NextAuth from "next-auth"
import AzureADProvider from 'next-auth/providers/azure-ad';

export const authOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scope:
            "openid email profile user.read sites.fullControl.all"
        },
      },
    })
  ],
  callbacks: {
        async jwt({ token, account }) {
            
        // Persist the OAuth access_token to the token right after signin
        if (account) {
            token.accessToken = account.access_token
        }
        return token
        },
        async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        session.accessToken = token.accessToken
        
        return session
        },
        async signIn({ profile }) {
            try {
                // console.log("User Profile Data");
                // console.log(profile);
                return true;
            } catch (error) {
                console.log("///////////////////////////////////");
                console.log("callback error");
                console.log(error);
                console.log("///////////////////////////////////");
                return false;
            }
        }
    }
}



export default NextAuth(authOptions);