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
export interface MinTableItem {
    id: PrimitiveType;
}

export type TableHeaders<T extends MinTableItem> = Record<keyof T, string>

export interface TableProps<T extends MinTableItem> {
    items: T[];
    headers: TableHeaders<T>;
}

export function objectValues<T extends {}>(obj: T) {
    let nonReturn = ['Boleta','Factura','Cupon','Cigarro',"id"]
    let array = Object.keys(obj).map((objKey) => {
        if (!nonReturn?.includes(objKey)){
            return  obj[objKey as keyof T]
        }
    })
    array = array.filter(Boolean);
    return array
}

export type PrimitiveType = string | number | boolean;

export function isPrimitive(value: any): value is PrimitiveType {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
    )
}
export const GetCurrentDate = (separator = '-') => {

    let newDate = new Date()
    let yesterday = newDate.getDate() - 1;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const currentDate = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${yesterday < 10 ? `0${yesterday}` : `${yesterday}`}`
    return currentDate
}

