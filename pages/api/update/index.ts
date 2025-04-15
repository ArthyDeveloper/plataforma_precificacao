import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function update(req:NextApiRequest, res:NextApiResponse){
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { user, password, userName, updateField, updateData } = req.body;
  const bcrypt = require("bcryptjs");

  try{
    const client = await clientPromise;
    const db = client.db("Database");
    const col = db.collection("Users");

    const searchUser = await col.findOne({ "name": user, "userType": "admin" });
    if (searchUser){
      const passwordMatches = await bcrypt.compare(password, searchUser.password);
      if (passwordMatches == true){
        const searchDocument = await col.findOne({ "name": userName });
        if (searchDocument){
          await col.updateOne({ "name": userName },
            {
              $set:{
                [updateField]: updateData
              }
            });
          
          return res.status(200).json({
            "update": true
          });
        }
      }
    }

    return res.status(200).json({
      "update": false
    })

  } catch(error) {
    console.log(error, "Deu erro aqui ó");
    res.status(500).json({ erro: error });
    return;
  }
}