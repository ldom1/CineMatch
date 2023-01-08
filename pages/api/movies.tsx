import type { NextApiRequest, NextApiResponse } from "next";
import movies from "../../src/models/movies";
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
        try {
          const result = await movies.find({}).sort({ nb_of_views: -1 }).limit(10);
          res.status(200).json({ success: true, data: result });
        } catch (error) {
          res.status(400).json({ success: false });
          console.log("API - movies.tsx - GET Error:", error);
        }
        break;

      case "POST":
        res.status(405).json({ success: false });
        console.log("API - movies.tsx - No POST method");
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
