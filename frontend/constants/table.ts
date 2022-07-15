export function objectValues<T extends {}>(obj: T, avoidColumns?: string[]) {

    let array = Object.keys(obj).map((objKey) => {
        if (avoidColumns) {
            if (!avoidColumns?.includes(objKey)) {
                return obj[objKey as keyof T]
            }
        }
        else {
            return obj[objKey as keyof T]
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
export interface MinTableItem {
    id: PrimitiveType;
}
export const locals: string[] = [
    'Sypra', 'La estrella'
];

export type DateInterval = {
    from : string,
    to:string
}

export type TableHeaders<T extends MinTableItem> = Record<keyof T, string>

export interface TableProps<T extends MinTableItem> {
    items: T[];
    headers: TableHeaders<T>;
    handleClick: (item: T) => void;
    avoidColumns?: string[]
}
export const GetCurrentDate = (differential = 0) => {
    let separator = '-'
    let newDate = new Date()
    let yesterday = newDate.getDate() - 1 + differential;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const currentDate = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${yesterday < 10 ? `0${yesterday}` : `${yesterday}`}`
    return currentDate
}