import { Tab } from "@styled-icons/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "../../components/DatePicker";
import Layout from "../../components/Layout";
import Table from "../../components/Table";
import { GetCurrentDate, locals, PrimitiveType } from "../../constants/table";

export interface RegisterProp {
    id: PrimitiveType
    localId: number,
    localName: string,
    vendedorName: string,
    vendedorId: number,
    numeroCaja: number,
    fecha: string,
    Boleta: NormalSell,
    Factura: NormalSell,
    Cigarro: NormalSell,
    Cupon: CouponSell

}
interface RegisterPropForView{
    id: PrimitiveType
    vendedorName: string,
    vendedorId:number,
    numeroCaja:number,
    fecha: string,
    localName: string
}
function CastRegisterAsViews( registers:RegisterProp[]){
    return registers.map( r => r as unknown as RegisterPropForView)
}
const Registers = () => {
    const [dropdown, setDropdown] = useState(locals[0]);
    const [registers, setRegisters] = useState<Array<RegisterProp>>([]);
    const [dateInterval, setDateInterval] = useState({from:GetCurrentDate(), to:GetCurrentDate(1)})
    const handleClickRow = (row: RegisterPropForView) => {
        router.push({
            pathname:`registers/${row.id}`, 
            query: {
                register:JSON.stringify(registers.find( el => el.id===row.id)),
                is_sypra:dropdown == "Sypra" ? true : false
            }
            })


    }
    const router = useRouter()
    useEffect(() => {
        setRegisters([])
        if (!router.isReady || dateInterval.from == "" || dateInterval.to == "") return;
        let is_sypra = dropdown == "Sypra" ? true : false
        fetch(`${process.env.REACT_APP_URL_BASE}/registers?from=${dateInterval.from}&to=${dateInterval.to}&is_sypra=${is_sypra}`)
            .then(res => res.json())
            .then(data => {
                setRegisters(data)
            })
    }, [dropdown, dateInterval, router.isReady])

    return (
        <Layout>
            <DatePicker date={dateInterval} setDate={setDateInterval}></DatePicker>
            <Table avoidColumns={['localId','Boleta','Cupon','Factura','Cigarro','Id']} handleClick={handleClickRow} headers={ColumnsForRegister} items={CastRegisterAsViews(registers)} />
        </Layout>
    )
}

interface NormalSell {
    efectivo: number,
    pagoCheque: number,
    tarjetaCredito: number,
    tarjetaDebito: number,
    tarjetaPropia: number,
    total: number,
}
interface CouponSell {
    fecha: string,
    pago_cupon: number,
    total: number,
    sub_medio: number,
    sub_medio2: number,
    sub_medio3: number,
    sub_medio4: number,
    sb_1: number,
    sb_2: number,
    sb_3: number,
    sb_4: number,
}



const ColumnsForRegister = {
    id: "Id",
    vendedorName: 'Vendedor',
    vendedorId:"Id vendedor",
    numeroCaja:'Numero Caja',
    fecha: 'Fecha',
    localName: "Local",
}



export default  Registers;