import clientPromise from "../../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== "POST"){
    return(res.status(204).json({ "Erro": "Método inválido." }))
  }

  const { clientUser, clientPassword } = req.body;
  const bcrypt = require("bcryptjs");

  try{
    const client = await clientPromise;
    const db = client.db("Database");
    const col = db.collection("Users");

    const searchUser = await col.findOne({ "user.name": clientUser, "user.userType": "client" })
    if (searchUser){
      const passwordMatches = await bcrypt.compare(clientPassword, searchUser.user.password);
      if (passwordMatches){
        const infos = await col.findOne({ "user.userType": "infos" })
        if (infos){
          res.status(200).json({
          status: true,
          infos
          })
        }
        return
      } else {
        res.status(401).json({
          status: false,
          reason: "Usuário ou senha incorretos."
        })
        return
      }
    } else {
      res.status(401).json({
        status: false,
        reason: "Usuário ou senha incorretos."
      })
      return
    }
  } catch(error) {
    res.status(500).json({
      status: false,
      erro: error
    })
    return
  }
}