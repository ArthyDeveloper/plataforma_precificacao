import "../styles/dashboardClient.css";

const Dashboard_Client = ({user}) => {
  return(
    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 overflow-x-hidden">
      <div className="dashboardContentDiv centerDiv">
        {/* Painel de arquivos. */}
        <div className="filesDiv">
          {/* Header e opções. */}
          <div className="filesHeaderDiv">
            <h1 className="filesH1">Relatórios</h1>
            <div className="selectorsDiv">
              <select className="selectorInput" name="ano">
                <option value="2025">2025</option>
              </select>
              <select className="selectorInput" name="mês">
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

          {/* Arquivos. */}
          <div className="filesBox">
            <div className="file"></div>
            <div className="file"></div>
            <div className="file"></div>
            <div className="file"></div>
            <div className="file"></div>
          </div>
        </div>
      </div>
      <footer className="footer"></footer>
    </div>
  );
};

export default Dashboard_Client;