import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function register(req:NextApiRequest, res:NextApiResponse){
  const { data } = req.query;
  const bcrypt = require("bcryptjs");

  try{
    const client = await clientPromise;
    const db = client.db("Database");
    const col = db.collection("Users");

    if (req.method === "POST" && Array.isArray(data) && data.length === 6){
      let validateAdmin = await col.findOne({"name": data[0], "userType": "admin"});
      if (validateAdmin != null){
        const compareEncryptedPassword = await bcrypt.compare(data[1], validateAdmin.password);
        if (compareEncryptedPassword == true){
          const userPassword = data[3];
          const userPasswordHash = await bcrypt.hash(userPassword, 12);
          await col.insertOne({
            "name": data[2],
            "password": userPasswordHash,
            "pwd": userPassword,
            "email": data[4],
            "number": data[5],
            "userType": "client"
          })

          res.status(200).json({
            insertion: true
          })
        } else {
          res.status(200).json({
            insertion: false
          })
        }
      } else {
        res.status(200).json({
          insertion: false
        })
      }
    }
  } catch(error) {
    console.log(error);
    res.status(500).json({ erro: error });
    return;
  }
}