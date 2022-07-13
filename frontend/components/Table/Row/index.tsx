import { isPrimitive, objectValues } from "../../../constants/table";


type RowProps = {
    item: any;
    handleClick: (t: any) => void;
    avoidColumns?: string[]
}

const Row = ({ item, handleClick, avoidColumns }: RowProps) => {
    return (
        <tr key={item} className={`
    text-lg
    odd:bg-tl-grey
    even:bg-tl-light-grey
   hover:bg-gray-400
`}>

            {objectValues(item, avoidColumns ).map((entry) => (
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