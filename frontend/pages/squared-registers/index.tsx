import { Tab } from "@styled-icons/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DatePicker from "../../components/DatePicker";
import Layout from "../../components/Layout";
import Table from "../../components/Table";
import { GetCurrentDate, locals, MinTableItem, PrimitiveType } from "../../constants/table";
import Registers from "../registers";


export type SquaredRegister = {
    id: PrimitiveType
    localId: number;
    localName:string;
    numeroCaja:number;
    vendedorId:number;
    vendedorName:string;
    fechaCaja:string;
    efectivoReal:number;
    debitoReal:number;
    creditoReal:number;
    estado:number;
    efectivoCuadre:number;
    debitoCuadre:number;
    creditoCuadre:number;
    total:number;
}

const Columns = {
    id: 'Id',
    localName: "Local",
    numeroCaja:'Numero Caja',
    vendedorName: 'Vendedor',
    fechaCaja: 'Fecha',
    estado:'Estado'
}
type SquaredRegisterAsView = {
    id: PrimitiveType
    localName:string;
    numeroCaja:number;
    vendedorName: string;
    fechaCaja:string;
    estado:number;
}



const SquaredRegisters = () => {
    const [squaredRegisters , setSquaredRegisters] = useState<Array<SquaredRegister>>([])
    const [dropdown, setDropdown] = useState(locals[0]);
    const [dateInterval, setDateInterval] = useState({from:GetCurrentDate(), to:GetCurrentDate(1)})
    const handleClick = (row: MinTableItem) => {
        router.push(`squared-registers/${row.id}`)
    }
    const router = useRouter()
    useEffect(() => {
        if (!router.isReady || dateInterval.from == "" || dateInterval.to == "") return;
        let is_sypra = dropdown == "Sypra" ? true : false
        setSquaredRegisters([])
        fetch(`${process.env.REACT_APP_URL_BASE}/squared-registers/?from=${dateInterval.from}&to=${dateInterval.to}&is_sypra=${is_sypra}`)
            .then(res => res.json())
            .then(data => {
                setSquaredRegisters(data)
            })
    }, [dropdown, dateInterval, router.isReady])

    return (
        <Layout>
            <DatePicker date={dateInterval} setDate={setDateInterval}></DatePicker>
            <Table avoidColumns={
                ['localId','efectivoReal','efectivoCuadre',
            'debitoCuadre','debitoReal','vendedorId','total','creditoReal','creditoCuadre','empresaId']} 
                items={squaredRegisters.map(r => r as unknown as SquaredRegisterAsView)} headers={Columns} handleClick={handleClick}></Table>
        </Layout>
    )
}


export default  SquaredRegisters;