import { Db } from "mongodb";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    //Invoked on successful signin
    async signIn({ profile }) {
      //& STEP 1 : connect to Db
      //& STEP 2 : Check if user exists
      //& STEP 3 : If not create user and add to Db
      //& STEP 4 : Return true
    },
    // Modifies the session object
    async session({ session }) {
      //& STEP 1 : connect to Db
      //& STEP 2 : Get user from DB
      //& STEP 3 : Assign the userId to session
      //& STEP 4 : Return session
    },
  },
};
