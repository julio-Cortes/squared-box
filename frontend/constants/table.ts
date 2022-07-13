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

export type TableHeaders<T extends MinTableItem> = Record<keyof T, string>

export interface TableProps<T extends MinTableItem> {
    items: T[];
    headers: TableHeaders<T>;
    handleClick: (item: T) => void;
    avoidColumns?: string[]
}