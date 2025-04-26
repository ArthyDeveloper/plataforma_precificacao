import { useState, useEffect } from "react";
import Grafico from "./Grafico";
import "../styles/Dashboard Clientes/dashboardClient.css";
import "../styles/Dashboard Clientes/informações.css"
import "../styles/Dashboard Clientes/downloads.css";
import "../styles/Dashboard Clientes/gráfico.css";

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

  // Muda o valor/estado de ano e mês de acordo com input selector;
  // TODO: Implementar busca no DB e API para atualizar gráfico e downloads.
  const termosPesquisa = (e) => {
    const {name, value} = e.target;

    if (name === "ano"){
      setAno(value);
    } else if (name === "mês"){
      console.log(value, typeof(value))
      setMes(value);
    }
  }

  // Debug: Verifica se mês e ano atuais estão de acordo.
  // TODO: Valores serão usados para requisição API e atualização do gráfico.
  useEffect(() => {
    console.log(`Ano: ${ano} | Mês: ${mes} | Value: none`);
  }, [ano, mes]);

  // Códigos do Gráfico;
  const [datasetGrafico, setDataset] = useState([
    {name: 'Sem. 1', Ganhando: 2400, Perdendo: 1700},
    {name: 'Sem. 2', Ganhando: 1398, Perdendo: 3000},
    {name: 'Sem. 3', Ganhando: 3800, Perdendo: 2000},
    {name: 'Sem. 4', Ganhando: 1500, Perdendo: 1300},
  ]);

  // Atualiza o gráfico;
  const updateDataset = () => {
    setDataset([
      {name: 'Sem. 1', Ganhando: 1700, Perdendo: 2400},
      {name: 'Sem. 2', Ganhando: 3000, Perdendo: 1398},
      {name: 'Sem. 3', Ganhando: 2000, Perdendo: 3800},
      {name: 'Sem. 4', Ganhando: 1300, Perdendo: 1500},
    ]);
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
            {<PagesButtons mudarPágina={mudarPágina} buttonClasses={buttonClasses} />}
            <div className="informationsContainer">
              <div className="infoDiv1 hoverEffect"></div>
              <div className="infoDiv2 hoverEffect"></div>
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
                  <div className="file">
                    <h1 className="fileName">01.01 - 14.01</h1>
                    <button className="downloadBtn" onClick={() => updateDataset()}>
                      <svg className="downloadSvg centerDiv size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </button>
                  </div>
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