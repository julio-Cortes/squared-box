import { MENU_ITEMS } from "../../constants/menu-items";
import MenuItemsList from "../MenuItemsList";
import { SidebarContainer } from "./styles";

type SidebarProps = {
    isOpened: boolean;
}



const Sidebar = ({ isOpened }: SidebarProps) => {
    if (isOpened) {
        return (
                <SidebarContainer >
                    <MenuItemsList options={MENU_ITEMS}/>
                </SidebarContainer>
        )
    }


}
export default Sidebar;