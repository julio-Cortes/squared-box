import { HeaderContainer, IconContainer, TitleContainer, NavigationContainer } from "./styles";
import { Menu, ChevronLeft, SmartButton } from "@styled-icons/material";
import { getCookie, setCookie } from "cookies-next";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
type HeaderProps = {
    isOpened: boolean,
    toggleSidebar: () => void,
}

const Header = ({ isOpened, toggleSidebar }: HeaderProps) => {
    const router = useRouter();
    const onClickButton = () => {
        setCookie('token','')
        router.push('/')
    }
    return (
        <HeaderContainer>
            <IconContainer onClick={toggleSidebar}>
                {isOpened ? <ChevronLeft className={'h-7'} /> : <Menu className={'h-7'} />}
            </IconContainer>
            <TitleContainer>Cuadratura de caja</TitleContainer>
            <NavigationContainer>
                <button onClick={onClickButton}>Cerrar sesion</button>
            </NavigationContainer>
        </HeaderContainer>
    )
    

}

export default Header;