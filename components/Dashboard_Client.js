import { useState, useEffect } from "react";
import Grafico from "./Grafico";
import "../styles/Dashboard Clientes/dashboardClient.css";
import "../styles/Dashboard Clientes/informações.css"
import "../styles/Dashboard Clientes/downloads.css";
import "../styles/Dashboard Clientes/gráfico.css";
import "../styles/Dashboard Clientes/popup.css";

const Dashboard_Client = ({user}) => {
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  const anoAtual = new Date().getFullYear();
  const mesAtual = meses[new Date().getMonth()];
  const [ano, setAno] = useState(anoAtual);
  const [mes, setMes] = useState(mesAtual);

  // Mudança de painéis;
  const [activePage, setActivePage] = useState("Dashboard");
  
  const mudarPágina = (página) => {
    setActivePage(página);
  }
  
  const buttonClasses = (página) => activePage === página ? "!border-neutral-500" : "border-neutral-700";
  
  // Define lista de Anos a partir do ano inicial;
  const years = [];
  for (let year = 2025; year <= anoAtual; year++) {
    years.push(year);
  }

  // Códigos do Gráfico;
  const [datasetGrafico, setDataset] = useState([
    {name: 'Sem. 1', Ganhando: 0, Perdendo: 0},
    {name: 'Sem. 2', Ganhando: 0, Perdendo: 0},
    {name: 'Sem. 3', Ganhando: 0, Perdendo: 0},
    {name: 'Sem. 4', Ganhando: 0, Perdendo: 0},
  ]);

  const [userData, setUserData] = useState(null);

  const gatherUserData = async () => {
    const url = "/api/client/findUser";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientUser: user.name,
          clientPassword: user.password
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data) {
        setUserData(data)
        updateDataset(data)
        console.log("DB fetch:", data)
      } else {
        console.log("Erro")
      }

    } catch (error) {
      console.log("Erro:", error);
    }
  }
  
  // Atualiza o gráfico;
  const updateDataset = (userData) => {
    const updatedDataset = [];
    Object.entries(userData?.searchUser?.user_DB?.resumes?.[ano]?.[mes] || {}).forEach(([key, value]) => {

      if(value?.scheduled){
        updatedDataset.push({
          name: `Sem. ${key}`,
          Ganhando: value?.ganhando || 0,
          Perdendo: value?.perdendo || 0
        });
      }
    })

    // Atualiza o gráfico com os dados filtrados;
    setDataset(updatedDataset);
  }

  useEffect(() => {
    const getUser = async () => {
      await gatherUserData();
    };
    getUser()
  }, []);

  useEffect(() => {
    if (userData) {
      updateDataset(userData);
    }
  }, [ano, mes, userData]);

  const termosPesquisa = (e) => {
    const {name, value} = e.target;

    if (name === "ano"){
      setAno(value);
      updateDataset(userData)
    } else if (name === "mês"){
      setMes(value);
      updateDataset(userData)
    }
  }

  // Pop Up Renovar Serviço;
  const [popUp, setPopUp] = useState(true); // DEBUG: Colocar false quando estiver terminado
  const funcPopUp = () => {
    if(popUp){
      setPopUp(false);
    } else {
      setPopUp(true);
    }
  }

  // Botões com as páginas;
  const PagesButtons = ({mudarPágina, buttonClasses}) => {
    return(
      <div className="seletoresPaineisDiv hoverEffect">
        <button onClick={() => mudarPágina("Validade")} className={`seletorPaineisBtn hoverEffect ${buttonClasses("Validade")}`}>Validade</button>
        <button onClick={() => mudarPágina("Dashboard")} className={`seletorPaineisBtn hoverEffect ${buttonClasses("Dashboard")}`}>Dashboard</button>
        <button onClick={() => mudarPágina("Contato")} className={`seletorPaineisBtn hoverEffect ${buttonClasses("Contato")}`}>Contato</button>
      </div>
    );
  };

  return(
    <div className="absolute top-0 left-0 w-full h-full bg-neutral-950 overflow-x-hidden">
      <div className="clientContentDiv centerDiv">

        {/* Validade */}
        {activePage === "Validade" && (
          <div className="dashboardContainer centerDiv">
            <PagesButtons mudarPágina={mudarPágina} buttonClasses={buttonClasses} />
          </div>
        )}

        {/* Dashbaord */}
        {activePage === "Dashboard" && (
          <div className="dashboardContainer centerDiv">
            {/*<PagesButtons mudarPágina={mudarPágina} buttonClasses={buttonClasses} />*/}
            <div className="informationsContainer">
              <div className="infoDiv1 hoverEffect">
                {!userData ? (
                  <>
                    <button className="reloadDatabaseButton hoverEffect" onClick={async () => await gatherUserData()}>
                      <svg className="size-6 stroke-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    </button>
                  </>
                ) : null
                }
                <h1 className="titleInfo userGreeting">
                  Olá, {userData ? userData.searchUser?.user?.nameGreeting+"!" || "..." : "..."}
                </h1>
              </div>
              <div className="infoDiv2 hoverEffect">
                <div className="infoStatusDiv infoSubDiv">
                  {!userData ? (
                    <>
                      <h1 className="titleInfo serviceStatusTitle">Status...</h1>
                      <div className="serviceStatusCircle bg-gray-500 animate-pulse"></div>
                    </>
                  ) : userData?.searchUser?.user_DB?.serviceStatus?.running === true ? (
                    <>
                      <h1 className="titleInfo serviceStatusTitle">Serviço Ativo</h1>
                      <div className="serviceStatusCircle bg-green-500 animate-pulse"></div>
                    </>
                  ) : (
                    <>
                      <h1 className="titleInfo serviceStatusTitle mt-[-10px]">Serviço Expirado</h1>
                      <button className="expiredButton centerDiv mt-1 hoverEffect" onClick={() => funcPopUp()}>Renovar</button>
                      <div className="serviceStatusCircle bg-red-500 animate-pulse"></div>
                    </>
                  )}
                </div>
                <div className="middleBarDecoration"></div>
                <div className="infoContatoDiv infoSubDiv">
                  <h1 className="titleInfo contatoTitle">Contato</h1>

                  <div className="contactInfo">
                    <svg className="phone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                    </svg>
                    <h2 className="infoDesc contatoDesc">(xx) xxxx-xxxx</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="containerArquivosGrafico">
              <div className="filesDiv hoverEffect">
                <div className="filesHeaderDiv">
                  <h1 className="filesH1">Relatórios</h1>
                  <div className="selectorsDiv">
                    <select className="selectorInput" name="ano" value={ano} onChange={termosPesquisa}>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <select className="selectorInput ml-1 !w-[80px]" name="mês" value={mes} onChange={termosPesquisa}>
                      <option value="janeiro">Janeiro</option>
                      <option value="fevereiro">Fevereiro</option>
                      <option value="março">Março</option>
                      <option value="abril">Abril</option>
                      <option value="maio">Maio</option>
                      <option value="junho">Junho</option>
                      <option value="julho">Julho</option>
                      <option value="agosto">Agosto</option>
                      <option value="setembro">Setembro</option>
                      <option value="outubro">Outubro</option>
                      <option value="novembro">Novembro</option>
                      <option value="dezembro">Dezembro</option>
                    </select>
                  </div>
                </div>
                
                <div className="filesBox">
                  {Object.entries(userData?.searchUser?.user_DB?.resumes?.[ano]?.[mes] || {})
                  .map(([key, file]) => {
                    if (file && file.scheduled && file.fileLink === "none") {
                      return (
                        <div key={key} className="fileWaiting">
                          <h1 className="fileName">{"Semana " + key}</h1>
                          <h1 className="downloadBtn">
                            <svg className="clockSvg centerDiv size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                          </h1>
                        </div>
                      );
                    } else if (file && file.scheduled && file.fileLink != "none"){
                      return(
                        <div key={key} className="fileWaiting">
                          <h1 className="fileName">{/* TODO: Usar nome do arquivo no DB */"Semana " + key}</h1>
                          <button className="downloadBtn" onClick={() => window.open(file.fileLink, '_blank')}>
                            <svg className="downloadSvg centerDiv size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                            </svg>
                          </button>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                
              </div>

              <div className="graficoDiv hoverEffect">
                <div className="graficoDiv2">
                  <Grafico datasetGrafico={datasetGrafico} className="grafico" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PopUp Pagamento */}
        {popUp === true && (
          <div className="popupDiv hoverEffect centerDiv">
            <button className="closePopupButton hoverEffect" onClick={() => funcPopUp()}>
              <svg className="closeSvg centerDiv" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <h1 className="popupTitle1">Renovação</h1>
            <div className="qrcodeDiv">
              <div className="qrcodeImg"></div>
              <div className="qrcodeInfoDiv hoverEffect">
                <h1 className="valorH1">Valor</h1>
                {!userData ? (
                  <>
                    <h2 className="preçoH2">...</h2>
                  </>
                ) : (
                  <>
                    <h2 className="preçoH2">{userData?.searchUser?.user_DB?.serviceStatus?.price}</h2>
                  </>
                )}
              </div>
            </div>
            <h1 className="popupTitle2">Instruções</h1>
            <ul className="instructionsList">
              <li>1- Escaneie o QR Code;</li>
              <li>2- Realize o pagamento;</li>
              <li>3- Envie o comprovante;</li>
              <li>4- Aguarde a confirmação (24Hrs);</li>
            </ul>
          </div>
        )}

        {/* Contato */}
        {activePage === "Contato" && (
          <div className="dashboardContainer centerDiv">
            <PagesButtons mudarPágina={mudarPágina} buttonClasses={buttonClasses} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard_Client;