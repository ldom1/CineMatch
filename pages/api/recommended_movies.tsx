import type { NextApiRequest, NextApiResponse } from "next";
import recommended_movies from "../../src/models/recommended_movies";
import MongoDBConnect from "../../src/utils/connection";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

MongoDBConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    switch (method) {
      case "POST":
        try {
          const result = await recommended_movies.find({
            user_email: req.body.user_email,
          });
          res.status(200).json({ success: true, data: result });
        } catch (error) {
          res.status(400).json({ success: false });
          console.log("API - recommended_movies.tsx - GET Error:", error);
        }
        break;

      case "GET":
        res.status(200).json({ success: true });
        console.log("API - recommended_movies.tsx - No GET method");
        break;
    }
  } else {
    // Not Signed in
    res.status(401).json({
      status: 401,
      response: "You are not connected, please ensure you are signed in.",
    });
  }
  res.end();
};
