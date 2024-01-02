import { FC } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip } from 'recharts';

/**
 * Parametros del componente Histograma.
 */
type HistogramaProps = {
  data: {
    intervalo: number;
    frecuencia: number;
  }[]
}

/**
 * Renderiza un componente de gráfico de histograma.
 *
 * @component
 * @param {HistogramaProps} props - Parametros del componente Histograma.
 * @param {Array<Object>} props.data - Los datos para el gráfico de histograma.
 * @returns {JSX.Element} El componente Histograma renderizado.
 */
const Histograma: FC<HistogramaProps> = ({data}) => {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="intervalo" />
      <YAxis />
      <Tooltip/>
      <Legend/>
      <Bar dataKey="frecuencia" fill="#8884d8" />
    </BarChart>
  )
}

export default Histograma