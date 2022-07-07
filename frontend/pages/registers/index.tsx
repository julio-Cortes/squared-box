import { Tab } from "@styled-icons/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Table from "../../components/Table";
import { locals, GetCurrentDate, PrimitiveType, ColumnsForRegister } from "../../constants/register-table";

interface RegisterProp {
    local_id: number,
    localName: string,
    vendedor: string,
    vendedor_id: number,
    nro_caja: number,
    id: PrimitiveType
    fecha: string,
    Boleta: NormalSell,
    Factura: NormalSell,
    Cigarro: NormalSell,
    Cupon: CouponSell

}
interface RegisterPropForView{
    id: PrimitiveType
    vendedor: string,
    vendedor_id:number,
    nro_caja:number,
    fecha: string,
    localName: string
}
function CastRegisterAsViews( registers:RegisterProp[]){
    return registers.map( r => r as RegisterPropForView)
}
const Registers = () => {
    const [dropdown, setDropdown] = useState(locals[0]);
    const [registers, setRegisters] = useState<Array<RegisterProp>>([]);
    const [dateInterval, setDateInterval] = useState(GetCurrentDate())
    const router = useRouter()
    useEffect(() => {
        if (!router.isReady || dateInterval == "") return;
        let is_sypra = dropdown == "Sypra" ? true : false

        fetch(`http://localhost:5000/registers?date=${dateInterval}&is_sypra=${is_sypra}`)
            .then(res => res.json())
            .then(data => {
                setRegisters(data)
            })
    }, [dropdown, dateInterval])

    return (
        <Layout>
            <Table headers={ColumnsForRegister} items={CastRegisterAsViews(registers)} />
        </Layout>
    )
}

export interface NormalSell {
    efectivo: number,
    pago_cheque: number,
    t_credito: number,
    t_debito: number,
    t_propia: number,
    total: number,
}
export interface CouponSell {
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
export interface CheckInterface {
    type: number,
    total: number
}
export default Registers;