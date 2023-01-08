import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import user from "../../../src/models/user"
import MongoDBConnect from "../../../src/utils/connection"

MongoDBConnect()

export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
        firstname: {
          type: "text",
        },
      },

      async authorize(credentials) {
        const email = credentials.email
        const password = credentials.password
        const currUser = await user.findOne({ mailaddress: email })

        if (!currUser) {
          throw new Error("account doesn't exist")
        } else {
          let respondedUser = await signInUser({
            password: password,
            user: currUser,
          })

          let testSession = {
            email: respondedUser.mailaddress,
            name: respondedUser.firstname,
          }
          return testSession
        }
      },
    }),
  ],
  database: process.env.NEXT_PUBLIC_MONGO_URI,
}

export default NextAuth(authOptions)

const signInUser = async ({ password, user }) => {
  if (!user.passwordhash) {
    throw new Error("please add password")
  }

  //if (user.verifyEmailCode != "verified") {
  //  throw new Error("Email not verified")
  //}

  var bcrypt = require('bcryptjs')
  const isMatch = await bcrypt.compare(password, user.passwordhash)
  if (!isMatch) {
    throw new Error("wrong password")
  }
  return user
}
