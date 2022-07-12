import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type AuthProps = {
    WrappedComponent: () => JSX.Element,
    allowedRoles: string[]
}

const Auth = ({ WrappedComponent, allowedRoles }: AuthProps) => {
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
        const role = "Admin";

        if (allowedRoles.includes(role)) {
            setLoading(false)
        }
        else {
            router.push('/registers')
        }
    }, [router.isReady, allowedRoles])
    if (!router.isReady) {
        return <></>
    }
    else {
        return (
            <div>
                {WrappedComponent}
            </div>
        )
    }



}



export default Auth;