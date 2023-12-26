import React, { useState, useEffect } from 'react';

// Define la estructura de tus datos
interface RowData {
    id: number;
    field1: string;
    field2: string;
    field3: string;
}

function addRows(rowsNumber: number[], data:RowData[]):RowData[]{
    return rowsNumber.map((rowNumber) => {
        const existingRow = data.find((d) => d.id === rowNumber);
        if (existingRow) {
          return existingRow;
        } else {
          return {
            id: rowNumber,
            field1: '',
            field2: '',
            field3: '',
          };
        }
      });
}

type TableProps = {
    rowsNumber: number[];
    onData: (data: RowData[]) => void;
}

const Table: React.FC<TableProps> = ({rowsNumber, onData}) => {
    const [rows, setRows] = useState<RowData[]>(addRows(rowsNumber, []));

    useEffect(() => {
        setRows(addRows(rowsNumber, rows));
    }, [rowsNumber]);

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
    <div className="container mx-auto p-5 mt-auto">
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
                        value={row.field1}
                        onChange={(e) => handleOnChange(e.target.value, row.id, 'field1')}
                        className="w-full px-2 py-1"
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                        type="text"
                        value={row.field2}
                        onChange={(e) => handleOnChange(e.target.value, row.id, 'field2')}
                        className="w-full px-2 py-1"
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                        type="text"
                        value={row.field3}
                        onChange={(e) => handleOnChange(e.target.value, row.id, 'field3')}
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