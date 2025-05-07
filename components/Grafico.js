import { LineChart, Line, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Grafico = ({datasetGrafico}) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={datasetGrafico}
        margin={{
          left: -15,
          right: 30,
          bottom: 5,
          top: 20
        }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis
          dataKey="name"
          interval={0}
        />
        <YAxis
          domain={["dataMin", "dataMax"]}
          tickCount={5}
        />
        <Tooltip />
        <Legend
          verticalAlign="bottom" 
          align="center" 
          wrapperStyle={{
            paddingTop: '5px',
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%)'
          }}
        />
        <Line type="bumpX" dataKey="Ganhando" fill="#8884d8" stroke="#00FA9A" strokeWidth="3" />
        <Line type="bumpX" dataKey="Perdendo" fill="#82ca9d" stroke="orange" strokeWidth="3" /> 
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Grafico;