import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { RegisterProp } from "../../pages/registers"
import { SquaredRegister } from "../../pages/squared-registers"
import RegisterIdFormRow from "./RegisterIdFormRow"


type SubMean ={
    id:number;
    name:string;
}

const RegisterIdForm = () => {
    const [register, setRegister] = useState<RegisterProp>()
    const [SquaredRegister, setSquaredRegister] = useState<SquaredRegister>()
    const [isSypra, setIsSypra] = useState(true)
    const [subMeans, setSubMeans] = useState<Array<SubMean>>()
    const router = useRouter();
    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL_BASE}/api/sub_means/`)
        .then(res => res.json())
        .then(data => {
            setSubMeans(data)
        })
        if (!router.isReady) return;
        setRegister(JSON.parse(router.query.register as unknown as string))
        setIsSypra(JSON.parse(router.query.is_sypra as unknown as string))
    }, [router.isReady])
    const onSubmit = (values: SquaredRegister) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ squared_register: values, is_sypra: isSypra })
        };
        fetch(`${process.env.REACT_APP_URL_BASE}/squared-registers/`, requestOptions)
            .then(response => {
                if (response.status == 200) {
                    router.push('/registers/')
                }
                else {
                    toast('Ups algo salio mal creando la caja, intentalo nuevamente')
                }
            })
    }
    if (register && subMeans) {
        return (
            <Formik
                initialValues={{
                    id: register.id,
                    localId: register.localId,
                    localName: register.localName,
                    numeroCaja: register.numeroCaja,
                    vendedorId: register.vendedorId,
                    vendedorName: register.vendedorName,
                    fechaCaja: register.fecha,
                    empresa: isSypra,
                    total: register.Boleta.total + register.Cigarro.total + register.Factura.total,
                    efectivoCuadre: 0,
                    efectivoReal: register.Boleta.efectivo + register.Cigarro.efectivo + register.Factura.efectivo,
                    cigarrosCuadre: 0,
                    cigarrosReal: register.Cigarro.total,
                    debitoCuadre: 0,
                    debitoReal: register.Boleta.tarjetaDebito + register.Cigarro.tarjetaDebito + register.Factura.tarjetaDebito,
                    creditoCuadre: 0,
                    creditoReal: register.Boleta.tarjetaCredito + register.Cigarro.tarjetaCredito + register.Factura.tarjetaCredito,
                    estado: 1
                }} onSubmit={onSubmit}>
                {(formikProps) => {
                    const { values } = formikProps;
                    return (
                        <Form>
                            <table className={'table-auto w-3/4 m-auto bg-tl-grey border border-tl-light-grey rounded-lg'}>

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
                                    <RegisterIdFormRow name={"Efectivo"} realValue={values.efectivoReal}
                                        cuadreValue={values.efectivoCuadre}>
                                        <Field className={'bg-tl-light-grey m-2 text-center  '}
                                            type='number'
                                            name='efectivoCuadre'
                                            id='efectivoCuadre'
                                        />
                                    </RegisterIdFormRow>
                                    <RegisterIdFormRow name={"Debito"} realValue={values.debitoReal}
                                        cuadreValue={values.debitoCuadre}>
                                        <Field className={'bg-tl-light-grey m-2 text-center  '}
                                            type='number'
                                            name='debitoCuadre'
                                            id='debitoCuadre'
                                        />
                                    </RegisterIdFormRow>
                                    <RegisterIdFormRow name={"Credito"} realValue={values.creditoReal}
                                        cuadreValue={values.creditoCuadre   }>
                                        <Field className={'bg-tl-light-grey m-2 text-center  '}
                                            type='number'
                                            name='creditoCuadre'
                                            id='creditoCuadre'
                                        />
                                    </RegisterIdFormRow>
                                    {subMeans.map( sb =>(
                                                                            <RegisterIdFormRow name={sb.name} realValue={0}
                                                                            cuadreValue={0 }>
                                                                            <Field className={'bg-tl-light-grey m-2 text-center  '}
                                                                                type='number'
                                                                                name={`${sb.name}Cuadre`}
                                                                                id={`${sb.name}Cuadre`}
                                                                            />
                                                                        </RegisterIdFormRow>
                                    ))}
                                  
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