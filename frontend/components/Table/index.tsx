import { MinTableItem, objectValues, TableProps } from "../../constants/register-table";
import Row from "./Row";




function Table<T extends MinTableItem>(props: TableProps<T>) {
    

    return (
        <table className={'table-auto w-full '}>
            <thead>
                <tr  className={`
                bg-tl-grey border rounded-md hover:cursor-default
                `}>
                    {objectValues(props.headers).map((header) => (
                        <th key={header} className={'border rounded-md text-2xl'}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.items.map((item) => (
                    <Row onClick={props.handleClick} key={item.id} item={item} />
                ))}
            </tbody>
        </table>
    )


}
export default Table