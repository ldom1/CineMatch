import type { NextApiRequest, NextApiResponse } from "next";
import users_movies from "../../src/models/users_movies";
import MongoDBConnect from "../../src/utils/connection";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { format } from "date-fns";

MongoDBConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    switch (method) {
      case "GET":
        res.status(405).json({ success: false });
        console.log("API - user_rating_create.tsx - No GET method:");
        break;

      case "POST":
        try {
          const timeElapsed = Date.now();
          const today = new Date(timeElapsed);
          const todayFormatted = format(today, "yyyy-MM-dd kk:mm:ss");

          var user_movie_id = `${req.body.user_name}-${req.body.movie_name}`;
          var rate_string = `${req.body.rate}/10`;

          // Check existence
          const exist = await users_movies.findOne({
            user_movie_id: user_movie_id,
          });

          if (exist) {
            // If exist, update
            await users_movies.updateOne(
              {
                user_name: req.body.user_name,
                movie_name: req.body.movie_name,
              },
              {
                rate: req.body.rate,
                rate_string: rate_string,
                updated_at: todayFormatted,
              }
            );
          } else {
            // If not exist, create
            await users_movies.create({
              user_movie_id: user_movie_id,
              user_name: req.body.user_name,
              movie_name: req.body.movie_name,
              movie_id: req.body.movie_id,
              rate: req.body.rate,
              rate_string: rate_string,
              updated_at: todayFormatted,
              timestamp: todayFormatted,
            });
          }

          res.status(200).json({ success: true });
        } catch (error) {
          res.status(400).json({ success: false });
          console.log("API - user_rating_create.tsx - POST Error:", error);
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
