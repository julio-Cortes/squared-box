import { SidebarContainer } from "./styles";

type SidebarProps = {
    isOpened: boolean;
}

const Sidebar = ({ isOpened }: SidebarProps) => {
    return (
        <div>
            {isOpened && <SidebarContainer>
                Menu
            </SidebarContainer>}
        </div>

    )
}
export default Sidebar;