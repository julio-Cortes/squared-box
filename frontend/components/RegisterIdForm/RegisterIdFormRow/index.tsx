type RegisterIdFormRowProp = {
    name:string;
    realValue:number;
    children:React.ReactChild;
    cuadreValue:number;
}

const RegisterIdFormRow = ({name, realValue, children, cuadreValue}:RegisterIdFormRowProp) =>{
    return (
        <tr>
        <td>
            {name}
        </td>
        <td>
            <div className="text-white m-2">
                {realValue}
            </div>
        </td>
        <td>
            {children}
        </td>
        <td className={cuadreValue - realValue < 0 ? ' text-red-400' : 'text-green-400'}>
        { cuadreValue - realValue   }
        </td>
    </tr>
    )
}

export default RegisterIdFormRow;