import user from "../../../src/models/user"
import MongoDBConnect from "../../../src/utils/connection"

MongoDBConnect()

export default async (req, res) => {
  const { method } = req
  switch (method) {
    case "GET":
      try {
        const currResult = await user.find()
        res.status(200).json({ success: true, data: currResult })
      } catch (error) {
        res.status(400).json({ success: false })
        console.log("UserMailVerification: GET - Error:", error)
      }
      break

    case "POST":
      try {
        const currUser = await user.updateOne(
          { verifyEmailCode: req.query.verify_code },
          {
            $set: {
              verifyEmailCode: "verified",
            },
          }
        )
        res.status(200).json({ success: true, data: currUser })
      } catch (error) {
        res.status(400).json({ success: false })
        console.log(req.body)
        console.log("UserMailVerification: POST - Error:", error)
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
