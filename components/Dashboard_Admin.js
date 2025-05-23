import React, {useState, useEffect} from "react";
import "../styles/dashboardAdmin.css";

const Dashboard_Admin = ({user}) => {
  // Register;
  const [usuário, setUser] = useState("");
  const [usuárioGreeting, setUserGreeting] = useState(usuário);
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  // Update Field;
  const [updateOperation, setUpdateOperation] = useState("");
  const [updateField, setUpdateField] = useState("");
  const [updateData, setUpdateData] = useState("");

  // Drive Link Converter;
  const [link, setLink] = useState("");
  const [linkConvertido, setLinkConvertido] = useState("...");

  // Display usuários;
  const [usersDocuments, setUsersDocuments] = useState([]);

  // Mudança de menus;
  const [activePage, setActivePage] = useState("Registrar");

  const mudarPágina = (página) => {
    setActivePage(página);
  }

  const buttonClasses = (página) => activePage === página ? "!bg-gray-900 text-white" : "!bg-gray-800";

  // Listagem de usuários;
  const listUsers = async () => {
    const url = "/api/admin/findUsers";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: user.name,
          senha: user.password
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data?.searchDocuments?.length) {
        console.log(data)
        setUsersDocuments(data.searchDocuments);
      } else {
        console.log(data)
        setUsersDocuments([]);
      }

    } catch (error) {
      console.log("Erro:", error);
    }
  }

  useEffect(() => {
    listUsers();
  }, [user]);
  
  // Registro de usuários;
  const register = async () => {
    const url = "/api/admin/register"
    try{
      const response = await fetch(url, {
        method: "POST",
        headers: {
         "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: user.name,
          password: user.password,
          name: usuário,
          userGreeting: usuárioGreeting,
          senha: senha,
          email: email,
          telefone: telefone
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Erro", error);
    }
  }

  // Atualização de documentos de clientes;
  const update = async () => {
    const url = "/api/admin/update"
    try{
      const response = await fetch(url, {
        method: "PUT",
        headers: {
         "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: user.name,
          password: user.password,
          updateOperation: updateOperation,
          userName: usuário,
          updateField: updateField,
          updateData: updateData
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Erro", error);
    }
  }

  const driveConverter = () => {
    if (link.split("/")[0] == "https:"){
      let tempVar = link.split("/")[5];
      console.log(link)
      setLinkConvertido(`https://drive.google.com/uc?export=download&id=${tempVar}`);
    } else {
      setLinkConvertido(`https://drive.google.com/uc?export=download&id=${link}`);
    }
  }

  return(
    <div className="containerParent">
      <div className="pageButtonsContainer">
        {/* Top Bar - Options */}
        <div className="pageButtonsDiv">
          <button className={`btnAdminSelector ${buttonClasses("Usuários")}`}
            onClick={() => mudarPágina("Usuários")}
          >Usuários</button>
          <button className={`btnAdminSelector ${buttonClasses("Registrar")}`}
            onClick={() => mudarPágina("Registrar")}
          >Registrar</button>
          <button className={`btnAdminSelector ${buttonClasses("Update")}`}
            onClick={() => mudarPágina("Update")}
          >Update</button>
          <button className={`btnAdminSelector ${buttonClasses("LinkDrive")}`}
            onClick={() => mudarPágina("Drive")}
          >Drive</button>
        </div>

        <div className="pagesDiv">
          {/* Exibe páginas de acordo com estado ativo. */}

          {/* Users Form */}
          {activePage === "Usuários" && (
            <div className="centerDiv usersDiv">
              {usersDocuments.map((user, index) => (
                <div className={`userBox ${index === 0 ? "!mt-0" : ""}`} key={index}>
                  <h3 className="font-semibold">{user.user.name}</h3>
                  <p>{`Email: ${user.user.email}`}</p>
                  <p>{`Telefone: ${user.user.number}`}</p>
                </div>
              ))}
            </div>
          )}

          {/* Register Form */}
          {activePage === "Registrar" && (
            <div className="adminInputDiv">
              <input value={usuário} onChange={(e) => setUser(e.target.value)} className="adminInput !mt-0" placeholder="Nome"/>
              <input value={usuárioGreeting} onChange={(e) => setUserGreeting(e.target.value)} className="adminInput" placeholder="Saudação"/>
              <input value={senha} onChange={(e) => setSenha(e.target.value)} className="adminInput" placeholder="Senha"/>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="adminInput" placeholder="Email"/>
              <input value={telefone} onChange={(e) => setTelefone(e.target.value)} className="adminInput" placeholder="Telefone"/>
              <button onClick={() => register()} className="adminRegisterBtn">Registrar</button>
            </div>
          )}

          {/* Update Form */}
          {activePage === "Update" && (
            <div className="adminInputDiv">
              <input value={usuário} onChange={(e) => setUser(e.target.value)} className="adminInput !mt-0" placeholder="Nome"/>
              <input value={updateField} onChange={(e) => setUpdateField(e.target.value)} className="adminInput" placeholder="Field"/>
              <input value={updateData} onChange={(e) => setUpdateData(e.target.value)} className="adminInput" placeholder="Data"/>
              <input value={updateOperation} onChange={(e) => setUpdateOperation(e.target.value)} className="adminInput" placeholder="Operação(set, unset, rename)"/>
              <button onClick={() => update()} className="adminRegisterBtn">Update</button>
            </div>
          )}

          {/* Conversor Link Drive */}
          {activePage === "Drive" && (
            <div className="adminInputDiv text-wrap">
              <input value={link} onChange={(e) => setLink(e.target.value)} className="adminInput !mt-0" placeholder="Link"/>
              <h1 className="linkH1">{linkConvertido}</h1>
              <button onClick={() => driveConverter()} className="adminRegisterBtn">Converter</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard_Admin;