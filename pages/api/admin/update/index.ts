import clientPromise from "../../../../lib/mongodb";
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
      if (passwordMatches){
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
                    [`user_DB.resumes.${updateField}`]: {
                      "janeiro": {
                        "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "2": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "3": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "4": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "5": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                      },
                      "fevereiro": {
                        "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "2": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "3": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "4": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "5": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                      },
                      "março": {
                        "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "2": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "3": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "4": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "5": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                      },
                      "abril": {
                        "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "2": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "3": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "4": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "5": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                      },
                      "maio": {
                        "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "2": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "3": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "4": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "5": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                      },
                      "junho": {
                        "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "2": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "3": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "4": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "5": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                      },
                      "julho": {
                        "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "2": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "3": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "4": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "5": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                      },
                      "agosto": {
                        "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "2": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "3": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "4": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "5": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                      },
                      "setembro": {
                        "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "2": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "3": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "4": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "5": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                      },
                      "outubro": {
                        "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "2": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "3": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "4": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "5": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                      },
                      "novembro": {
                        "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "2": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "3": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "4": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "5": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                      },
                      "dezembro": {
                        "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "2": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "3": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "4": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                        "5": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0}
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