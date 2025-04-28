import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function verifyLogin(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { user, senha } = req.body;
  const bcrypt = require("bcryptjs");

  try{
    const client = await clientPromise;
    const db = client.db("Database");
    const col = db.collection("Users");

    const searchUser = await col.findOne({"user.name": user, "user.userType": "admin"});
    if (searchUser){
      const passwordMatches = await bcrypt.compare(senha, searchUser.user.password);

      if (passwordMatches == true){
        const searchDocuments = await col.find({ "user.userType": "client" }).toArray();
        return res.status(200).json({
          status: true,
          searchDocuments
        });
      }
    } else {
      return res.status(200).json({
        "status": true,
        "foundDocuments": false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fail" });
    return;
  }
}