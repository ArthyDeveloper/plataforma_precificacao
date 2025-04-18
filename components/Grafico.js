import { LineChart, Line, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Grafico = ({datasetGrafico}) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={datasetGrafico}
        margin={{
          left: -15,
          right: 5,
          bottom: 5,
          top: 10
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          interval={0}
        />
        <YAxis
          domain={["dataMin - 100", "dataMax + 100"]}
          tickCount={4}
        />
        <Tooltip />
        <Legend />
        {/* Bar type Graph
        <Line dataKey="Ganhando" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <Line dataKey="Perdendo" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        */}
        <Line type="bumpX" dataKey="Ganhando" fill="#8884d8" stroke="#00FA9A" strokeWidth="3" />
        <Line type="bumpX" dataKey="Perdendo" fill="#82ca9d" stroke="orange" strokeWidth="3" /> 
      </LineChart>
  </ResponsiveContainer>
  );
};

export default Grafico;