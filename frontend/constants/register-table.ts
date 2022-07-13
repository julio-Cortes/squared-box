import React from "react";

export const ColumnsForRegister = {
    id: "Id",
    vendedor: 'Vendedor',
    vendedor_id:"Id vendedor",
    nro_caja:'Numero Caja',
    fecha: 'Fecha',
    localName: "Local",
}

export const locals: string[] = [
    'Sypra', 'La estrella'
];

export const GetCurrentDate = (differential = 0) => {
    let separator = '-'
    let newDate = new Date()
    let yesterday = newDate.getDate() - 1 + differential;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const currentDate = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${yesterday < 10 ? `0${yesterday}` : `${yesterday}`}`
    return currentDate
}
export type DateInterval = {
    from : string,
    to:string
}

