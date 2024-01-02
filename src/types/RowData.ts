/**
 * Representa los datos de una sola fila de una tabla.
 */
export interface RowData {
    /**
     * El id de la fila.
     */
    id: number;
    /**
     * Valor de la primera columna.
     */
    intervaloInicio: string;
    /**
     * Valor de la segunda columna.
     */
    intervaloFin: string;
    /**
     * Valor de la tercera columna.
     */
    frecuencia: string;
}