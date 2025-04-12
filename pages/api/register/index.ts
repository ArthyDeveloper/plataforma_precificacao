import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function register(req:NextApiRequest, res:NextApiResponse){
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { user, password, name, senha, email, telefone } = req.body;
  const bcrypt = require("bcryptjs");

  try{
    const client = await clientPromise;
    const db = client.db("Database");
    const col = db.collection("Users");

    const searchUser = await col.findOne({ "name": user, "userType": "admin" })
    if (searchUser){
      const passwordMatches = await bcrypt.compare(password, searchUser.password);
      if (passwordMatches == true){
        const encryptedUserPassword = await bcrypt.hash(senha, 10);
        await col.insertOne({
          "name": name,
          "password": encryptedUserPassword,
          "pwd": senha,
          "email": email,
          "number": telefone,
          "userType": "client"
        });
        
        return res.status(200).json({
          "insertion": true
        });
      }
    }

    return res.status(200).json({
      "insertion": false
    })

  } catch(error) {
    console.log(error, "Deu erro aqui ó");
    res.status(500).json({ erro: error });
    return;
  }
}