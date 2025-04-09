import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function verifyLogin(req: NextApiRequest, res: NextApiResponse){
  const { entry } = req.query;
  const bcrypt = require("bcryptjs");

  try{
    const client = await clientPromise;
    const db = client.db("Database");
    const col = db.collection("Users");

    if (req.method === "GET" && Array.isArray(entry) && entry.length === 2){
      let searchUser = await col.findOne({"name": entry[0]});
      if (searchUser != null){
        const compareEncryptedPassword = await bcrypt.compare(entry[1], searchUser.password);
        if (compareEncryptedPassword == true){
          res.status(200).json({
            status: true,
            "userFound": compareEncryptedPassword,
            nome: entry[0],
            guiTheme: searchUser.guiTheme,
            userType: searchUser.type
          });
        }
      } else {
        res.status(204).json({
          "status": true,
          "userFound": false
        });
      }
    } else {
      res.status(200).json({
        "status": false,
        "reqType": req.method,
        "isArray": Array.isArray(entry),
        "arrayLength": entry!.length
      });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fail" });
    return;
  }
}