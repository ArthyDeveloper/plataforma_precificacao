"use server"
import clientPromise from "../../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function register(req:NextApiRequest, res:NextApiResponse){
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { user, password, name, userGreeting, senha, email, telefone, userType } = req.body;
  const bcrypt = require("bcryptjs");

  try{
    const client = await clientPromise;
    const db = client.db("Database");
    const col = db.collection("Users");

    const searchUser = await col.findOne({ "user.name": user, "user.userType": "admin" });
    if (searchUser){
      const passwordMatches = await bcrypt.compare(password, searchUser.user.password);
      if (passwordMatches){
        const encryptedUserPassword = await bcrypt.hash(senha, 12);
        const anoAtual = String(new Date().getFullYear());
        if (userType == "client"){
          await col.insertOne({
            "user": {
              "name": name,
              "nameGreeting": userGreeting,
              "password": encryptedUserPassword,
              "pwd": senha,
              "email": email,
              "number": telefone,
              "userType": "client"
            },
            "user_DB": {
              "serviceStatus": {
                "running": false,
                "price": "R$000,00"
              },
              "resumes":{
                [anoAtual]: {
                  "janeiro": {
                    "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "2": {"scheduled": true, "fileName": "Semana 2", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "3": {"scheduled": true, "fileName": "Semana 3", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "4": {"scheduled": true, "fileName": "Semana 4", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "5": {"scheduled": false, "fileName": "Semana 5", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                  },
                  "fevereiro": {
                    "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "2": {"scheduled": true, "fileName": "Semana 2", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "3": {"scheduled": true, "fileName": "Semana 3", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "4": {"scheduled": true, "fileName": "Semana 4", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "5": {"scheduled": false, "fileName": "Semana 5", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                  },
                  "março": {
                    "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "2": {"scheduled": true, "fileName": "Semana 2", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "3": {"scheduled": true, "fileName": "Semana 3", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "4": {"scheduled": true, "fileName": "Semana 4", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "5": {"scheduled": false, "fileName": "Semana 5", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                  },
                  "abril": {
                    "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "2": {"scheduled": true, "fileName": "Semana 2", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "3": {"scheduled": true, "fileName": "Semana 3", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "4": {"scheduled": true, "fileName": "Semana 4", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "5": {"scheduled": false, "fileName": "Semana 5", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                  },
                  "maio": {
                    "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "2": {"scheduled": true, "fileName": "Semana 2", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "3": {"scheduled": true, "fileName": "Semana 3", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "4": {"scheduled": true, "fileName": "Semana 4", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "5": {"scheduled": false, "fileName": "Semana 5", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                  },
                  "junho": {
                    "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "2": {"scheduled": true, "fileName": "Semana 2", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "3": {"scheduled": true, "fileName": "Semana 3", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "4": {"scheduled": true, "fileName": "Semana 4", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "5": {"scheduled": false, "fileName": "Semana 5", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                  },
                  "julho": {
                    "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "2": {"scheduled": true, "fileName": "Semana 2", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "3": {"scheduled": true, "fileName": "Semana 3", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "4": {"scheduled": true, "fileName": "Semana 4", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "5": {"scheduled": false, "fileName": "Semana 5", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                  },
                  "agosto": {
                    "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "2": {"scheduled": true, "fileName": "Semana 2", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "3": {"scheduled": true, "fileName": "Semana 3", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "4": {"scheduled": true, "fileName": "Semana 4", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "5": {"scheduled": false, "fileName": "Semana 5", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                  },
                  "setembro": {
                    "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "2": {"scheduled": true, "fileName": "Semana 2", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "3": {"scheduled": true, "fileName": "Semana 3", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "4": {"scheduled": true, "fileName": "Semana 4", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "5": {"scheduled": false, "fileName": "Semana 5", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                  },
                  "outubro": {
                    "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "2": {"scheduled": true, "fileName": "Semana 2", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "3": {"scheduled": true, "fileName": "Semana 3", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "4": {"scheduled": true, "fileName": "Semana 4", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "5": {"scheduled": false, "fileName": "Semana 5", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                  },
                  "novembro": {
                    "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "2": {"scheduled": true, "fileName": "Semana 2", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "3": {"scheduled": true, "fileName": "Semana 3", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "4": {"scheduled": true, "fileName": "Semana 4", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "5": {"scheduled": false, "fileName": "Semana 5", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                  },
                  "dezembro": {
                    "1": {"scheduled": true, "fileName": "Semana 1", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "2": {"scheduled": true, "fileName": "Semana 2", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "3": {"scheduled": true, "fileName": "Semana 3", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "4": {"scheduled": true, "fileName": "Semana 4", "fileLink": "none", "ganhando": 0, "perdendo": 0},
                    "5": {"scheduled": false, "fileName": "Semana 5", "fileLink": "none", "ganhando": 0, "perdendo": 0}
                  }
                }
              }
            }
          });
        } else if (userType == "admin"){
          await col.insertOne({
            "user": {
              "name": name,
              "password": encryptedUserPassword,
              "email": email,
              "number": telefone,
              "userType": "admin"
            }
          })
        }
        
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