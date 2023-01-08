import type { NextApiRequest, NextApiResponse } from "next";
import user from "../../src/models/user";
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
        console.log("API - get_username.tsx - No GET method:");
        break;

      case "POST":
        try {
          const result = await user.findOne({
            mailaddress: req.body.email,
          });
          var username = `${result.firstname}_${result.lastname}`;
          res.status(200).json({ success: true, username: username });
        } catch (error) {
          res.status(400).json({ success: false });
          console.log("API - get_username.tsx - POST Error:", error);
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
