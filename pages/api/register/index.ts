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

    const searchUser = await col.findOne({ "user.name": user, "user.userType": "admin" });
    if (searchUser){
      const passwordMatches = await bcrypt.compare(password, searchUser.user.password);
      if (passwordMatches == true){
        const encryptedUserPassword = await bcrypt.hash(senha, 12);
        const anoAtual = String(new Date().getFullYear());
        await col.insertOne({
          "user": {
            "name": name,
            "password": encryptedUserPassword,
            "pwd": senha,
            "email": email,
            "number": telefone,
            "userType": "client"
          },
          "user_DB": {
            "serviceStatus": {
              "running": false,
              "remainingSheets": 5,
              "lastPaymentDate": "01/01"
            },
            
            "resumes":{
              [anoAtual]: {
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
          }
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