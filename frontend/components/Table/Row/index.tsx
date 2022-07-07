import { objectValues, isPrimitive } from "../../../constants/register-table";



const Row = ({ item }: any) => (
    <tr id={item} className={`
    text-2xl
    odd:bg-tl-grey
    even:bg-tl-light-grey
   hover:bg-gray-400
`}>

        {objectValues(item).map((entry) => (
            <td id={entry} className={`
                    border
                    rounded-md
                    
                `}>
                {isPrimitive(entry) ? entry : ''}
            </td>
        ))}

    </tr>
)

export default Row