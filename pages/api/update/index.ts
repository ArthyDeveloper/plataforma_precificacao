import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function update(req:NextApiRequest, res:NextApiResponse){
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { user, password, updateOperation, userName, updateField, updateData } = req.body;
  const bcrypt = require("bcryptjs");

  try{
    const client = await clientPromise;
    const db = client.db("Database");
    const col = db.collection("Users");

    const searchUser = await col.findOne({ "user.name": user, "user.userType": "admin" });
    if (searchUser){
      const passwordMatches = await bcrypt.compare(password, searchUser.user.password);
      if (passwordMatches == true){
        const searchDocument = await col.findOne({ "user.name": userName });
        if (searchDocument){
          switch(updateOperation){
            case "set":
              await col.updateOne({ "user.name": userName },
                {
                  $set:{
                    [updateField]: updateData
                  }
                });
                break;
            
            case "unset":
              await col.updateOne({ "user.name": userName },
                {
                  $unset:{
                    [updateField]: ""
                  }
                });
                break;
            
            case "rename":
              await col.updateOne({ "user.name": userName },
                {
                  $rename:{
                    [updateField]: updateData
                  }
                });
                break;
            
            case "addyear":
              await col.updateOne({ "user.name": userName },
                {
                  $set:{
                    [`user_DB.resumes.${updateData}`]: {
                      "janeiro": {
                        "1": [true, "Período", "LinkArquivo", 0, 0],
                        "2": [true, "Período", "LinkArquivo", 0, 0],
                        "3": [true, "Período", "LinkArquivo", 0, 0],
                        "4": [true, "Período", "LinkArquivo", 0, 0],
                        "5": [true, "Período", "LinkArquivo", 0, 0]
                      },
                      "fevereiro": {
                        "1": [true, "Período", "LinkArquivo", 0, 0],
                        "2": [true, "Período", "LinkArquivo", 0, 0],
                        "3": [true, "Período", "LinkArquivo", 0, 0],
                        "4": [true, "Período", "LinkArquivo", 0, 0],
                        "5": [true, "Período", "LinkArquivo", 0, 0]
                      },
                      "março": {
                        "1": [true, "Período", "LinkArquivo", 0, 0],
                        "2": [true, "Período", "LinkArquivo", 0, 0],
                        "3": [true, "Período", "LinkArquivo", 0, 0],
                        "4": [true, "Período", "LinkArquivo", 0, 0],
                        "5": [true, "Período", "LinkArquivo", 0, 0]
                      },
                      "abril": {
                        "1": [true, "Período", "LinkArquivo", 0, 0],
                        "2": [true, "Período", "LinkArquivo", 0, 0],
                        "3": [true, "Período", "LinkArquivo", 0, 0],
                        "4": [true, "Período", "LinkArquivo", 0, 0],
                        "5": [true, "Período", "LinkArquivo", 0, 0]
                      },
                      "maio": {
                        "1": [true, "Período", "LinkArquivo", 0, 0],
                        "2": [true, "Período", "LinkArquivo", 0, 0],
                        "3": [true, "Período", "LinkArquivo", 0, 0],
                        "4": [true, "Período", "LinkArquivo", 0, 0],
                        "5": [true, "Período", "LinkArquivo", 0, 0]
                      },
                      "junho": {
                        "1": [true, "Período", "LinkArquivo", 0, 0],
                        "2": [true, "Período", "LinkArquivo", 0, 0],
                        "3": [true, "Período", "LinkArquivo", 0, 0],
                        "4": [true, "Período", "LinkArquivo", 0, 0],
                        "5": [true, "Período", "LinkArquivo", 0, 0]
                      },
                      "julho": {
                        "1": [true, "Período", "LinkArquivo", 0, 0],
                        "2": [true, "Período", "LinkArquivo", 0, 0],
                        "3": [true, "Período", "LinkArquivo", 0, 0],
                        "4": [true, "Período", "LinkArquivo", 0, 0],
                        "5": [true, "Período", "LinkArquivo", 0, 0]
                      },
                      "agosto": {
                        "1": [true, "Período", "LinkArquivo", 0, 0],
                        "2": [true, "Período", "LinkArquivo", 0, 0],
                        "3": [true, "Período", "LinkArquivo", 0, 0],
                        "4": [true, "Período", "LinkArquivo", 0, 0],
                        "5": [true, "Período", "LinkArquivo", 0, 0]
                      },
                      "setembro": {
                        "1": [true, "Período", "LinkArquivo", 0, 0],
                        "2": [true, "Período", "LinkArquivo", 0, 0],
                        "3": [true, "Período", "LinkArquivo", 0, 0],
                        "4": [true, "Período", "LinkArquivo", 0, 0],
                        "5": [true, "Período", "LinkArquivo", 0, 0]
                      },
                      "outubro": {
                        "1": [true, "Período", "LinkArquivo", 0, 0],
                        "2": [true, "Período", "LinkArquivo", 0, 0],
                        "3": [true, "Período", "LinkArquivo", 0, 0],
                        "4": [true, "Período", "LinkArquivo", 0, 0],
                        "5": [true, "Período", "LinkArquivo", 0, 0]
                      },
                      "novembro": {
                        "1": [true, "Período", "LinkArquivo", 0, 0],
                        "2": [true, "Período", "LinkArquivo", 0, 0],
                        "3": [true, "Período", "LinkArquivo", 0, 0],
                        "4": [true, "Período", "LinkArquivo", 0, 0],
                        "5": [true, "Período", "LinkArquivo", 0, 0]
                      },
                      "dezembro": {
                        "1": [true, "Período", "LinkArquivo", 0, 0],
                        "2": [true, "Período", "LinkArquivo", 0, 0],
                        "3": [true, "Período", "LinkArquivo", 0, 0],
                        "4": [true, "Período", "LinkArquivo", 0, 0],
                        "5": [true, "Período", "LinkArquivo", 0, 0]
                      }
                    }
                  }
                });
                break;
            case "test":{
              return res.status(200).json({
                "update": true,
                "operação": updateOperation
              });
            }
          }
          
          return res.status(200).json({
            "update": true,
            "operação": updateOperation
          });
        }
      }
    }

    return res.status(200).json({
      "update": false,
      "data": user, password, updateOperation, userName, updateField, updateData
    })

  } catch(error) {
    console.log(error, "Deu erro aqui ó");
    res.status(500).json({ erro: error });
    return;
  }
}