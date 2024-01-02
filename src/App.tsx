import Spinner from "./components/Spinner"
import  Table  from "./components/Table"
import { useState } from "react"
import Histograma from "./components/graphics/Histograma"
import { RowData } from "./types/RowData"
import { calcularRango, calcularVarianza, calcularDesviacion } from "./service/Calculos"
import Pastel from "./components/graphics/Pastel"

/**
 * Convierte una matriz de objetos RowData en una matriz de objetos de datos de histograma.
 * Cada objeto de datos de histograma contiene la media de los intervalos y la frecuencia.
 *
 * @param data - El array de objetos RowData.
 * @returns Una matriz de objetos de datos de histograma.
 */
const arrayHistograma = (data: RowData[]) => {
  return data.map(row => {
      return {
          intervalo: ((Number(row.intervaloFin) + Number(row.intervaloInicio))/2.0),
          frecuencia: Number(row.frecuencia)
      }
  })
};

/**
 * El componente principal de la aplicación.
 */
function App() {
  const [rows, setRows] = useState<number>(5);
  const [data, setData] = useState<RowData[]>([]);
  const [infoHistograma, setInfoHistograma] = useState<{intervalo: number;frecuencia: number}[]>([]);
  const [rango, setRango] = useState<number>();
  const [varianza, setVarianza] = useState<number>();
  const [desviacion, setDesviacion] = useState<number>();

  /**
   * Función para manejar el evento de clic del botón "Graficar".
   * Valida los datos y calcula la información del histograma, rango, varianza y desviación estándar.
   */
  const Graficar = () => {
    event?.preventDefault();
    if (validateData()) {
      const info = arrayHistograma(data);
      setInfoHistograma(info);
      setRango(calcularRango(data));
      setVarianza(calcularVarianza(data));
      setDesviacion(calcularDesviacion(data));
    }
  };

  /**
   * Función para validar los datos introducidos por el usuario.
   * Comprueba si todos los campos son números, si el inicio del intervalo es menor que el final del intervalo,
   * y si el final del intervalo de una fila anterior es igual al inicio del intervalo de la fila siguiente.
   * @returns True si los datos son válidos, False en caso contrario.
   */
  const validateData = () => {
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (isNaN(Number(row.intervaloInicio)) || isNaN(Number(row.intervaloFin)) || isNaN(Number(row.frecuencia))) {
        alert('Todos los campos deben ser números');
        return false;
      }
      if (Number(row.intervaloInicio) >= Number(row.intervaloFin)) {
        alert('Los intervalos 1 deben ser menor que los intervalos 2');
        return false;
      }
      if (i > 0 && Number(data[i - 1].intervaloFin) !== Number(row.intervaloInicio)) {
        alert('El intervalo final de una fila previa debe ser igual al inicio del intervalo de la siguiente fila');
        return false;
      }
    }
    return true;
  };

  return (
    <div className="bg-black md:h-screen flex flex-col md:flex-row">
      <div className="bg-slate-800 md:w-1/3 md:h-screen flex flex-col justify-between">
        <div className="h-1/6 bg-green-700 flex justify-center items-center">
          <h1 className="text-6xl font-medium text-white">SIMULADOR</h1>
        </div>
        <div className=" bg-slate-900 flex p-4 mb-auto">
          <label className="text-white text-2xl">Seleccione el numero de rangos</label>
          <Spinner initialValue={rows} min={0} max={15} step={1} onChange={setRows}/>
        </div>
        <Table rowsNumber={Array.from({ length: rows }, (_, index) => index + 1)} onData={setData}/>
        <div className="pb-5 md:pb-0"> 
          <button onClick={Graficar} className="bg-green-700 text-white text-2xl font-medium w-full h-20 mt-auto">Graficar</button>
        </div>
      </div>
      <div className="bg-slate-900 md:w-1/3 md:h-screen justify-center items-center flex flex-col">
        {(infoHistograma.length > 0) && <Histograma data={infoHistograma}/>}
        {(infoHistograma.length > 0) && <Pastel data={infoHistograma}/>}
      </div>
      <div className="bg-slate-800 md:w-1/3 md:h-screen flex flex-col">
        <div className="h-1/6 bg-green-700 flex justify-center items-center">
          <h1 className="text-7xl font-medium text-white">ESTADO</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
            <label className="text-white text-2xl">Rango: {rango}</label>
            <label className="text-white text-2xl">Varianza: {varianza}</label>
            <label className="text-white text-2xl">Desviacion: {desviacion}</label>
          </div>
      </div>
    </div>
  );
};



export default App
