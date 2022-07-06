import { HeaderContainer, IconContainer, TitleContainer } from "./styles";
import { Menu, ChevronLeft } from "@styled-icons/material";
type HeaderProps = {
    isOpened: boolean,
    toggleSidebar: () => void,
}

const Header = ({isOpened, toggleSidebar}: HeaderProps) => {
    return (
        <HeaderContainer>
            <IconContainer onClick={toggleSidebar}>
        {isOpened ? <ChevronLeft className={'h-8'} /> : <Menu />}
      </IconContainer>
      <TitleContainer>Header</TitleContainer>
        </HeaderContainer>
    )
}

export default Header;