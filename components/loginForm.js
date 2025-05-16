"use server"
import React, { useState } from "react";
import "../styles/loginPage.css";

const LoginForm = ({onLoginSuccess}) => {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");

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
      if (data.userFound){
        onLoginSuccess({
          name: user,
          password: senha,
          userType: data.userType
        });
      } else {
        alert("Usuário(a) ou senha incorretos.")
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  return (
    <div className="centerDiv panel">
      <div className="centerDiv loginBox">
        <h1 className="loginH1">Login</h1>
        <div className="inputDiv mb-2">
          <h2 className="inputH2">Usuário</h2>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} className="input"></input>
        </div>
        <div className="inputDiv">
          <h2 className="inputH2">Senha</h2>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="input"></input>
        </div>
        <button onClick={() => login(user, senha)} className="loginBtn">Entrar</button>
      </div>
    </div>
  );
};

export default LoginForm;