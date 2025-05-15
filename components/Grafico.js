import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Grafico = ({datasetGrafico}) => {

  const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: "oklch(23.0% 0 0.1)",
        borderRadius: "2px",
        border: " solid 1px oklch(37.1% 0 0)",
        padding: "10px",
        fontSize: "12px",
        color: "white"
      }}>
        <p style={{ margin: 0, color: "white" }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: 0 }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;};

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
        <Tooltip content={<CustomTooltip />} />
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