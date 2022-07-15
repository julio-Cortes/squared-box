import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { RegisterProp } from "../../pages/registers"
import { SquaredRegister } from "../../pages/squared-registers"
import { FormItem } from "../Login/styles"
import { FieldPairContainer, } from "./styles"




const RegisterIdForm = () => {
    const [register, setRegister] = useState<RegisterProp>()
    const [SquaredRegister, setSquaredRegister] = useState<SquaredRegister>()
    const [isSypra , setIsSypra] = useState(true)
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
        setRegister(JSON.parse(router.query.register as unknown as string))
        setIsSypra(JSON.parse(router.query.is_sypra as unknown as string))
    }, [router.isReady])
    const onSubmit = (values: SquaredRegister) => {
        console.log(values)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({ squared_register:values, is_sypra: isSypra })
        };
        fetch(`${process.env.REACT_APP_URL_BASE}/squared-registers/`, requestOptions)
        .then(response => {
            console.log(response)
            if (response.status == 200){
               router.push('/registers/')
            }
            else{
                toast('Ups algo salio mal creando la caja, intentalo nuevamente')
            }
        })
    }
    if (register) {
        console.log(register)
        return (
            <Formik 
            initialValues={{
                id: register.id,
                localId:register.localId,
                localName:register.localName,
                numeroCaja:register.numeroCaja,
                vendedorId:register.vendedorId,
                vendedorName:register.vendedorName,
                fechaCaja:register.fecha,
                empresa:isSypra,
                total:register.Boleta.total+ register.Cigarro.total+ register.Factura.total,
                efectivoCuadre:0,
                efectivoReal: register.Boleta.efectivo + register.Cigarro.efectivo + register.Factura.efectivo,
                cigarrosCuadre: 0,
                cigarrosReal: register.Cigarro.total ,
                debitoCuadre: 0,
                debitoReal: register.Boleta.tarjetaDebito + register.Cigarro.tarjetaDebito + register.Factura.tarjetaDebito,
                creditoCuadre: 0,
                creditoReal: register.Boleta.tarjetaCredito + register.Cigarro.tarjetaCredito + register.Factura.tarjetaCredito,
                estado: 1
            }} onSubmit={onSubmit}>
                {(formikProps) =>{
                    const {values} = formikProps;
                    return (
                        <Form>
                        <table className={'table-auto w-1/3 m-auto bg-tl-grey border border-tl-light-grey rounded-lg border-collapse'}>
    
                            <thead className={'border border-white'}>
                                <tr>
                                    <th>
                                        Parametro
                                    </th>
                                    <th>
                                        Sistema
                                    </th>
                                    <th>
                                        Cuadre
                                    </th>
                                    <th>
                                        Diferencia
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td>
                                            Efectivo
                                        </td>
                                        <td>
                                            <div className="text-white m-2">
                                                {values.efectivoReal}
                                            </div>
                                        </td>
                                        <td>
                                            <Field className={'bg-tl-light-grey m-2 text-center'}
                                                type='number'
                                                name='efectivoCuadre'
                                                id='efectivoCuadre'
                                            />
                                        </td>
                                        
                                        <td className={values.efectivoCuadre - values.efectivoReal < 0 ? ' text-red-900' : 'text-green-900'}>
                                        { values.efectivoCuadre - values.efectivoReal   }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Cigarros
                                        </td>
                                        <td>
                                            <div className="text-white m-2">
                                                {values.cigarrosReal}
                                            </div>
                                        </td>
                                        <td>
                                            <Field className={'bg-tl-light-grey m-2 text-center  '}
                                                type='number'
                                                name='cigarrosCuadre'
                                                id='cigarrosCuadre'
                                            />
                                        </td>
                                        <td className={values.cigarrosCuadre - values.cigarrosReal < 0 ? ' text-red-900' : 'text-green-900'}>
                                        { values.cigarrosCuadre - values.cigarrosReal   }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Debito
                                        </td>
                                        <td>
                                            <div className="text-white m-2">
                                                {values.debitoReal}
                                            </div>
                                        </td>
                                        <td>
                                            <Field className={'bg-tl-light-grey m-2 text-center  '}
                                                type='number'
                                                name='debitoCuadre'
                                                id='debitoCuadre'
                                            />
                                        </td>
                                        <td className={values.debitoCuadre - values.debitoReal < 0 ? ' text-red-900' : 'text-green-900'}>
                                        { values.debitoCuadre - values.debitoReal   }
                                        </td>
                                    </tr>

                            </tbody>
                        </table>
                        <button type="submit"
                            className={'bg-tl-light-grey text-white border text-2xl m-2 p-2'}>
                                Guardar Cuadrataje
                            </button>
                    </Form>
                    )
                }}
              

            </Formik>
        )
    }
    return (
        <></>
    )

}

export default RegisterIdForm