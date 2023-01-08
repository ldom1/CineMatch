import type { NextApiRequest, NextApiResponse } from "next";
import users_movies from "../../src/models/users_movies";
import MongoDBConnect from "../../src/utils/connection";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

MongoDBConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    switch (method) {
      case "GET":
        res.status(405).json({ success: false });
        console.log("API - get_user_rating.tsx - No GET method:");
        break;

      case "POST":
        try {
          const result = await users_movies.findOne({
            user_name: req.body.user_name,
            movie_name: req.body.movie_name,
          });

          if (result) {
            res
              .status(200)
              .json({ success: true, rate_exist: true, rate: result.rate });
          } else {
            res.status(200).json({ success: true, rate_exist: false, rate: 0 });
          }
        } catch (error) {
          res.status(400).json({ success: false });
          console.log("API - get_user_rating.tsx - POST Error:", error);
        }
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
