import {FC} from 'react'
import { PieChart, Pie } from 'recharts';


/**
 * Parametros del componente Pastel.
 */
type PastelProps = {
  data: {
    intervalo: number;
    frecuencia: number;
  }[]
};

/**
 * Renderiza un componente de gráfico de pastel.
 * @param {PastelProps} props - Parametros del componente Pastel.
 * @param {Array<Object>} props.data - Los datos para el gráfico de pastel.
 * @returns {JSX.Element} El componente Pastel renderizado.
 */
const Pastel: FC<PastelProps> = ({data}) => {
  return (
    <PieChart width={730} height={250}>
        <Pie data={data} dataKey="frecuencia" nameKey="intervalo" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" />
    </PieChart>
  )
}

export default Pastel