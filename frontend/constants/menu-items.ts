import { Store  } from '@styled-icons/material/Store'
import { LocalAtm  } from '@styled-icons/material/LocalAtm'
import { Lock  } from '@styled-icons/material/Lock'
import { AccountBalance  } from '@styled-icons/material/AccountBalance'
import { AdminPanelSettings  } from '@styled-icons/material/AdminPanelSettings'
import { Pending  } from '@styled-icons/material/Pending'

type MenuOption = {
    name: string,
    icon: React.ComponentType,
    url: string,
    subItems?: MenuOption[]
}

const MENU_OPTIONS: MenuOption[] = [
    {
        name: "Cajas",
        icon: Store,
        url: '/registers',
        subItems: [
            {
                name: "Por cuadrar",
                icon: LocalAtm,
                url: '/registers/'
            },
            {
                name: "Cuadrandose",
                icon: Pending,
                url: '/registers/inProgress'
            },
            {
                name: "Cerradas",
                icon: Lock,
                url: '/registers/inProgress'
            },

        ]
    },
    {
        name: "Depositos",
        icon: AccountBalance,
        url: '/deposits'
    },
    {
        name: "Administracion",
        icon: AdminPanelSettings,
        url: '/admin'
    }

]

export type MenuItem = {
    name: string,
    icon: React.ComponentType,
    url: string,
    id: string,
    depth: number,
    subItems?: MenuItem[],
};

function makeMenuLevel(options: MenuOption[], depth = 0): MenuItem[] {
    return options.map((option, idx) => ({
        ...option,
        id: depth === 0 ? idx.toString() : `${depth}.${idx}`,
        depth,
        subItems:
            option.subItems && option.subItems.length > 0
                ? makeMenuLevel(option.subItems, depth + 1)
                : undefined,
    }));
}

export const MENU_ITEMS: MenuItem[] = makeMenuLevel(MENU_OPTIONS);