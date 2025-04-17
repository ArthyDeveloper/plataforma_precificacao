import { LineChart, Line, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Grafico = ({datasetGrafico}) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={datasetGrafico}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend wrapperStyle={{color: "white"}} />
        {/* Bar Graph
          <Bar dataKey="Ganhando" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="Perdendo" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        */}
        <Line type="monotone" dataKey="Ganhando" stroke="#ff7300" />
        <Line type="monotone" dataKey="Perdendo" stroke="#00c49f" />
      </LineChart>
  </ResponsiveContainer>
  );
};

export default Grafico;