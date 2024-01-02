import React, { useState, useEffect } from 'react';
import { RowData } from '../types/RowData';

/**
 * Añade filas a la matriz de datos basándose en los números de fila proporcionados.
 * Si ya existe una fila con el mismo id en la matriz de datos, se devuelve tal cual.
 * De lo contrario, se crea una nueva fila con el id proporcionado y los valores de campo vacíos.
 * 
 * @param rowsNumber - Una matriz de números de fila para añadir.
 * @param data - La matriz de datos existente.
 * @returns El array de datos actualizado con las filas añadidas.
 */
function addRows(rowsNumber: number[], data:RowData[]):RowData[]{
    return rowsNumber.map((rowNumber) => {
        const existingRow = data.find((d) => d.id === rowNumber);
        if (existingRow) {
          return existingRow;
        } else {
          return {
            id: rowNumber,
            intervaloInicio: '',
            intervaloFin: '',
            frecuencia: '',
          };
        }
      });
};

/**
 * Parametros para el componente Tabla.
 */
type TableProps = {
  /**
   * Una matriz que representa el número de filas de la tabla.
   */
  rowsNumber: number[];

  /**
   * Una función callback que se llama cuando se actualizan los datos.
   * @param data - An array of row data.
   */
  onData: (data: RowData[]) => void;
};

/**
 * Represents el componente de una tabla.
 * @param {TableProps} props - Parametros del componente.
 * @param {number} props.rowsNumber - Numero de registros/filas en la tabla.
 * @param {Function} props.onData - La funcion callback que se llama cuando se actualizan los datos.
 * @returns {JSX.Element} The table component.
 */
const Table: React.FC<TableProps> = ({rowsNumber, onData}) => {
    const [rows, setRows] = useState<RowData[]>(addRows(rowsNumber, []));

    /**
     * useEffect hook que se ejecuta cuando cambia el número de filas.
     * @param {number} rowsNumber - El número de filas.
     * @param {Array<any>} rows - Filas actuales.
     */
    useEffect(() => {
      setRows(addRows(rowsNumber, rows));
    }, [rowsNumber]);

    /**
     * Elimina la fila correspondiente del array de datos y llama a la función de callback onData.
     * Actualiza el array de datos con la nueva fila.
     * 
     * @param content - The new content for the field.
     * @param id - The id of the row.
     * @param field - The field to be updated.
     */
    const handleOnChange = (content: string, id: number, field: keyof RowData) => {
      event?.preventDefault();
      const newRows = rows.map(row => {
        if (row.id === id) {
          return { ...row, [field]: content};
        }
        return row;
      });
      setRows(newRows);
      onData(newRows);
    };

  return (
    <div className="container mx-auto p-5 mt-auto h-3/4 overflow-auto">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/3 px-4 py-2">Inicio Intervalo</th>
            <th className="w-1/3 px-4 py-2">Fin Intervalo</th>
            <th className="w-1/3 px-4 py-2">Frecuencia (Fi)</th>
          </tr>
        </thead>
        <tbody>
            {rows.map((row, index) => (
                <tr key={index}>
                    <td className="border px-4 py-2">
                        <input
                        type="text"
                        value={row.intervaloInicio}
                        onChange={(e) => handleOnChange(e.target.value, row.id, 'intervaloInicio')}
                        className="w-full px-2 py-1"
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                        type="text"
                        value={row.intervaloFin}
                        onChange={(e) => handleOnChange(e.target.value, row.id, 'intervaloFin')}
                        className="w-full px-2 py-1"
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                        type="text"
                        value={row.frecuencia}
                        onChange={(e) => handleOnChange(e.target.value, row.id, 'frecuencia')}
                        className="w-full px-2 py-1"
                        />
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;