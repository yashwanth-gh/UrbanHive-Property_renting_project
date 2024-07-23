import DB_Connect from "@/config/DB_Connect";
import User from "@/models/User";
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
      //* STEP 1 : connect to Db
      DB_Connect();
      //* STEP 2 : Check if user exists
      const user = await User.findOne({ email: profile.email });
      //* STEP 3 : If not create user and add to Db
      if (!user) {
        //* truncate the username if it is longer than 20 chars.
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      //* STEP 4 : Return true
      return true;
    },
    // Modifies the session object
    async session({ session }) {
      //* STEP 1 : connect to Db
      //* STEP 2 : Get user from DB
      const user = await User.findOne({ email: session.user.email });
      //* STEP 3 : Assign the userId to session
      session.user.id = user._id.toString();
      //* STEP 4 : Return session
      return session;
    },
  },
};
