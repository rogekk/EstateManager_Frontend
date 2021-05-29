import React, {FC, SetStateAction} from "react";
import {ListItem, ListItemIcon, ListItemText, SvgIcon} from "@material-ui/core";
import {Translation} from "../common/i18n/Translations";
import {Page} from "../common/models/Types";
import {useHistory, useLocation} from "react-router-dom";
import {NavigationPage} from "../common/components/SideDrawer";

export const NavigationItem: FC<{
    icon: typeof SvgIcon,
    t: Translation,
    page: NavigationPage,
    setPage: React.Dispatch<SetStateAction<NavigationPage>>,
}> = ({icon, t, page, setPage}) => {
    const location = useLocation();
    const history = useHistory();
    // const [p, path, name] = page

    return (<ListItem selected={location.pathname === page.url} button onClick={() => {
        setPage(page)
    }}>
        <ListItemIcon>
            {React.createElement(icon)}
        </ListItemIcon>
        <ListItemText>
            {page.name}
        </ListItemText>
    </ListItem>)
}
