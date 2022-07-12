import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type AuthProps = {
    WrappedComponent: React.ReactNode,
    allowedRoles: number[]
}

const Auth = ({WrappedComponent, allowedRoles}:AuthProps) => {
    const [loading, setLoading]= useState(true)
    useEffect(() => {
        const role = 1;
        const router = useRouter();
        if (allowedRoles.includes(role)){
            setLoading(false)
        }
        else{
            router.push('/registers')
        }
    },[])
    if (loading){
        return <></>
    }
    else{
        return {WrappedComponent}
    }
    

    
}



export default Auth;