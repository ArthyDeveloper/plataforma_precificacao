"use server"
import React, { useState } from "react";

const LoginForm = () => {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const bcrypt = require("bcryptjs");
  const saltRounds = 10;

  const mudarSetLembrar = (e) => {
    setLembrar(e.target.checked);
  };

  const login = async (user, senha) => {
    const url = "/api/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user, senha })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.userFound === true){
        console.log("Usuário Logado")
      } else {
        alert("Usuário(a) ou senha incorreto.")
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  async function teste(){
    console.log("Usuário: ", user, "| Senha: ", await bcrypt.hash(senha, saltRounds));
    console.log(await bcrypt.compare("1234", "$2b$10$XchmxvWc4h0uPC3tlK2HL.M0SSI7N7jcIkxw0gl1NU.n3fHzRHuqm"))
  }

  return (
    <div className="absolute rounded-sm text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[350px] bg-white" >
      <div className="absolute w-fit h-fit left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-3xl">Login</h1>
        <div className="relative mt-[30px] mb-[20px] w-fit h-auto left-1/2 transform -translate-x-1/2">
          <h2 className="absolute w-[65px] top-[-15px] left-[10px] bg-white">Usuário</h2>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} className="rounded-xl text-sm pl-[10px] pr-[10px] border-gray border-2 h-[40px] w-[180px]"></input>
        </div>
        <div className="relative w-fit h-auto left-1/2 transform -translate-x-1/2">
          <h2 className="absolute w-[55px] top-[-15px] left-[10px] bg-white">Senha</h2>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="rounded-xl text-sm pl-[10px] pr-[10px] border-gray border-2 h-[40px] w-[180px]"></input>
        </div>
        <button onClick={() => login(user, senha)} className="relative rounded-xl w-[80px] h-[35px] mt-[20px] bg-blue-400 hover:bg-blue-500">Entrar</button>
      </div>
    </div>
  );
};

export default LoginForm;