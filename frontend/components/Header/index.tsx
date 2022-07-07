import { HeaderContainer, IconContainer, TitleContainer, NavigationContainer } from "./styles";
import { Menu, ChevronLeft, SmartButton } from "@styled-icons/material";
type HeaderProps = {
    isOpened: boolean,
    toggleSidebar: () => void,
}

const Header = ({ isOpened, toggleSidebar }: HeaderProps) => {
    return (
        <HeaderContainer>
            <IconContainer onClick={toggleSidebar}>
                {isOpened ? <ChevronLeft className={'h-7'} /> : <Menu className={'h-7'} />}
            </IconContainer>
            <TitleContainer>Cuadratura de caja</TitleContainer>
            <NavigationContainer>
                <button>Cerrar sesion</button>
            </NavigationContainer>
        </HeaderContainer>
    )
}

export default Header;