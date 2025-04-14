import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState } from "react";
import "../styles/dashboardClient.css";

const Dashboard_Client = ({user}) => {
  
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
  const [chartData, setChartData] = useState({
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
    datasets: [
      {
        label: 'Ganhando',
        data: [65, 59, 80, 81, 56],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.3)',
        borderWidth: 1,
      },
      {
        label: 'Perdendo',
        data: [65, 59, 80, 81, 56],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(153, 102, 255, 0.3)',
        borderWidth: 1,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Resumo Mensal',
        color: 'white',
        font: {
          size: 20,
          family: 'Arial',
          weight: 'bold',
        },
      },
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
        },
      },
      tooltip: {
        enabled: true,
        titleColor: 'white',
        bodyColor: 'white',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
      },
    },
  };

  const updateChart = () => {
    // Update the chart's data dynamically (e.g., modify values or labels)
    setChartData({
      labels: ['August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Updated Dataset',
          data: [35, 49, 60, 71, 80],
          borderColor: 'rgb(153, 102, 255)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          fill: true,
        },
      ],
    });
  };

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
              <select className="selectorInput ml-1 !w-[80px]" name="mês">
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
            <div className="file">
              <h1 className="fileName">01.01 - 14.01</h1>
              <div className="downloadBtn"></div>
            </div>
            <div className="file">
              <h1 className="fileName">01.01 - 14.01</h1>
              <div className="downloadBtn"></div>
            </div>
            <div className="file">
              <h1 className="fileName">01.01 - 14.01</h1>
              <div className="downloadBtn"></div>
            </div>
            <div className="file">
              <h1 className="fileName">01.01 - 14.01</h1>
              <div className="downloadBtn"></div>
            </div>
            <div className="file">
              <h1 className="fileName">01.01 - 14.01</h1>
              <div className="downloadBtn"></div>
            </div>
          </div>
        </div>

        {/* Gráfico */}
        <div className="graficoDiv">
          <Bar data={chartData} options={options} className="grafico" />
        </div>
      </div>
      <footer className="footer"></footer>
    </div>
  );
};

export default Dashboard_Client;