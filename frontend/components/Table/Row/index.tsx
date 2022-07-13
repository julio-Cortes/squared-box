import { objectValues, isPrimitive } from "../../../constants/register-table";

type RowProps = {
    item: any;
    handleClick: (t: any) => void;
}

const Row = ({ item, handleClick }: RowProps) => {
    return (
        <tr key={item} className={`
    text-lg
    odd:bg-tl-grey
    even:bg-tl-light-grey
   hover:bg-gray-400
`}>

            {objectValues(item).map((entry) => (
                <td key={entry} onClick={() => handleClick(item)} className={`
            hadnleClickRow
                    rounded-md
                    
                `}>
                    {isPrimitive(entry) ? entry : ''}
                </td>
            ))}

        </tr>
    )
}

export default Row