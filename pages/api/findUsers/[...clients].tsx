import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function verifyLogin(req: NextApiRequest, res: NextApiResponse){
  const { clients } = req.query;
  const bcrypt = require("bcryptjs");

  try{
    const client = await clientPromise;
    const db = client.db("Database");
    const col = db.collection("Users");

    if (req.method === "GET" && Array.isArray(clients) && clients.length === 3){
      let searchUser = await col.findOne({"name": clients[0], "userType": "admin"});
      if (searchUser != null){
        const compareEncryptedPassword = await bcrypt.compare(clients[1], searchUser.password);
        if (compareEncryptedPassword == true){
          let searchDocuments = await col.find({userType: clients[2]}).toArray();
          res.status(200).json({
            status: true,
            searchDocuments
          });
        }
      } else {
        res.status(204).json({
          "status": true,
          "foundDocuments": false
        });
      }
    } else {
      res.status(200).json({
        "status": false,
        "reqType": req.method,
        "isArray": Array.isArray(clients),
        "arrayLength": clients!.length
      });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fail" });
    return;
  }
}