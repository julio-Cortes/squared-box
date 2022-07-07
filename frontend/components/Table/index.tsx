import { MinTableItem, objectValues, TableProps } from "../../constants/register-table";
import Row from "./Row";




function Table<T extends MinTableItem>(props: TableProps<T>) {
    return (
        <table className={'table-auto w-full '}>
            <thead>
                <tr className={'bg-tl-grey border rounded-md'}>
                    {objectValues(props.headers).map((header) => (
                        <th className={'border rounded-md text-2xl'}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.items.map((item) => (
                    <Row item={item} />
                ))}
            </tbody>
        </table>
    )


}
export default Table