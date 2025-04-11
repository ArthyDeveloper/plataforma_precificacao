import React, {useState, useEffect} from "react";
import "../styles/dashboardAdmin.css";

const Dashboard_Admin = ({user}) => {
  const [usuário, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [admin, setAdmin] = useState("");
  const [adminPwd, setAdminPwd] = useState("");
  const [activePage, setActivePage] = useState("");
  const [usersDocuments, setUsersDocuments] = useState("");

  const mudarPágina = (página) => {
    setActivePage(página);
  }

  const buttonClasses = (página) => activePage === página ? "!bg-gray-900 text-white" : "!bg-gray-800";

  async function listUsers(admin, adminPwd){
    const url = `/api/findUsers/${admin}/${adminPwd}/client`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data?.searchDocuments?.length) {
        console.log(data)
        setUsersDocuments(data.searchDocuments);
      } else {
        setUsersDocuments([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsersDocuments([]);
    }
  }

  useEffect(() => {
    {/* Trocar para aceitar login de admin após painel admin */}
    listUsers("Admin", "123");
  }, []);

  async function register(){
    console.log(admin, adminPwd, user, senha, email, telefone);

    if(user == "" || senha == "" || email == "" || telefone == ""){
      alert("Há campos vazios!")
    } else {
      const url = `/api/register/${admin}/${adminPwd}/${user}/${senha}/${email}/${telefone}`;
      fetch(url,{
        method: "POST"
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  async function update(){
    alert("Update!");
  }

  return(
    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 overflow-x-hidden">
      <div className="relative rounded-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] bg-gray-700 overflow-hidden">
        {/* Top Bar - Options */}
        <div className="relative rounded-t-sm w-full h-[40px] bg-gray-800 justify-evenly flex text-white text-center">
          <button className={`btnAdminSelector ${buttonClasses("Usuários")}`}
            onClick={() => mudarPágina("Usuários")}
          >Usuários</button>
          <button className={`btnAdminSelector ${buttonClasses("Registrar")}`}
            onClick={() => mudarPágina("Registrar")}
          >Registrar</button>
          <button className={`btnAdminSelector ${buttonClasses("Update")}`}
            onClick={() => mudarPágina("Update")}
          >Update</button>
        </div>

        <div className="relative w-full h-[90%] bg-gray-700">
          {/* Exibe páginas de acordo com estado ativo. */}

          {/* Users Form */}
          {activePage === "Usuários" && (
            <div className="centerDiv usersDiv">
              {usersDocuments.map((user, index) => (
                <div className={`userBox ${index === 0 ? "!mt-0" : ""}`} key={index}>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p>{`Email: ${user.email}`}</p>
                  <p>{`Telefone: ${user.number}`}</p>
                </div>
              ))}
            </div>
          )}

          {/* Register Form */}
          {activePage === "Registrar" && (
            <div className="adminInputDiv">
              <input value={usuário} onChange={(e) => setUser(e.target.value)} className="adminInput !mt-0" placeholder="Nome"/>
              <input value={senha} onChange={(e) => setSenha(e.target.value)} className="adminInput" placeholder="Senha"/>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="adminInput" placeholder="Email"/>
              <input value={telefone} onChange={(e) => setTelefone(e.target.value)} className="adminInput" placeholder="Telefone"/>
              <input value={admin} onChange={(e) => setAdmin(e.target.value)} className="adminInput" placeholder="Admin"/>
              <input value={adminPwd} type="password" onChange={(e) => setAdminPwd(e.target.value)} className="adminInput" placeholder="AdminPwd"/>
              <button onClick={register} className="adminRegisterBtn">Registrar</button>
            </div>
          )}

          {/* Update Form */}
          {activePage === "Update" && (
            <div className="adminInputDiv">
              <input value={usuário} onChange={(e) => setUser(e.target.value)} className="adminInput !mt-0" placeholder="Nome"/>
              <input value={senha} onChange={(e) => setSenha(e.target.value)} className="adminInput" placeholder="Senha"/>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="adminInput" placeholder="Email"/>
              <input value={telefone} onChange={(e) => setTelefone(e.target.value)} className="adminInput" placeholder="Telefone"/>
              <input value={admin} onChange={(e) => setAdmin(e.target.value)} className="adminInput" placeholder="Admin"/>
              <input value={adminPwd} type="password" onChange={(e) => setAdminPwd(e.target.value)} className="adminInput" placeholder="AdminPwd"/>
              <button onClick={update} className="adminRegisterBtn">Update</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard_Admin;