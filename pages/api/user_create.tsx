import type { NextApiRequest, NextApiResponse } from "next";
import user from "../../src/models/user";
import MongoDBConnect from "../../src/utils/connection";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

MongoDBConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  // const session = await unstable_getServerSession(req, res, authOptions);

  switch (method) {
    case "GET":
      console.log("API - user_create.tsx - No GET method");
      break;

    case "POST":
      try {
        const bcrypt = require("bcryptjs");
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const response = await user.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          mailaddress: req.body.mailaddress,
          passwordhash: hashedPassword,
          verifyEmailCode: req.body.verifyEmailCode,
        });
        res.status(200).json({ success: true, data: response });
      } catch (error) {
        res.status(400).json({ success: false });
        console.log("API - user_create.tsx - POST error:", error);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
